import { Pipe, PipeTransform } from '@angular/core';
import { House } from '../../models/house.model';

@Pipe({
  name: 'filterByPrice'
})
export class FilterByPricePipe implements PipeTransform {
  
  transform(houses: Array<House>, pattern: string): Array<House> {
    if(!houses){
      console.log('no houses');
      return [];
    } else if(!pattern){
      console.log('no pattern');
      return houses;
    }

    houses = houses.filter(house => {
      house.price <= Number(pattern);

      if (house.price <= Number(pattern)) {
        console.log(true);
        
      } else{
        console.log(false);
        
      }
    })
    return houses;
  }
  
}
