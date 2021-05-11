using System.Collections.Generic;
using WebJewelryStore.ViewModels;

namespace WebJewelryStore.Interface
{
    public interface IReports
    {
        List<EstimationViewModel> Generate_AllEstimationReport();
        
        
    }
}