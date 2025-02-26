import { HttpClient } from '@angular/common/http';
import {
  computed,
  effect,
  inject,
  Injectable,
  signal
} from '@angular/core';

import { map, Observable, single, tap } from 'rxjs';

import { environment } from '@envs/environment.development';

import type { Gif } from '../interfaces/gif.interface';
import type { GiphyResponse } from '../interfaces/giphy.interface';

import { GifMapper } from '../mapper/gifs.mapper';

const GIF_KEY = 'gifs';
const LIMIT = 25;
const BUNDLE = 'messaging_non_clips';

const loadFromLocalStorage = (): Record<string, Gif[]> => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
  const gifs = JSON.parse(gifsFromLocalStorage);

  return gifs;
};

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private http: HttpClient = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(false);
  private trendingPage = signal(0);

  trendingGifGroup = computed<Gif[][]>(() => {
    const groups = [];

    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }

    return groups;
  });

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed((): string[] => Object.keys(this.searchHistory()));

  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem(GIF_KEY, historyString);
  });

  loadTrendingGifs(): void {
    if (this.trendingGifsLoading()) return;

    this.trendingGifsLoading.set(true);

    this.http.get<GiphyResponse>(`${environment.giphyUrl}/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: LIMIT,
        offset: this.trendingPage() * 20,
        rating: 'g',
        bundle: BUNDLE
      }
    }).subscribe((res): void => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(res.data);

      this.trendingGifs.update(currentGifs => [...currentGifs, ...gifs]);
      this.trendingPage.update(currentPage => currentPage + 1);
      this.trendingGifsLoading.set(false);
    });
  }

  searchGifs(query: string): Observable<Gif[]> {
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/search`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: LIMIT,
        offset: 0,
        lang: 'es',
        bundle: BUNDLE,
        q: query
      }
    }).pipe(
      map(({data}) => data),
      map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
      tap((items) => {
        this.searchHistory.update((history) => ({
          ...history,
          [query.toLocaleLowerCase()]: items,
        }));
      }),
    );
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }

}
