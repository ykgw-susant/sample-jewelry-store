using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using System;
using WebJewelryStore.Controllers;
using WebJewelryStore.Interface;
using WebJewelryStore.Models;
using WebJewelryStore.ViewModels;

namespace Tests
{
    public class UserControllerTest
    {
        //arrange act assert//      
       
        private Mock<IUsers> _user;
        private IUrlHelper _urlHelper;
        DefaultHttpContext httpContext;
        ControllerContext controllerContext;
        UsersViewModel objectsList;

        [SetUp]
        public void Setup()
        {
            _user = new Mock<IUsers>();
            
            httpContext = new DefaultHttpContext();
            controllerContext = new ControllerContext()
            {
                HttpContext = httpContext
            };
            objectsList = new UsersViewModel();
            objectsList.Id = 1;
            objectsList.UserName = "Susant";
            objectsList.FullName = "Susanta Kumar Sahu";
            objectsList.EmailId = "Susanta.@gmail.com";
            objectsList.Password = "sus123";         
            objectsList.Status = true;

        }

        [Test]
        public void UserController_method_ListAllUsers()
        {
            UserController estimationController = new UserController(_user.Object)
            {
                ControllerContext = controllerContext,
            };
            var result = estimationController.Get();
            Assert.AreEqual(200, ((ObjectResult)result).StatusCode);
        }
        [Test]
        public void UserController_method_AddUser()
        {
            UserController estimationController = new UserController(_user.Object)
            {
                ControllerContext = controllerContext,
            };
            var result = estimationController.Post(objectsList);
            Assert.AreEqual(200, (result).StatusCode);
        }
        [Test]
        public void UserController_method_AddUserConflict()
        {
            UserController estimationController = new UserController(_user.Object)
            {
                ControllerContext = controllerContext,
            };
            var result = estimationController.Post(objectsList);
            Assert.AreEqual(209, (result).StatusCode);
        }
    }
}