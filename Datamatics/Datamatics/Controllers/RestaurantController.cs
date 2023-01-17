using Datamatics.Models;
using Sitecore.Configuration;
using Sitecore.Data;
using Sitecore.Data.Fields;
using Sitecore.Globalization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Datamatics.Controllers
{
    public class RestaurantController : ApiController
    {
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [HttpPost]
        public IEnumerable<RestaurantMenuItem> FetchMenuPrice(GetMenuPriceRequest request)
        {
            //context item
            //context db
            //context language

            Database contextDatabase = Factory.GetDatabase(request.ContextDatabaseName);
            Language language = Language.Parse(request.ContextLanguageName);

            var contextItem = contextDatabase.Items.GetItem(new ID(request.ContextItemId), language);

            MultilistField menuItemListField = contextItem.Fields["Menu"];

            var response = menuItemListField.GetItems()
                                        .Select(x => new RestaurantMenuItem
                                        {
                                            ItemName = x.Fields["ItemName"].Value,
                                            ItemType = x.Fields["ItemType"].Value,
                                            ItemPrice = x.Fields["ItemPrice"].Value,
                                            ItemDetail = x.Fields["ItemDetail"].Value
                                        });

            return response;

        }
    }
}