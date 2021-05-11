using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using WebJewelryStore.Interface;
using WebJewelryStore.ViewModels;

namespace WebJewelryStore.Concrete
{
    public class ReportsMaster : IReports
    {
        private readonly IConfiguration _configuration;
        private readonly DatabaseContext _context;
        public ReportsMaster(DatabaseContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public List<EstimationViewModel> Generate_AllEstimationReport()
        {
            using (var con = new SqlConnection(_configuration.GetConnectionString("DatabaseConnection")))
            {
                return con.Query<EstimationViewModel>("Usp_GetAllEstimation", null, null, true, 0, commandType: CommandType.StoredProcedure).ToList();
            }
        }
    }
}
