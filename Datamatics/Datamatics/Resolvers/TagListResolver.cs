using Datamatics.Models;
using Datamatics.Services;
using Sitecore.LayoutService.Configuration;
using Sitecore.LayoutService.ItemRendering.ContentsResolvers;
using Sitecore.Mvc.Presentation;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;

namespace Datamatics.Resolvers
{
    public class TagListResolver : IRenderingContentsResolver
    {
        private readonly IWireMockApiService _wireMockApiSerice;
        public bool IncludeServerUrlInMediaUrls { get; set; }
        public bool UseContextItem { get; set; }
        public string ItemSelectorQuery { get; set; }
        public NameValueCollection Parameters { get; set; }

        public TagListResolver()
        {
            _wireMockApiSerice = new WireMockApiService();
        }

        public object ResolveContents(Rendering rendering, IRenderingConfiguration renderingConfig)
        {
            if (Sitecore.Context.Item == null)
                return null;

            var priceApiKey = Sitecore.Context.Item.Fields["PriceApiKey"].Value;
            if (string.IsNullOrEmpty(priceApiKey))
                return null;

            string endPoint = "json/getattractiontags";
            var response = _wireMockApiSerice.SendAsyncMessage<List<CustomTagsList>>(endPoint);

            var result = response.Where(x => x.Id == priceApiKey).FirstOrDefault();
            return new
            {
                MappedKey = priceApiKey,
                MappedTagList = result,
            };
        }
    }
}