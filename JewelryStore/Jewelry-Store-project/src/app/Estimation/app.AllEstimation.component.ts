
import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EstimationModel } from './Models/app.EstimationModel';
import { EstimationService } from './Services/app.Estimation.service';

import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { PaginationService } from '../Shared/PaginationService';

@Component({
    templateUrl: './app.AllEstimation.html',
    styleUrls: ['../Content/vendor/bootstrap/css/bootstrap.min.css',
        '../Content/vendor/metisMenu/metisMenu.min.css',
        '../Content/dist/css/sb-admin-2.css',
        '../Content/vendor/font-awesome/css/font-awesome.min.css',
        './app.EstimationComponent.css'
    ]
})


export class AllEstimation implements OnInit {
    private _Estimationregistration;
    data: EstimationModel[];
    errorMessage: any;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns: string[] = ['ESID', 'GoldPrice', 'EWeight', 'Discount','CreatedBy', 'TotalAmount'];
    dataSource = new MatTableDataSource<EstimationModel>();;
    @Input() totalCount: number;
    @Output() onPageSwitch = new EventEmitter();

    constructor(private _Route: Router,private estimationreServ: EstimationService, public paginationService: PaginationService) {
        this._Estimationregistration = estimationreServ;
    }

    ngOnInit(): void {
        this.estimationreServ.GetAllTest().subscribe(
            allEstimation => {
                this.data = allEstimation
                this.dataSource = new MatTableDataSource(this.data);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
            },
            error => this.errorMessage = <any>error
        );
    }
getAllEstimation() {
        this.estimationreServ.getAll<EstimationModel[]>()
            .subscribe((result: any) => 
            {
                console.log(result.headers);
                this.totalCount = JSON.parse(result.headers.get('X-Pagination')).totalCount;
               // this.totalCount = 4;
                this.dataSource = result.body.value;
            });           
    }
   
      applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
      }
}