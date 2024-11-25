import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../enviroments/environment';
import { Observable, catchError, map, throwError } from 'rxjs';
import { saveAs } from 'file-saver';



@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  uploadImage(formData: FormData): Observable<{ filepath: string }> {
    return this.http.post<{ filepath: string }>(
      `${environment.apiUrl}/imageUpload`,
      formData
    );
  }

  findProductsByProductKind(
    filters: {
      id?: any;
      productname?: any;
      sku?: any;
      colors?: any;
      size?: any;
    },
    page: number = 1,
    limit: number = 7
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    Object.keys(filters).forEach((key) => {
      const value = filters[key as keyof typeof filters];
      if (value) {
        params = params.set(key, value);
      }
    });

    return this.http.get<any>(
      `${environment.apiUrl}/product-types-with-products`,
      {
        params,
      }
    );
  }

  deleteAllproductAndPK(id: any): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/allproductbypK/${id}`);
  }

  createOrupdateProductWithVariants(id: any, payload: any): Observable<any> {
    return this.http.put<any>(
      `${environment.apiUrl}/updateWithVariants/${id}`,
      payload
    );
  }

  exportProductData() {
    this.http
      .get(`${environment.apiUrl}/productdata/export`, {
        responseType: 'blob',
      })
      .subscribe((blob) => saveAs(blob, 'productData.xlsx'));
  }

  

  importProductData(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http
      .post(`${environment.apiUrl}/productdata/import`, formData)
      .pipe(
        map((response: any) => {
         
          console.log('Response from server:', response);
          return response;
        }),
        catchError((error: any) => {
          
          console.error('Error during import:', error);
          return throwError(
            () => new Error(error.message || 'Error importing product data.')
          );
        })
      );
  }
}
