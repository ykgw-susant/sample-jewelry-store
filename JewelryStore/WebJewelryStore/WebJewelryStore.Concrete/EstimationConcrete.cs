using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using WebJewelryStore.Interface;
using WebJewelryStore.Models;
using WebJewelryStore.ViewModels;
using System.Linq.Dynamic.Core;

namespace WebJewelryStore.Concrete
{
    public class EstimationConcrete : IEstimation
    {
        private readonly IConfiguration _configuration;
        private readonly DatabaseContext _context;


        public EstimationConcrete(DatabaseContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;

        }

      


        public List<Estimation> GetEstimationList()
        {
            using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DatabaseConnection")))
            {
                return con.Query<Estimation>("sprocEstimationListSelectList", null, null, true, 0, commandType: CommandType.StoredProcedure).ToList();
            }
        }



        public int InsertEstimation(Estimation estimation)
        {
            using (var con = new SqlConnection(_configuration.GetConnectionString("DatabaseConnection")))
            {
                con.Open();
                var sqlTransaction = con.BeginTransaction();
                var para = new DynamicParameters();
                para.Add("@ESId", "0");
                para.Add("@GoldPrice", estimation.GoldPrice);
                para.Add("@EWeight", estimation.EWeight);
                para.Add("@Discount", estimation.Discount);
                para.Add("@TotalAmount", estimation.TotalAmount);
               
                para.Add("@Createdby", estimation.Createdby);
             
                para.Add("@ESIDOUT", dbType: DbType.Int32, direction: ParameterDirection.Output);
                int resultEstimation = con.Execute("sprocEstimationInsertUpdateSingleItem", para, sqlTransaction, 0, CommandType.StoredProcedure);
                int EstimationId = para.Get<int>("ESIDOUT");

                if (resultEstimation > 0 )
                {
                    sqlTransaction.Commit();
                    return EstimationId;
                }
                else
                {
                    sqlTransaction.Rollback();
                    return 0;
                }
            }
        }

        public int Count(int userId)
        {
            var Estimationcount = (from payment in _context.Estimation
                            where payment.Createdby == userId
                select payment).Count();
            return Estimationcount;
        }

    }
}
