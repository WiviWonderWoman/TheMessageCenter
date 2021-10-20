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
        public async Task SendMessage(ChatMessage message)
        {
            await Clients.All.ReceiveMessage(message);
        }

        public async Task JoinRoom(string connectionId, string roomName)
        {
            await Groups.AddToGroupAsync(connectionId, roomName);

            var message = new ChatMessage
            {
                UserId = connectionId,
                RoomName = roomName,
                Message = $"{connectionId} has joined the group {roomName}."
            };

            await Clients.Group(roomName).ReceiveMessage(message);
        }

        public async Task LeaveRoom(string connectionId, string roomName)
        {
            await Groups.RemoveFromGroupAsync(connectionId, roomName);

            var message = new ChatMessage
            {
                UserId = connectionId,
                RoomName = roomName,
                Message = $"{connectionId} has left the group {roomName}."
            };

            await Clients.Group(roomName).ReceiveMessage(message);
        }
    }
}
