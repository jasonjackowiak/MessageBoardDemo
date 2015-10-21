using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using MessageBoard.Data;
using MessageBoard.Models;
using Ninject.Activation;

using System.Web;

namespace MessageBoard.Controllers
{
    public class ImageController : ApiController
    {
        private IMessageBoardRepository _repo;

        public ImageController(IMessageBoardRepository repo)
        {
            _repo = repo;
        }

        public IEnumerable<Image> Get()
        {
            IQueryable<Image> results = _repo.GetImages();

            var images = results
                .OrderByDescending(t => t.Id)
                .Take(25)
                .ToList();

            return images;
        }

        //testing
        public HttpResponseMessage Post([FromBody] Image image)
        {
            if ((_repo.AddImage(image)) &&
            _repo.Save())
            {
                return Request.CreateResponse(HttpStatusCode.Created, image);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }
    }
}
