using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace WebJewelryStore.Models
{
    public class Estimation
    {

        [Key]
        public int ESID { get; set; }       

        [DisplayName("Gold Price")]
        [Required(ErrorMessage = "Please enter Gold Price")]
        public Decimal? GoldPrice { get; set; }
        [DisplayName("Weight")]
        [Required(ErrorMessage = "Please enter Weight")]
        public Decimal? EWeight { get; set; }
       
        public Decimal? Discount { get; set; }           


        public long? Createdby { get; set; }

        public long? ModifiedBy { get; set; }       

        [NotMapped]
        [Required(ErrorMessage = "Amount Cannot be Empty")]
        public Decimal? TotalAmount { get; set; }
    
    }
}
