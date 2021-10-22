using Chat.Api.Models;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Chat.Api.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessageToGroup(string roomName, ChatMessage message)
        {
            await Clients.Group(roomName).SendAsync("Send", message);
        }

        public async Task AddToGroup(string roomName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomName);

            await Clients.Group(roomName).SendAsync("Send", new ChatMessage
            {
                User = Context.ConnectionId,
                Message = $"{Context.ConnectionId} has joined the group {roomName}."
            });
        }

        public async Task RemoveFromGroup(string roomName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);

            await Clients.Group(roomName).SendAsync("Send", new ChatMessage
            {
                User = Context.ConnectionId,
                Message = $"{Context.ConnectionId} has left the group {roomName}."
            });
        }
    }
}
