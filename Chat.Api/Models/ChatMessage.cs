using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chat.Api.Models
{
    public class ChatMessage
    {
        //public string UserId { get; set; }
        //public string RoomName { get; set; }
        public string User { get; set; }
        public string Message { get; set; }
    }
}
