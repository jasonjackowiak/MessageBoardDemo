using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using MessageBoard.Data;

namespace MessageBoard.Controllers
{
    public class CharacterClassController : ApiController
    {
        private IMessageBoardRepository _repo;

        public CharacterClassController(IMessageBoardRepository repo)
        {
            _repo = repo;
        }

        public IEnumerable<CharacterClass> Get()
        {
            IQueryable<CharacterClass> results;
            results = _repo.GetCharacterClasses();

            var characterClasses = results
                .OrderByDescending(t => t.Id)
                .Take(5)
                .ToList();
            return characterClasses;
        }

    }
}

