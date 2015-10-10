using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using MessageBoard.Data;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;

namespace MessageBoard.Controllers
{
    public class CharacterController : ApiController
    {
        private IMessageBoardRepository _repo;

        public CharacterController(IMessageBoardRepository repo)
        {
            _repo = repo;
        }

        public IEnumerable<Character> Get()
        {
            IQueryable<Character> results;
            results = _repo.GetCharactersWithPoints();

            var character = results
                .OrderBy(t => t.Id)
                .Take(5)
                .ToList();
            return character;
        }

        public HttpResponseMessage Post([FromBody]Character character)
        {
            if (character.Created == default(DateTime))
            {
                character.Created = DateTime.Now;
            }

            if (User.Identity.IsAuthenticated)
            {
                character.UserId = HttpContext.Current.GetOwinContext()
                    .GetUserManager<ApplicationUserManager>()
                    .FindById(User.Identity.GetUserId()).Id;
            }

            if ((_repo.AddCharacter(character)) &&
                _repo.Save())
            {
                return Request.CreateResponse(HttpStatusCode.Created, character);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }
    }
    }

