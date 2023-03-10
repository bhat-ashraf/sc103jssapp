using Newtonsoft.Json;
using Sitecore.LayoutService.Configuration;
using Datamatics.Models;
using Sitecore.ContentSearch.Linq.Utilities;
using Sitecore.ContentSearch.SearchTypes;
using Sitecore.LayoutService.ItemRendering.ContentsResolvers;
using Sitecore.Mvc.Presentation;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using Sitecore.ContentSearch;
using Sitecore.ContentSearch.Linq;

namespace Datamatics.Resolvers
{
    public class SearchResultsResolver : IRenderingContentsResolver
    {
        public bool IncludeServerUrlInMediaUrls { get; set; }
        public bool UseContextItem { get; set; }
        public string ItemSelectorQuery { get; set; }
        public NameValueCollection Parameters { get; set; }
        public object ResolveContents(Rendering rendering, IRenderingConfiguration renderingConfig)
        {
            string searchQuery = HttpContext.Current.Request.QueryString["searchQuery"].ToString();
            if (string.IsNullOrEmpty(searchQuery))
                return null;

            HttpClient httpClient = new HttpClient
            {
                BaseAddress = new Uri("https://v168q.wiremockapi.cloud/")
            };
            httpClient.DefaultRequestHeaders.Accept.Clear();
            httpClient.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
            HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, "/json/getattractiontags");
            var response = Task.Run(async () => await httpClient.SendAsync(httpRequestMessage));
            var responseStream = Task.Run(async () => await response.Result.Content.ReadAsStreamAsync());
            string content = string.Empty;
            using (StreamReader reader = new StreamReader(responseStream.Result, true))
            {
                content = reader.ReadToEnd();
            }
            List<CustomTagsList> tagListMappings = JsonConvert.DeserializeObject<List<CustomTagsList>>(content);
            var tagListIdsForQueryString = tagListMappings?
                                                    .Where(x => x.TagsList
                                                    .Any(y => string.Equals(y.TagItem, searchQuery, StringComparison.OrdinalIgnoreCase)))
                                                    .Select(x => x.Id)
                                                    .ToList();       

            string dbName = Sitecore.Context.Database.Name;
            ISearchIndex index = ContentSearchManager.GetIndex($"sitecore_{dbName}_index");
            using (IProviderSearchContext context = index.CreateSearchContext())
            {
                var filterByTemplateName = PredicateBuilder.True<SearchResultItem>(); 
                filterByTemplateName = filterByTemplateName.Or(x => x.TemplateName == "RestaurantPage");
                filterByTemplateName = filterByTemplateName.Or(x => x.TemplateName == "AdventurePage");
                filterByTemplateName = filterByTemplateName.Or(x => x.TemplateName == "LeisurePage");

                var appliedFilter = PredicateBuilder.True<SearchResultItem>();
                appliedFilter = appliedFilter.And(filterByTemplateName);

                var query = context.GetQueryable<SearchResultItem>() .Filter(appliedFilter);

                List<SearchResultItem> sitecoreResults = new List<SearchResultItem>();
                foreach (var res in query)
                {
                    try
                    {
                        var priceKey = res.Fields["priceapikey_t"]?.ToString();
                        if (tagListIdsForQueryString.Contains(priceKey))
                        {
                            sitecoreResults.Add(res);
                        }
                    }
                    catch (KeyNotFoundException ex)
                    {
                        //do nothing
                    }
                }
                var responseSitecoreResults = sitecoreResults.Select(x => new AttractionResultItem
                {
                    Title = x.Fields["title_t"]?.ToString(),
                    Description = x.Fields["description_t"]?.ToString(),
                }).ToList();

                return new
                {
                    tagListResults = responseSitecoreResults
                };
            }
        }
    }
}
