import { HttpService as NestHttpService } from '@nestjs/common';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

export class MyHttpService extends NestHttpService {
  constructor(instance: AxiosInstance) {
    super(instance);
  }

  public get<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<T>> {
    return super.get(url, config);
  }

  public delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<T>> {
    return super.delete(url, config);
  }

  public head<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<T>> {
    return super.head(url, config);
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<T>> {
    return super.post(url, data, config);
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<T>> {
    return super.put(url, data, config);
  }

  public patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<T>> {
    return super.patch(url, data, config);
  }
}
