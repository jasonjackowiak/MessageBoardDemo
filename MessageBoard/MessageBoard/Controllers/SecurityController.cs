using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;

namespace MessageBoard.Controllers
{
    public class SecurityController : ApiController
    {
        //Custom
        public bool Get()
        {
            //if logged in
            if (User.Identity.IsAuthenticated)
            {
                //And an Admin
                if (HttpContext.Current.GetOwinContext()
                    .GetUserManager<ApplicationUserManager>()
                    .FindById(User.Identity.GetUserId()).Admin)
                    return true;
                else return false;
                //You can do things!
            }
            else { return false; }
        }
    }
}
