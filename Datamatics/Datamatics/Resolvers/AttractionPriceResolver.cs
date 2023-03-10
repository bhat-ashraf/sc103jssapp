using Datamatics.Models;
using Datamatics.Services;
using Sitecore.LayoutService.Configuration;
using Sitecore.LayoutService.ItemRendering.ContentsResolvers;
using Sitecore.Mvc.Presentation;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;

namespace Datamatics.Resolvers
{
    public class AttractionPriceResolver : IRenderingContentsResolver
    {       
        private readonly IWireMockApiService _wireMockApiSerice;
        public bool IncludeServerUrlInMediaUrls { get; set; }
        public bool UseContextItem { get; set; }
        public string ItemSelectorQuery { get; set; }
        public NameValueCollection Parameters { get; set; }

        public AttractionPriceResolver()
        {
            _wireMockApiSerice = new WireMockApiService();
        }

        public object ResolveContents(Rendering rendering, IRenderingConfiguration renderingConfig)
        {
            var contextItem = Sitecore.Context.Item;
            if (contextItem == null)
                return null;

            var priceApiKey = contextItem.Fields["PriceApiKey"].Value;
            if (string.IsNullOrEmpty(priceApiKey))
                return null;

            return GetAttractionPrices(priceApiKey);

        }

        private object GetAttractionPrices(string priceApiKey)
        {
            string endPoint = "/json/getattractionprices";
            List<AttractionPrice> response = _wireMockApiSerice.SendAsyncMessage<List<AttractionPrice>>(endPoint);
            var result = response.Where(x => x.id == priceApiKey).FirstOrDefault();
            return new
            {
                attractionId = priceApiKey,
                attractionPrice = result
            };
        }
    }
}
