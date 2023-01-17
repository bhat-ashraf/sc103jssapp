using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Datamatics.Models
{
    public class GetMenuPriceRequest
    {
        public string ContextItemId { get; set; }
        public string ContextDatabaseName { get; set; }
        public string ContextLanguageName { get; set; }
    }
}