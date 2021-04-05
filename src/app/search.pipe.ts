import { Pipe, PipeTransform } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  constructor(private toastr:ToastrService){}

  transform(booksArray: any[], searchTerm: string): any[] {
    if(!searchTerm){
      
      return booksArray;
    }
    
    else {
      let booktitle=booksArray.filter(obj=>obj.booktitle.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1);
      let category= booksArray.filter(obj=>obj.category.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1);
      let author=booksArray.filter(obj=>obj.author.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1);
      if(category.length!==0){
        return category;
      }
      else if(booktitle.length!==0){
        return booktitle;
      }
      else if(author.length!==0){
        return author;
      }
      else{
        this.toastr.error('Data Not Found');
      }
      
    }
  }

}
