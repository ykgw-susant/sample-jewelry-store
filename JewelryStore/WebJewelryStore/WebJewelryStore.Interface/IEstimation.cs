using System.Collections.Generic;
using System.Linq;
using WebJewelryStore.Models;
using WebJewelryStore.ViewModels;

namespace WebJewelryStore.Interface
{
    public interface IEstimation
    {
        int InsertEstimation(Estimation estimation);       
        List<Estimation> GetEstimationList();      
        
        int Count(int userId);
        
    }
}