import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GifsService {
    private _url: string = 'https://api.giphy.com/v1/gifs';
    private _apiKey: string = 'N2w72Rt1BiklrySU7rGWRy2ahyHLgNdo';
    private _history: string[] = [];
    private _results: Gif[] = [];

    get history() {
        return [...this._history];
    }

    get results() {
        return [...this._results];
    }

    constructor(private http: HttpClient) {
        this._history = JSON.parse(localStorage.getItem('history')!) || [];
        this._results = JSON.parse(localStorage.getItem('results')!) || [];
    }

    async searchGifs(query: string) {
        query = query.trim().toLocaleLowerCase();

        if (!this._history.includes(query)) {
            this._history.unshift(query);
            this._history = this._history.splice(0, 10);

            localStorage.setItem('history', JSON.stringify(this._history));
        }

        const params = new HttpParams({
            fromObject: {
                api_key: this._apiKey,
                q: query,
                limit: '10',
            },
        });

        // const params = new HttpParams()
        //     .set('api_key', this._apiKey)
        //     .set('q', query)
        //     .set('limit', '10');

        const resp = await firstValueFrom(
            this.http.get<SearchGifsResponse>(`${this._url}/search`, { params })
        );

        this._results = resp.data;

        localStorage.setItem('results', JSON.stringify(this._results));

        // this.http
        //     .get<SearchGifsResponse>(
        //         `https://api.giphy.com/v1/gifs/search?api_key=${this._apiKey}&q=${query}&limit=10`
        //     )
        //     .subscribe((resp) => {
        //         this._results = resp.data;
        //     });
    }
}
