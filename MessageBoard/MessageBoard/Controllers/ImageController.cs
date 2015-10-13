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

        //[System.Web.Mvc.HttpPost]
        //public ActionResult Post([FromBody]Image image)
        //{
        //    return Json("Tutorial Saved", JsonRequestBehavior.AllowGet);
        //}

        //testing
        public HttpResponseMessage Post([FromBody] Image image)
        {
            //return Json("Tutorial Saved", JsonRequestBehavior.AllowGet);

            return new HttpResponseMessage();
        }
    }
}
