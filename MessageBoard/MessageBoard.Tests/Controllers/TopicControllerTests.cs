using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Hosting;
using System.Web.Http.Routing;
using MessageBoard.Controllers;
using MessageBoard.Data;
using MessageBoard.Tests.Fakes;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;

namespace MessageBoard.Tests.Controllers
{
    [TestClass]
    public class TopicControllerTests
    {
        private TopicsController _controller;

        [TestInitialize]
        public void Init()
        {
            //a
            _controller = new TopicsController(new FakeMessageBoardRepository());
        }

        [TestMethod]
        public void TopicsController_Get()
        {
            //a
            //a
            var results = _controller.Get(true);

            //a
            Assert.IsNotNull(results);
            Assert.IsTrue(results.Count() > 0);
            Assert.IsNotNull(results.First());
            Assert.IsNotNull(results.First().Title);
        }

        [TestMethod]
        public void TopicsController_Post()
        {
            //a
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/v1/topics");
            var route = config.Routes.MapHttpRoute("DefaultApi", "api/{content}/{id}");
            var routeData = new HttpRouteData(route, new HttpRouteValueDictionary { {"controller", "topics"} });

            _controller.ControllerContext = new HttpControllerContext(config, routeData, request);
            _controller.Request = request;
            _controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;

            var newTopic = new Topic()
            {
                Title = "test",
                Body = "testtest"
            };

            //a
            var result = _controller.Post(newTopic);

            var json = result.Content.ReadAsStringAsync().Result;
            var topic = JsonConvert.DeserializeObject<Topic>(json);

            //a
            Assert.AreEqual(HttpStatusCode.Created, result.StatusCode);

            Assert.IsNotNull(topic);
            Assert.IsTrue(topic.Id > 0);
            Assert.IsTrue(topic.Created > DateTime.MinValue);
        }
    }
}
