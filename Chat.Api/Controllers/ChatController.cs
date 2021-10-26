using Chat.Api.Models;
using Chat.Api.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Chat.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly IChatRoomRepository chatRoomRepository;

        public ChatController(IChatRoomRepository _chatRoomRepository)
        {
            chatRoomRepository = _chatRoomRepository;
        }

        [HttpGet("rooms")]
        public IEnumerable<ChatRoom> GetRooms()
        {
            return chatRoomRepository.AllChatRooms;
        }
    }
}
