using Chat.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chat.Api.Repositories
{
    public interface IChatRepository
    {
        Task Send(ChatMessage message);
        Task SendRoom(ChatRoom room);
        IEnumerable<ChatRoom> AllChatRooms { get; set; }
    }
}
