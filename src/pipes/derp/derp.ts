import { Pipe } from '@angular/core';

@Pipe({
  name: 'derp',
})
export class DerpPipe {
  /*transform (value, args) {
    console.log(value);
    return Array.from(value);
  }*/

  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }
}
