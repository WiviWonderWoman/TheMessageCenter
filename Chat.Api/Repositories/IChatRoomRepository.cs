using Chat.Api.Models;
using System.Collections.Generic;

namespace Chat.Api.Repositories
{
    public interface IChatRoomRepository
    {
        IEnumerable<ChatRoom> AllChatRooms { get; }
    }
}
