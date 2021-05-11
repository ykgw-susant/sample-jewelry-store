using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using WebJewelryStore.Interface;
using WebJewelryStore.ViewModels;

namespace WebJewelryStore.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class EstimationDetailsReportController : ControllerBase
    {
        private readonly IReports _reports;
        public EstimationDetailsReportController(IReports reports)
        {
            _reports = reports;
        }

        // GET: api/EstimationDetailsReport
        [HttpGet]
        public List<EstimationViewModel> Get()
        {
            try
            {
                return _reports.Generate_AllEstimationReport();
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
