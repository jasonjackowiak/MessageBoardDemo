using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MessageBoard.Data
{
    public interface IMessageBoardRepository
    {
        //messages
        IQueryable<Topic> GetTopics();
        IQueryable<Topic> GetTopicsWithReplies();
        IQueryable<Reply> GetRepliesByTopic(int topicId);
        bool Save();
        bool AddTopic(Topic newTopic);
        bool AddReply(Reply newReply);

        //points
        IQueryable<Point> GetPoints();
        bool AddPoint(Point newPoint);

        //characters
        IQueryable<Character> GetCharacters();
        IQueryable<Character> GetCharactersWithPoints();

        bool AddCharacter(Character newCharacter);
        Character GetFirstCharacter();

        //character classes
        IQueryable<CharacterClass> GetCharacterClasses();
        CharacterClass GetCharacterClassForCharacter(int id);
        bool AddCharacterClass(CharacterClass newCharacterClass);

        //images
        bool AddImage(Image image);
    }
}
