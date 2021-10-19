using Chat.Api.Hubs.Clients;
using Chat.Api.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chat.Api.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
        //TODO: Implement Message
        public async Task SendMessage(ChatMessage message)
        {
            await Clients.All.ReceiveMessage(message);
        }
    }
}
