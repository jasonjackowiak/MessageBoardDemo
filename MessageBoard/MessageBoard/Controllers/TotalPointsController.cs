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

    public class TotalPointsController : ApiController
    {
        private IMessageBoardRepository _repo;

        public TotalPointsController(IMessageBoardRepository repo)
        {
            _repo = repo;
        }

        public Object Get()
        {
            IQueryable<Point> results;
            results = _repo.GetPoints();

            int totalPoints = 0;
            if (results.Any())
                totalPoints += Enumerable.Sum(results, p => p.Amount);

            double rawLevel = Math.Ceiling((double)totalPoints / 1000);
            int level = Convert.ToInt32(rawLevel);

            Object[] x = new Object[2];
            x[0] = new {totalPoints};
            x[1] = new {level};

            return x;
        }

    }

}
