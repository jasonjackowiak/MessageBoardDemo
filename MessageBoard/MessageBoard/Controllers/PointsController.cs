using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using MessageBoard.Data;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;

namespace MessageBoard.Controllers
{

    public class PointsController : ApiController
    {
        private IMessageBoardRepository _repo;

        public PointsController(IMessageBoardRepository repo)
        {
            _repo = repo;
        }

        public IEnumerable<Point> Get()
        {
            IQueryable<Point> results;
            results = _repo.GetPoints();

            var points = results
                .OrderByDescending(t => t.Created)
                .Take(25)
                .ToList();
            return points;
        }

        //public int CalculateTotalPoints()
        //{
        //    IQueryable<Point> results;
        //    results = _repo.GetPoints();

        //    var points = results
        //        .OrderByDescending(t => t.Created)
        //        //.Take(25)
        //        .ToList();
        //    //return points;

        //    return points.Aggregate(0, (current, p) => current + p.Amount);
        //}

        public HttpResponseMessage Post([FromBody]Point point)
        {
            if (point.Created == default(DateTime))
            {
                point.Created = DateTime.Now;
            }

            string name = "unknown";
            if (User.Identity.IsAuthenticated)
                name = HttpContext.Current.GetOwinContext()
                .GetUserManager<ApplicationUserManager>()
                .FindById(User.Identity.GetUserId()).FirstName + " " + HttpContext.Current.GetOwinContext()
                .GetUserManager<ApplicationUserManager>()
                .FindById(User.Identity.GetUserId()).Surname;
            point.AwardedBy = name;

            //Get character to assign to
            var character = _repo.GetFirstCharacter();
            point.CharacterAwardedTo = character.Name;

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
