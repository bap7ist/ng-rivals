import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleSheetService {
  constructor(private http: HttpClient) {}

  public getSheet(): Observable<any> {
    const sheetno = '0';
    const sheetid = '1GLoPM2OKSGQPypZeBL3uCl4diAi4YXLye-LrXIx4jr4';
    // const url = `https://spreadsheets.google.com/feeds/list/${sheetid}/${sheetno}/public/values?alt=json`;
    const url = 
    `https://spreadsheets.google.com/feeds/list/${sheetid}/public/values?alt=json`;

    return this.http.get(url).pipe(
      map((res: any) => {
        const data = res.feed.entry;

        const returnArray: Array<any> = [];
        if (data && data.length > 0) {
          console.log("data from google: ",data);
          
        }
        return returnArray;
      })
    );
  }
}
