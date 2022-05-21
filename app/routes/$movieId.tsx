import { StarIcon } from "@heroicons/react/solid";
import { CheckCircleIcon } from "@heroicons/react/outline";

import { getDetailedMovieById } from "~/movie.server";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { Link, useLoaderData } from "@remix-run/react";

import { useFavoriteStorage } from "~/hooks/useFavoriteStorage";
import { useWatchListStorage } from "~/hooks/useWatchListStorage";

const breadcrumbs = [{ id: 1, name: "Home", href: "/" }];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export const meta: MetaFunction = ({ data, params }) => {
  if (!data) {
    return {
      title: "XMovie",
      description: `There is no movie with the ID of ${params.movieId} 😢 - XMovie`,
    };
  }

  return {
    title: `${data.title} (${data.release_date}) - XMovies`,
    description: data.tagline,
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.movieId, "movieId is explicits");

  const movieDetail = await getDetailedMovieById(+params.movieId);
  return json(movieDetail);
};

export default function MovieDetail() {
  const movieData = useLoaderData<DetailedMovie>();

  const favoriteStorage = useFavoriteStorage();
  const watchListStorage = useWatchListStorage();

  const isFavorite = favoriteStorage.checkFavorite(movieData.id);
  const isWatchList = watchListStorage.checkWatchList(movieData.id);

  const watchListHandler = () => {
    if (isWatchList) {
      watchListStorage.remove(movieData.id);
    } else {
      watchListStorage.add({
        id: movieData.id,
        title: movieData.title,
        release_date: movieData.release_date,
        poster_path: movieData.posters[0].file_path,
      });
    }
  };

  const favoriteHandler = () => {
    if (isFavorite) {
      favoriteStorage.remove(movieData.id);
    } else {
      favoriteStorage.add({
        id: movieData.id,
        title: movieData.title,
        release_date: movieData.release_date,
        poster_path: movieData.posters[0].file_path,
      });
    }
  };

  return (
    <div className="bg-white">
      <div className="pt-6 pb-16 sm:pb-24">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <ul className="flex items-center space-x-4">
            {breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <Link
                    to={breadcrumb.href}
                    className="mr-4 rounded-sm text-sm font-medium text-gray-900 outline-none ring-offset-2 focus:ring-2 focus:ring-teal-700"
                  >
                    {breadcrumb.name}
                  </Link>
                  <svg
                    viewBox="0 0 6 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="h-5 w-auto text-gray-300"
                  >
                    <path
                      d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <Link
                to="#"
                aria-current="page"
                className="rounded-sm font-medium text-gray-500  outline-none ring-offset-2 hover:text-gray-600 focus:ring-2 focus:ring-teal-700"
              >
                {movieData.title}
              </Link>
            </li>
          </ul>
        </nav>
        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium text-gray-900">
                  {movieData.title} ({movieData.release_date})
                </h1>

                <a
                  className="self-start rounded-sm ml-1 bg-yellow-400 px-2 py-1 text-sm font-semibold text-black"
                  target="_blank"
                  rel="noreferrer"
                  href={`https://www.imdb.com/title/${movieData.imdb_id}`}
                >
                  IMDb
                </a>
              </div>
              <p className="mt-1 text-sm text-gray-600">{movieData.tagline}</p>

              {/* Votes */}
              <div className="mt-4">
                <h2 className="sr-only">Vote avarage</h2>
                <div className="flex items-center">
                  <p className="text-sm text-gray-700">
                    {movieData.vote_average}
                    <span className="sr-only"> out of 10 stars</span>
                  </p>
                  <div className="ml-1 flex items-center">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          Math.floor(movieData.vote_average) > rating
                            ? "text-yellow-400"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 space-x-4 sm:space-x-6 text-right">
                <button
                  onClick={favoriteHandler}
                  className="inline-flex items-center rounded-md border transition border-red-600 bg-transparent py-1 px-2 text-red-600  hover:bg-red-50  focus:outline-none focus:ring-2 ring-offset-0 focus:bg-red-100"
                >
                  Favorite
                  {isFavorite && (
                    <CheckCircleIcon
                      className="ml-1 -mr-0.5 h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                </button>

                <button
                  onClick={watchListHandler}
                  className="inline-flex items-center  rounded-md border transition border-teal-600 bg-transparent py-1 px-3 text-teal-600  hover:bg-teal-50  focus:outline-none focus:ring-2 ring-offset-0 focus:bg-teal-100"
                >
                  Watch list
                  {isWatchList && (
                    <CheckCircleIcon
                      className="ml-1 -mr-0.5 h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-6 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
              {/* Image gallery */}
              <h2 className="sr-only">Images</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                {movieData.posters.map((poster, index) => (
                  <img
                    key={poster.id}
                    src={poster.file_path}
                    alt={"Poster"}
                    className={classNames(
                      index === 0
                        ? "lg:col-span-2 lg:row-span-2"
                        : "hidden lg:block",
                      "rounded-lg",
                      "  w-full object-cover"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Overview */}
            <div className="mt-8 lg:col-span-5">
              <div className="mt-10 lg:mt-6">
                <h2 className="text-sm font-medium text-gray-900">Overview</h2>

                <div className="prose prose-sm mt-4 text-gray-500">
                  <p>{movieData.overview}</p>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-sm font-medium text-gray-900">Genres</h2>

                <div className="space-x-2 pt-2">
                  {movieData.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="inline-flex items-center rounded-md bg-gray-200 px-2.5 py-0.5 text-sm  text-gray-700"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
