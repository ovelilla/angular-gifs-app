import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
})
export class SearchComponent {
    @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

    constructor(private gifsService: GifsService) {}

    search() {
        const value = this.searchInput.nativeElement.value;

        if (value.trim().length === 0) {
            return;
        }

        this.gifsService.searchGifs(value);

        this.searchInput.nativeElement.value = '';
    }
}
