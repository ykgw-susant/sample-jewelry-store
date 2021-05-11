import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { PaginationService } from '../../Shared/PaginationService';
import { EstimationModel } from '../Models/app.EstimationModel';
import { EstimationService } from '../Services/app.Estimation.Service';


@Component({
    selector: 'app-list',
    templateUrl: 'app.Estimationlist.component.html',
    styleUrls: ['../../Content/vendor/bootstrap/css/bootstrap.min.css',
        '../../Content/vendor/metisMenu/metisMenu.min.css',
        '../../Content/dist/css/sb-admin-2.css',
        '../../Content/vendor/font-awesome/css/font-awesome.min.css'
    ]
})

export class EstimationListComponent {

    dataSource = new MatTableDataSource<EstimationModel>();
    displayedColumns: string[] = ['ESID', 'GoldPrice', 'EWeight', 'Discount','CreatedBy', 'TotalAmount'];
  
    _Route: any;

    @Input('dataSource')
    set dataSourceForTable(value: EstimationModel[]) 
    {
        this.dataSource = new MatTableDataSource<EstimationModel>(value);
    }

    @Input() totalCount: number;
    @Output() onPageSwitch = new EventEmitter();

    constructor(public paginationService: PaginationService, private estimation: EstimationService,) { }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    Delete(ESID): void {
        console.log(ESID);
        if (confirm("Are you sure to delete ESID ?")) {
            this.estimation.DeleteEstimation(ESID).subscribe
                (
                    response => {
                        if (response.StatusCode == "200") {
                            alert('Deleted Estimation Successfully');
                            location.reload();
                        }
                        else {
                            alert('Something Went Wrong');
                            this._Route.navigate(['/Estimation/AllEstimation']);
                        }
                    }
                )
        }
    }

}
