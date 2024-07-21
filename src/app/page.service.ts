import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private currentPage: string = 'city'; // Default page

  setCurrentPage(page: string) {
    this.currentPage = page;
  }

  getCurrentPage(): string {
    return this.currentPage;
  }
}
