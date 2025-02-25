import { Gif } from '../interfaces/gif.interface';
import { GyphyItem } from '../interfaces/giphy.interface';

export class GifMapper {

  private static mapGiphyItemToGif(giphyItem: GyphyItem): Gif {
    return {
      id: giphyItem.id,
      title: giphyItem.title,
      url: giphyItem.images.original.url,
    }
  }

  static mapGiphyItemsToGifArray(items: GyphyItem[]): Gif[] {
    return items.map(this.mapGiphyItemToGif);
  }

}
