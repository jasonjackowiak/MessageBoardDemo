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
            results = _repo.GetCharacters();

            var character = results
                .OrderByDescending(t => t.Id)
                .Take(5)
                .ToList();
            return character;
        }

        public HttpResponseMessage Post([FromBody]Point point)
        {
            if (point.Created == default(DateTime))
            {
                point.Created = DateTime.Now;
            }

            string name = HttpContext.Current.GetOwinContext()
        .GetUserManager<ApplicationUserManager>()
        .FindById(User.Identity.GetUserId()).FirstName + " " + HttpContext.Current.GetOwinContext()
        .GetUserManager<ApplicationUserManager>()
        .FindById(User.Identity.GetUserId()).Surname;

            point.AwardedBy = name;

            if ((_repo.AddPoint(point)) &&
                _repo.Save())
            {
                return Request.CreateResponse(HttpStatusCode.Created, point);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }
    }
    }

