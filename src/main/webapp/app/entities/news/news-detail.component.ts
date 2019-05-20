import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INews } from 'app/shared/model/news.model';

@Component({
    selector: 'jhi-news-detail',
    templateUrl: './news-detail.component.html'
})
export class NewsDetailComponent implements OnInit {
    news: INews;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ news }) => {
            this.news = news;
        });
    }

    previousState() {
        window.history.back();
    }
}
