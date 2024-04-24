import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagination } from 'src/app/interfaces/common/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() pagination !: Pagination 
  @Output() onPaging:EventEmitter<number> = new EventEmitter<number>()

  
  getPageNumber(): (number | string) [] {
    const pages : (number | string) [] = [];
    let startPage = Math.max(1, this.pagination.currentPage - ( Math.floor(this.pagination.pagesToShow/2)))
    let endPage = Math.min(this.pagination.totalPage, startPage + this.pagination.pagesToShow - 1)

    if(this.pagination.currentPage > 1 && startPage !== 1) {
      pages.push(1)
      if(startPage - 1 !== 1) {
        pages.push('...')
      }
    }

    for (let index = startPage; index <= endPage; index++) {    
      pages.push(index)
    }

    if(this.pagination.currentPage < this.pagination.totalPage && endPage !== this.pagination.totalPage) {
      if(this.pagination.currentPage < this.pagination.totalPage-1 && this.pagination.totalPage - endPage !== 1){
        pages.push('...')
      }
      pages.push(this.pagination.totalPage)
    }
    return pages
  }
  goPages(pageNumber: number | string) {
    this.onPaging.emit(pageNumber as number)
  }
}
