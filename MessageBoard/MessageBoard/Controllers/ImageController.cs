using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Mvc;
using MessageBoard.Data;
using MessageBoard.Models;
using Ninject.Activation;

using System.Web;

namespace MessageBoard.Controllers
{
    public class ImageController : Controller
    {
        private IMessageBoardRepository _repo;

        public ImageController(IMessageBoardRepository repo)
        {
            _repo = repo;
        }

        [HttpPost]
        public ActionResult SaveTutorial(Image image)
        {
            return Json("Tutorial Saved", JsonRequestBehavior.AllowGet);
        }

    }
}
