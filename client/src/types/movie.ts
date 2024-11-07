export type Genre = {
  id: number;
  name: string;
  description?: string;
  movies: Movie[];
  createdAt: Date;
  updatedAt: Date;
};
export type Movie = {
  id: number;
  title: string;
  description: string;
  genreId: number;
  duration: number;
  releaseDate: Date;
  director: string;
  cast: string;
  language: string;
  subtitles: string;
  posterUrl: string;
  trailerUrl: string;
  ageRestriction: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  genre: Genre;
};
