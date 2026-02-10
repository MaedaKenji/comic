export interface Manga {
  id: number;
  title: string;
  cover: string;
  is_hot: boolean;
}

export type MangaItem = {
  id: number;
  title: string;
  cover: string;
  slug: string;
};
