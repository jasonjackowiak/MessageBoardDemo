using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MessageBoard.Data;

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

        public HttpResponseMessage Post([FromBody]Point point)
        {
            if (point.Created == default(DateTime))
            {
                point.Created = DateTime.Now;
            }

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
