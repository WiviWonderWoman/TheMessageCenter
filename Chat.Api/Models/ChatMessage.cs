using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chat.Api.Models
{
    public class ChatMessage
    {
        public string UserId { get; set; }
        public int RoomId { get; set; }
        public string UserName { get; set; }
        public string Message { get; set; }
    }
}
