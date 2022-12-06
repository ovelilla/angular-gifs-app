import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
    get history() {
        return this.gifsService.history;
    }

    constructor(private gifsService: GifsService) {}

    search(query: string) {
        this.gifsService.searchGifs(query);
    }
}
