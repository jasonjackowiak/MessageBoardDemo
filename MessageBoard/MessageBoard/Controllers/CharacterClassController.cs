using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using MessageBoard.Data;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;

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
            IQueryable<CharacterClass> results = _repo.GetCharacterClasses();

            var characterClasses = results
                .OrderBy(t => t.Id)
                .Take(5)
                .ToList();
            return characterClasses;
        }

        public CharacterClass Get(int characterClassId)
        {
            CharacterClass result = _repo.GetCharacterClassForCharacter(characterClassId);

            return result;
        }

        public HttpResponseMessage Post([FromBody]CharacterClass characterClass)
        {
            if ((_repo.AddCharacterClass(characterClass)) &&
                _repo.Save())
            {
                return Request.CreateResponse(HttpStatusCode.Created, characterClass);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

    }
}

