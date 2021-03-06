import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { EstimationReportModel } from "../Models/app.EstimationReportModel";
// import { environment } from "src/app/Shared/environment";
import{environment} from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})

export class ReportService {
    private data: any;
    private apiUrl = environment.apiEndpoint + "/api/User/";
    token: any;
    username: any;

    constructor(private http: HttpClient) {
        this.data = JSON.parse(localStorage.getItem('AdminUser'));
        this.token = this.data.token;
    }

    // Get All DetailsReport
    public GetAllEstimationDetailsReport() {
        var apiUrl = environment.apiEndpoint + "/api/EstimationDetailsReport/";
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<EstimationReportModel[]>(apiUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

  
    private handleError(error: HttpErrorResponse)
    {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }

}
