declare type MovieSample = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
};

declare type DetailedMovie = {
  id: number;
  title: string;
  overview: string;
  posters: Image[];
  vote_average: number;
  vote_count: number;
  imdb_id: string;
  tagline: string;
  release_date: string;
  genres: Genre[];
};

declare type Movie = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

declare type Genre = {
  id: number;
  name: string;
};

declare type MovieList = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

declare type MovieWithImages = {
  images: Images;
} & Movie;
