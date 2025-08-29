import { HttpClient } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { SearchCriteria } from '../criteria/search-criteria';
import { ListWrapper } from '../dtos/list-wrapper';
import { Page } from '../dtos/page';
import { PageRequest } from '../models/page-request';
import { ApiConnector } from './api.connector';

export abstract class CrudConnector<
  T,
  U extends SearchCriteria,
  V extends ListWrapper,
> extends ApiConnector {
  constructor(
    protected override readonly oAuthService: OAuthService,
    protected override readonly httpClient: HttpClient,
  ) {
    super(oAuthService, httpClient);
  }

  create(entity: T, url?: string): Observable<T> {
    const endpoint = url || this.getCreateUrl();
    return this.httpClient.post<T>(endpoint, entity, this.getOptions());
  }

  read(
    searchCriteria: U,
    pageRequest: PageRequest,
    url?: string,
  ): Observable<Page<V>> {
    const endpoint = url || this.getReadUrl();
    return this.httpClient.post<Page<V>>(
      endpoint,
      searchCriteria,
      this.getOptions(pageRequest),
    );
  }

  readByUrl(url: string): Observable<T> {
    return this.httpClient.get<T>(url, this.getOptions());
  }

  update(entity: T, url: string): Observable<T> {
    return this.httpClient.put<T>(url, entity, this.getOptions());
  }

  delete(url: string): Observable<void> {
    return this.httpClient.delete<void>(url, this.getOptions());
  }

  protected abstract getCreateUrl(): string;
  protected abstract getReadUrl(): string;
}
