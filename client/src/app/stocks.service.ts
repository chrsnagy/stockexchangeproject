import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Stock, StockValue } from './stocksmodel';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import * as io from 'socket.io-client';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ObserveOnMessage } from 'rxjs/operators/observeOn';

@Injectable()
export class StocksService {
    private getStockUrl = 'stocks/get';
    private postStockUrl = 'stocks/post';
    private postValueUrl = 'stock/stockValue';
    private removeStockUrl = 'stocks/remove';
    constructor(private http: Http) { }
    private socket;
    private url = window.location.origin;

    /**
     * Gets stock data
     */
    getStocks(): Observable<Stock[]> {
        let observable = new Observable<Stock[]>(observer => {
            console.log('Socket:', this.url);
            this.socket = io(this.url);
            this.socket.on('refresh', (data) => {
                console.log('hello', data);
                observer.next(data);
            });

            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

    /*
     * Add stock database
     */
    addStock (stock: Stock): Observable<{Stock}> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.postStockUrl, stock, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    addValue(id, value): Observable<Stock> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const valueData = {
            id: id,
            value: value,
            date: Date.now()
        };
        return this.http.post(this.postValueUrl, valueData, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    removeStock(id): Observable<Stock> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const stockId = {
            id: id
        };
        return this.http.post(this.removeStockUrl, stockId, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*
     * Data handlers
     */

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }

    // End of Data handlers
}
