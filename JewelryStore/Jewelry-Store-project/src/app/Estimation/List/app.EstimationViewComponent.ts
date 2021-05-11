import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PaginationService } from '../../Shared/PaginationService';
import { EstimationModel } from '../Models/app.EstimationModel';
import { EstimationService } from '../Services/app.Estimation.Service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-overview',
    templateUrl: 'app.EstimationViewComponent.html'
 
})

export class EstimationViewComponent implements OnInit {

    dataSource: EstimationModel[];
    totalCount: number;

    constructor(
        private _Route: Router,
        private estimationServ: EstimationService,
        private paginationService: PaginationService) { }

    ngOnInit(): void {
        this.getAllEstimation();
    }

    switchPage(event: PageEvent) {
        this.paginationService.change(event);
        this.getAllEstimation();
    }

    getAllEstimation() {
        this.estimationServ.getAll<EstimationModel[]>()
            .subscribe((result: any) => 
            {
                console.log(result.headers);
               // this.totalCount = JSON.parse(result.headers.get('X-Pagination')).totalCount;
               this.totalCount = 4;
                this.dataSource = result.body.value;
            });           
    }

  
      

    
}
