import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})


export class TimelineService {

  private _http = inject(HttpClient);

  public getItemIds(value: string)
  {
    
    return this._http.get<number[]>(
      'https://hacker-news.firebaseio.com/v0/' + value + 'stories.json'
    );
  
  }

  public getItem(id: number)
  {
    return this._http.get<Item>(
      'https://hacker-news.firebaseio.com/v0/item/' + id + '.json'
    );
  }
}
