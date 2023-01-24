using Newtonsoft.Json;
using System.Collections.Generic;

namespace Datamatics.Models
{
    public class CustomTagsList
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("tagslist")]
        public List<TagsList> TagsList { get; set; }
    }
    public class TagsList
    {
        [JsonProperty("tagitem")]
        public string TagItem { get; set; }
    }
}
