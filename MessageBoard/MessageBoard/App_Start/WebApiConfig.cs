using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.Mvc;
using Newtonsoft.Json.Serialization;

namespace MessageBoard
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();

            var jsonFormatter = config.Formatters.OfType<JsonMediaTypeFormatter>().FirstOrDefault();
            jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            config.Routes.MapHttpRoute(
                name: "RepliesRoute",
                routeTemplate: "api/v1/topics/{topicId}/Replies/{id}",
                defaults: new { Controller = "replies", id = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
    name: "DefaultRoute",
    routeTemplate: "api/v1/{controller}/{id}",
    defaults: new { id = RouteParameter.Optional }
);
        }
    }
}
