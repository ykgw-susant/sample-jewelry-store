import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';

import {EstimationModel } from '../Models/app.EstimationModel';
import { PaginationService } from '../../Shared/PaginationService';

import{environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class EstimationService {
    private data: any;
    private apiUrl = environment.apiEndpoint + "/api/Estimation/";

    token: any;
    username: any;

    constructor(private http: HttpClient, private paginationService: PaginationService) {
        this.data = JSON.parse(localStorage.getItem('currentUser'));
        if(this.data==null)
        {
            this.data = JSON.parse(localStorage.getItem('AdminUser'));
        }
        this.token = this.data.token;
        this.username = this.data.username;
        
    }

    getAll<T>() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        let Url = environment.apiEndpoint + "/api/Estimation";
        const mergedUrl = `${Url}` +
            `?page=${this.paginationService.page}&pageCount=${this.paginationService.pageCount}`;

        return this.http.get<T>(mergedUrl, { headers: headers, observe: 'response' }).pipe(
            catchError(this.handleError)
        );
    }
    public GetAllTest() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<EstimationModel[]>(this.apiUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    // Save Estimation
    public SaveEstimation(estimationModel: EstimationModel)
    {
        var SaveUrl = environment.apiEndpoint +"/api/Estimation";
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(SaveUrl, estimationModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    // Get by ESID

    public GetById(MemberId) {
        console.log(MemberId);
        var editUrl = environment.apiEndpoint +"/api/Estimation"+ '/' + MemberId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<EstimationModel>(editUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    public DeleteEstimation(MemberId) {
        var deleteUrl = environment.apiEndpoint +"/api/Estimation"+ '/' + MemberId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.delete<any>(deleteUrl, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }


    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    };
}
