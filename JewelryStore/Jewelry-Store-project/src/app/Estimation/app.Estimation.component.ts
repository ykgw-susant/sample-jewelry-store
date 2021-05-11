import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {EstimationModel } from './Models/app.EstimationModel';
import { EstimationService } from './Services/app.Estimation.Service';

import { DatePipe } from '@angular/common';


@Component({
    templateUrl: './app.Estimation.html',
    styleUrls: ['../Content/vendor/bootstrap/css/bootstrap.min.css',
        '../Content/vendor/metisMenu/metisMenu.min.css',
        '../Content/dist/css/sb-admin-2.css',
        '../Content/vendor/font-awesome/css/font-awesome.min.css'


    ]
})

export class EstimationComponent implements OnInit {
    
    EstimationModel: EstimationModel = new EstimationModel();
    errorMessage: any;
    output: any;  
    data: any;
    disSow:boolean;
    ngOnInit(): void 
    {
        this.EstimationModel.Discount=2;
        this.EstimationModel.TotalAmount=0;
    }

    private _estimationServ;  

    constructor(
        private datePipe: DatePipe,
        private _Route: Router,
        private estimationServ: EstimationService
    ) {
        this._estimationServ = estimationServ;
        this.data = JSON.parse(localStorage.getItem('AdminUser'));
        if(this.data!='undefined' && this.data!=null)
        {
            this.disSow=true
        }
        else
        {
            this.EstimationModel.Discount=0;
            this.disSow=false;
        }
    }
   
    calculate(event:any)
    {       
        var val=(this.EstimationModel.GoldPrice* this.EstimationModel.GoldPrice);
        var per=val*this.EstimationModel.Discount/100;       
        this.EstimationModel.TotalAmount=val-per;
    }
    onSubmit() {

        console.log(this.EstimationModel);
        
        this._estimationServ.SaveEstimation(this.EstimationModel).subscribe(
            response => 
            {
                this.output = response
                if (this.output.StatusCode == "409") {
                    alert('Estimation Already Exists');
                }
                else if (this.output.StatusCode == "200") {
                    alert('Estimation Added Successfully');
                    this._Route.navigate(['/Estimation/All']);
                }
                else {
                    alert('Something Went Wrong');
                }
            });

       
    }

  

    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;

    }
}