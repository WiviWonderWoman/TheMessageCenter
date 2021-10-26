using Chat.Api.Models;
using System.Collections.Generic;

namespace Chat.Api.Repositories
{
    // Mock implementation of IChatRoomRepository with hardcoded data (reaplace with database)
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
