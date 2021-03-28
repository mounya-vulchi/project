import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(booksArray: any[], searchTerm: string): any[] {
    if(!searchTerm){
      
      return booksArray;
    }
    
    else {
      let category= booksArray.filter(obj=>obj.category.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1);
      let author=booksArray.filter(obj=>obj.author.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1);
      if(category.length!==0){
        return category;
      }
      else{
        return author;
      }
      
    }
  }

}
