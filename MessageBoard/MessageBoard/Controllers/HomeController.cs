using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MessageBoard.Data;
using MessageBoard.Models;
using MessageBoard.Services;

namespace MessageBoard.Controllers
{
    public class HomeController : Controller
    {
        private IMailService _mailService;
        private IMessageBoardRepository _repo;

        public HomeController(IMailService mailService, IMessageBoardRepository repo)
        {
            _mailService = mailService;
            _repo = repo;
        }

        //[Authorize]
        public ActionResult Index()
        {
            var points = _repo.GetPoints()
            .OrderByDescending(t => t.Created)
            .Take(25)
            .ToList();

            return View(points);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Contact(ContactModel model)
        {
            if (_mailService.SendMail("me@myemail.com", "you@youremail.com", "an email", model.Comment))
            {
                ViewBag.MailSent = true;
            }
            return View();
        }

        public ActionResult MyMessages()
        {
            var topics = _repo.GetTopics()
    .OrderByDescending(t => t.Created)
        .Take(25)
        .ToList();

            return View(topics);
        }
    }
}