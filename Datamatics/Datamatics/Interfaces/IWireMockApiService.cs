using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Datamatics
{
    public interface IWireMockApiService
    {
        TResponse SendAsyncMessage<TResponse>(string apiEndPoint);
    }
}
