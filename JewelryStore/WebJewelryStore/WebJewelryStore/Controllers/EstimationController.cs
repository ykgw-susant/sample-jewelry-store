using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WebJewelryStore.Common;
using WebJewelryStore.Interface;
using WebJewelryStore.Models;
using WebJewelryStore.ViewModels;

namespace WebJewelryStore.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class  EstimationController : ControllerBase
    {
        private readonly IEstimation _estimation;
        private readonly IUrlHelper _urlHelper;

        public EstimationController(IUrlHelper urlHelper, IEstimation estimation)
        {
            _estimation = estimation;
            _urlHelper = urlHelper;
        }
      

        // POST: api/RegisterEstimation
        [HttpPost]
        public HttpResponseMessage Post([FromBody] Estimation est)
        {
            try
            {
                if (ModelState.IsValid)
                {
                   
                        var userId = this.User.FindFirstValue(ClaimTypes.Name);
                        var autoEstimation = AutoMapper.Mapper.Map<Estimation>(est);
                        
                        autoEstimation.Createdby = Convert.ToInt32(userId);

                        var result = _estimation.InsertEstimation(autoEstimation);
                        if (result > 0)
                        {
                            var response = new HttpResponseMessage()
                            {
                                StatusCode = HttpStatusCode.OK
                            };
                            return response;
                        }
                        else
                        {
                            var response = new HttpResponseMessage()
                            {
                                StatusCode = HttpStatusCode.BadRequest
                            };
                            return response;
                        }
                    
                    
                }
                else
                {
                    var response = new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.BadRequest
                    };
                    return response;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        public IEnumerable<Estimation> Get()
        {            
            return _estimation.GetEstimationList();
        }

    }
}
