using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebJewelryStore.ViewModels
{
    public class EstimationViewModel
    {
        public long ESIDrId { get; set; }

        [DisplayName("GoldPrice")]
        [Required(ErrorMessage = "Please GoldPrice")]
        public string GoldPrice { get; set; }
        [DisplayName("EWeight")]
        [Required(ErrorMessage = "Please EWeight")]
        public string EWeight { get; set; }
        [DisplayName("Discount")]
        [Required(ErrorMessage = "Discount")]
        public string Discount { get; set; }


        [NotMapped]
        [Required(ErrorMessage = "Amount Cannot be Empty")]
        public Decimal? TotalAmount { get; set; }
        public string Createdby { get; set; }


    }
}
