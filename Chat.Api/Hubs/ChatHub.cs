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

        public async Task SendRoomToAll(ChatRoom chatRoom)
        {
            await Clients.All.SendAsync("SendRoom", chatRoom);
        }

        public async Task AddToGroup(string roomName, string userName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomName);

            await Clients.Group(roomName).SendAsync("Send", new ChatMessage
            {
                User = userName,
                Message = $"Har gått med i gruppen."
            });
        }

        public async Task RemoveFromGroup(string roomName, string userName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);

            await Clients.Group(roomName).SendAsync("Send", new ChatMessage
            {
                User = userName,
                Message = $"Har lämnat gruppen."
            });
        }
    }
}
