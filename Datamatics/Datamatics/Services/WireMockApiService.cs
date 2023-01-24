using Datamatics.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;

namespace Datamatics.Services
{
    public class WireMockApiService : IWireMockApiService
    {
        private readonly string _baseUrl = "https://v168q.wiremockapi.cloud/";

        public TResponse SendAsyncMessage<TResponse>(string apiEndPoint)
        {
            HttpClient client = new HttpClient
            {
                BaseAddress = new Uri(_baseUrl)
            };
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

            HttpRequestMessage message = new HttpRequestMessage(HttpMethod.Get, apiEndPoint);
            var response = Task.Run(async () => await client.SendAsync(message));
            var responseStream = Task.Run(async () => await response.Result.Content.ReadAsStreamAsync());
            string content = string.Empty;
            using (StreamReader reader = new StreamReader(responseStream.Result, true))
            {
                content = reader.ReadToEnd();
            }
            
            return JsonConvert.DeserializeObject<TResponse>(content); ;
        }
    }
}