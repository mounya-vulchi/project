import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(books: any[], category: string): any[] {
    if(!category){
      
      return books;
    }
    
    else {
      return books.filter(obj=>obj.category.toLowerCase().indexOf(category.toLowerCase())!==-1);
    }
  }

}
