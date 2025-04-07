import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineService } from './shared/timeline.service';
import { Item } from './shared/item.model';
import { forkJoin, switchMap } from 'rxjs';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);


@Component({
  selector: 'app-timeline',
  imports: [CommonModule, MatListModule, MatProgressSpinnerModule, MatButtonToggleModule, MatIconModule, MatButtonModule, MatToolbarModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent implements OnInit {
  allItems: Item[] = [];
  allItemIds: number[] = [];
  pageSize = 30; // Number of items per fetch
  currentPage = 0;
  totalStories = 0;
  showTopButton = false;
  observer!: IntersectionObserver;

  @ViewChild('loadMoreTrigger', { static: false }) loadMoreTrigger!: ElementRef;

  constructor(private _timelineService: TimelineService)
  {}
  
  ngOnInit(): void {
    this.loadStoryIds('top'); // Default to showing top stories
  }

  ngAfterViewInit() {
    this.setupIntersectionObserver(); // Initialize infinite scroll observer
  }
  
  loadStoryIds(value: string) { // Pull all of the item IDs from the API
    this.allItems = [];
    this.allItemIds = []
    this.currentPage = 0

    this._timelineService.getItemIds(value).subscribe(itemIds => {
      this.allItemIds = itemIds;
      this.totalStories = itemIds.length;
      this.loadStories(); // Load the first batch of items
    });
  }

  loadStories() { // Pull details for 30 items at a time to reduce load times
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    const paginatedIds = this.allItemIds.slice(start, end);

    if (paginatedIds.length === 0) return; // No more stories to load

    forkJoin(paginatedIds.map(id => this._timelineService.getItem(id)))
      .subscribe(items => {
        this.allItems = [...this.allItems, ...items]; // Append new stories
        this.currentPage++; // Move to next batch
      });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.showTopButton = window.scrollY > 350; // Show the "Scroll to Top" button whenever the user scrolls down the page
  }

  setupIntersectionObserver() { //Set up the intersection observer for the infinite scroll
    this.observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        this.loadStories(); // Fetch next batch when user scrolls near the bottom
      }
    });

    if (this.loadMoreTrigger) {
      this.observer.observe(this.loadMoreTrigger.nativeElement);
    }
  }

  goToLink(url: string | undefined)
  {
    if(url != undefined){
    window.location.href = url; // Redirect to the URL of a selected post
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getTimeFromNow(postDateUnix: number | undefined)
  {
    if(postDateUnix != undefined){
    var postDate = new Date(postDateUnix * 1000) // Convert Unix Timestamp to JavaScript Date object
    return dayjs().to(dayjs(postDate)) // Return the time since the post date of the item
  }

    return "Something went Wrong"
  }

}
