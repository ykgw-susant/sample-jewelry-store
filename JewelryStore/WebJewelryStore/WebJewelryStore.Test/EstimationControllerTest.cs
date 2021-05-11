using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using WebJewelryStore.Controllers;
using WebJewelryStore.Interface;
using WebJewelryStore.Models;

namespace Tests
{
    public class EstimationControllerTest
    {
        //arrange act assert//      
       
        private Mock<IEstimation> _estimation;
        private IUrlHelper _urlHelper;
        DefaultHttpContext httpContext;
        ControllerContext controllerContext;
        Estimation objectsList;

        [SetUp]
        public void Setup()
        {
            _estimation = new Mock<IEstimation>();
            
            httpContext = new DefaultHttpContext();
            controllerContext = new ControllerContext()
            {
                HttpContext = httpContext
            };
            objectsList = new Estimation();
            objectsList.ESID = 1;
            objectsList.GoldPrice = 1;
            objectsList.EWeight = 2;
            objectsList.Discount = 2;
            objectsList.TotalAmount = 100;        

        }

        [Test]
        public void EstimationController_method_ListAllEstimation()
        {
            EstimationController estimationController = new EstimationController(_urlHelper, _estimation.Object)
            {
                ControllerContext = controllerContext,
            };
            var result = estimationController.Get();
            Assert.AreEqual(200, ((ObjectResult)result).StatusCode);
        }
        [Test]
        public void EstimationController_method_AddEstimation()
        {
            EstimationController estimationController = new EstimationController(_urlHelper, _estimation.Object)
            {
                ControllerContext = controllerContext,
            };
            var result = estimationController.Post(objectsList);
            Assert.AreEqual(200, (result).StatusCode);
        }
    }
}