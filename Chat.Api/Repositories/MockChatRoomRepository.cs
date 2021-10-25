using Chat.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chat.Api.Repositories
{
    // Mock implementation of IChatRoomRepository with hardcoded data (can be reaplaced with database)
    public class MockChatRoomRepository : IChatRoomRepository
    {
        public IEnumerable<ChatRoom> AllChatRooms => new List<ChatRoom>
        {
            new ChatRoom {RoomName = "Allmänt"},
            new ChatRoom {RoomName = "Reception"},
            new ChatRoom {RoomName = "Kök"},
            new ChatRoom {RoomName = "Städ"}
        };
    }
}
