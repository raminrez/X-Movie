import invariant from "tiny-invariant";

invariant(process.env.API_KEY, "API_KEY must be set");
invariant(process.env.BASE_URL, "BASE_URL must be set");
invariant(process.env.IMAGES_URL, "IMAGES_URL must be set");

const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;
const IMAGES_URL = process.env.IMAGES_URL;

const checkMovieId = (movieId: any) => {
  if (isNaN(movieId)) {
    throw new Response(null, {
      status: 400,
      statusText: "Movie id isn't valid",
    });
  }
};

export const attachImageLinks = (posters: Image[]) => {
  return posters?.map((poster, index) => ({
    ...poster,
    file_path: `${IMAGES_URL}${poster.file_path}`,
    id: poster.file_path?.slice(1, 10) || index,
  }));
};

export async function getMovieById(movieId: Movie["id"]) {
  checkMovieId(movieId);

  const searchParams = new URLSearchParams({ api_key: API_KEY });

  const res = await fetch(`${BASE_URL}/movie/${movieId}?${searchParams}`);

  if (!res.ok) {
    throw new Response("Movie not found", {
      status: 404,
      statusText: "Movie not found",
    });
  }

  return res.json() as Promise<Movie>;
}

export async function getMovieByIdWithImages(movieId: Movie["id"]) {
  checkMovieId(movieId);

  const searchParams = new URLSearchParams({ api_key: API_KEY });
  searchParams.append("append_to_response", "images");

  const res = await fetch(`${BASE_URL}/movie/${movieId}?${searchParams}`);

  if (!res.ok) {
    throw new Response("Movie not found", {
      status: 404,
      statusText: "Movie not found",
    });
  }

  return res.json() as Promise<MovieWithImages>;
}

export async function getDetailedMovieById(movieId: Movie["id"]) {
  checkMovieId(movieId);

  const movieData = await getMovieByIdWithImages(movieId);

  const { posters } = movieData.images;

  const {
    title,
    overview,
    vote_average,
    vote_count,
    imdb_id,
    id,
    tagline,
    release_date,
    genres,
  } = movieData;

  return {
    id,
    title,
    overview,
    posters: attachImageLinks(posters).slice(0, 3),
    genres,
    vote_average,
    vote_count,
    imdb_id,
    tagline,
    release_date: release_date.substring(0, 4),
  };
}

export async function getTrendingMovies() {
  const searchParams = new URLSearchParams({ api_key: API_KEY });
  const res = await fetch(`${BASE_URL}/trending/movie/week?${searchParams}`);

  return res.json() as Promise<MovieList>;
}

export async function getTrending() {
  const { results } = await getTrendingMovies();

  const moviesWithPosterImages = removeResultsWithOutPosterPath(results);
  const simplifiedList: MovieSample[] =
    moviesWithPosterImages.map(simplifyMovieItems);

  return simplifiedList;
}

export const simplifyMovieItems = (movie: Movie) => {
  const { id, title, poster_path, release_date } = movie;

  return {
    id,
    title,
    poster_path: completeImagesPath(poster_path),
    release_date: release_date.slice(0, 4),
  };
};

export const removeResultsWithOutPosterPath = (results: Movie[]) =>
  results.filter((result) => result.poster_path !== null);

export const completeImagesPath = (path: string) => IMAGES_URL + path;

export async function findMoviesByKeyword(keyword: Movie["title"]) {
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    query: keyword,
  });
  const res = await fetch(`${BASE_URL}/search/movie?${searchParams}`);

  return res.json() as Promise<MovieList>;
}

export async function findMoviesByKeywordSimpleResult(keyword: Movie["title"]) {
  const { results } = await findMoviesByKeyword(keyword);
  if (results.length === 0) {
    throw new Response("Movie not found", {
      status: 404,
      statusText: "Movie not found",
    });
  }

  const moviesWithPosterImages = removeResultsWithOutPosterPath(results);

  const simplifiedList: MovieSample[] =
    moviesWithPosterImages.map(simplifyMovieItems);

  return simplifiedList;
}
