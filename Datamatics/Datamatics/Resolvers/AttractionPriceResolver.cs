using Datamatics.Models;
using Newtonsoft.Json;
using Sitecore;
using Sitecore.LayoutService.Configuration;
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
using System.Web.Helpers;

namespace Datamatics.Resolvers
{
    public class AttractionPriceResolver : IRenderingContentsResolver
    {
        public bool IncludeServerUrlInMediaUrls { get; set; }
        public bool UseContextItem { get; set; }
        public string ItemSelectorQuery { get; set; }
        public NameValueCollection Parameters { get; set; }

        public object ResolveContents(Rendering rendering, IRenderingConfiguration renderingConfig)
        {
            var contextItem = Sitecore.Context.Item;
            if (contextItem == null)
                return null;

            var priceApiKey = contextItem.Fields["PriceApiKey"].Value;
            if (string.IsNullOrEmpty(priceApiKey))
                return null;
            HttpClient client = new HttpClient
            {
                BaseAddress = new Uri("https://v168q.wiremockapi.cloud/")
            };
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

            HttpRequestMessage message = new HttpRequestMessage(HttpMethod.Get, "/json/getattractionprices");
            var response = Task.Run(async () => await client.SendAsync(message));
            var responseStream = Task.Run(async () => await response.Result.Content.ReadAsStreamAsync());
            string content = string.Empty;
            using (StreamReader reader = new StreamReader(responseStream.Result, true))
            {
                content = reader.ReadToEnd();
            }
            var attractionList =  JsonConvert.DeserializeObject<List<AttractionPrice>>(content);
            var result = attractionList.Where(x => x.id == priceApiKey).FirstOrDefault();
            return new
            {
                attractionId = priceApiKey,
                attractionPrice = result
            };

        }

    }
}
