using Chat.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chat.Api.Hubs.Clients
{
    public interface IChatClient
    {
        Task ReceiveMessage(Message message);
    }
}
