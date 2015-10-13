﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
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

        public IQueryable<Point> GetPoints()
        {
            return _context.Points;
        }

        public bool AddPoint(Point newPoint)
        {
            try
            {
                _context.Points.Add(newPoint);
                return true;
            }
            catch (Exception e)
            {
                //TODO logging
                return false;
            }
        }

        public bool AddCharacterClass(CharacterClass newCharacterClass)
        {
            try
            {
                _context.CharacterClasses.Add(newCharacterClass);
                return true;
            }
            catch (Exception e)
            {
                //TODO logging
                return false;
            }
        }

        public IQueryable<CharacterClass> GetCharacterClasses()
        {
            return _context.CharacterClasses.Include("Attributes");
        }

        public CharacterClass GetCharacterClassForCharacter(int Id)
        {
            return _context.CharacterClasses.Include("Attributes").FirstOrDefault(x => x.Id == Id);
        }

        public IQueryable<Character> GetCharacters()
        {
            return _context.Characters;
        }

        public bool AddCharacter(Character newCharacter)
        {
            try
            {
                _context.Characters.Add(newCharacter);
                return true;
            }
            catch (Exception e)
            {
                //TODO logging
                return false;
            }
        }

        public IQueryable<Character> GetCharactersWithPoints()
        {
            return _context.Characters.Include("Points");
        }

        public Character GetFirstCharacter()
        {
            return _context.Characters.FirstOrDefault();
        }

        public bool AddImage(Image image)
        {
            try
            {
                _context.Images.Add(image);
                return true;
            }
            catch (Exception e)
            {
                //TODO logging
                return false;
            }
        }

        public IQueryable<Image> GetImages()
        {
            return _context.Images;
        }

    }
}