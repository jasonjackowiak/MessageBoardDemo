using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MessageBoard.Controllers
{
    public class SecurityController : ApiController
    {
        //Custom
        public bool Get()
        {
            return User.Identity.IsAuthenticated;
        }
    }
}
