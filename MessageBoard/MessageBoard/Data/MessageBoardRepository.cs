using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Ajax.Utilities;

namespace MessageBoard.Data
{
    public class MessageBoardRepository: IMessageBoardRepository
    {
        private MessageBoardContext _context;

        public MessageBoardRepository(MessageBoardContext context)
        {
            _context = context;
        }

        public IQueryable<Topic> GetTopics()
        {
            return _context.Topics;
        }

        public IQueryable<Topic> GetTopicsWithReplies()
        {
            return _context.Topics.Include("Replies");
        }

        public IQueryable<Reply> GetRepliesByTopic(int topicId)
        {
            return _context.Replies.Where(x => x.TopicId == topicId);
        }

        public bool Save()
        {
            try
            {
                return _context.SaveChanges() > 0;
            }
            catch (Exception e)
            {
                //TODO logging
                return false;
            }
        }

        public bool AddTopic(Topic newTopic)
        {
            try
            {
                _context.Topics.Add(newTopic);
                return true;
            }
            catch (Exception e)
            {
                //TODO logging
                return false;
            }
        }

        public bool AddReply(Reply newReply)
        {
            try
            {
                _context.Replies.Add(newReply);
                return true;
            }
            catch (Exception e)
            {
                //TODO logging
                return false;
            }
        }
    }
}