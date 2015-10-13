using System.Web.Mvc;
using System.Web.Routing;

namespace MessageBoard
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Character",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Character", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "CharacterClass",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "CharacterClass", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Image",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Image", action = "Index", id = UrlParameter.Optional }
            );

        }
    }
}
