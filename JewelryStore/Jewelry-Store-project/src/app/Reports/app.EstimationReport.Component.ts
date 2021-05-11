import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { ReportService } from './Services/app.ReportServices';
import { EstimationReportModel } from './Models/app.EstimationReportModel';

@Component({
    templateUrl: './app.EstimationReport.html',
    styleUrls: ['../Content/vendor/bootstrap/css/bootstrap.min.css',
        '../Content/vendor/metisMenu/metisMenu.min.css',
        '../Content/dist/css/sb-admin-2.css',
        '../Content/vendor/font-awesome/css/font-awesome.min.css',
        './app.EstimationReport.css'
    ]
})

export class EstimationReportComponent 
{
    private _reportService;
    allEstimationDetailsReport :EstimationReportModel[];
    errorMessage: any;
    dataSource: MatTableDataSource<EstimationReportModel>;
    constructor(reportService :ReportService)
    {
        this._reportService = reportService;
    }

    @ViewChild('TABLE') table: ElementRef;
    displayedColumns: string[] = ['ESID', 'GoldPrice', 'EWeight', 'Discount','CreatedBy', 'TotalAmount'];
    


    ngOnInit() {

        this._reportService.GetAllEstimationDetailsReport().subscribe(
          allrecords => {
            this.allEstimationDetailsReport = allrecords
            this.dataSource = new MatTableDataSource(this.allEstimationDetailsReport);
       
          },
          error => this.errorMessage = <any>error
        );
    
      }

    ExportTOExcel() 
    {
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        /* save to file */
        XLSX.writeFile(wb, 'EstimationReport.xlsx');
    }


}


