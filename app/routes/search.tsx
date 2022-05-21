import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import MovieGrid from "~/components/movieGrid";
import { findMoviesByKeywordSimpleResult } from "~/movie.server";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("q");
  if (!searchTerm || searchTerm.trim() === "") {
    return redirect("/", { status: 308 });
  }

  const result = await findMoviesByKeywordSimpleResult(searchTerm);

  return json(result);
};

export default function Search() {
  const data = useLoaderData<MovieSample[]>();

  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className=" pb-4 text-2xl text-gray-800">Search Result</h2>
      <MovieGrid list={data} />
    </div>
  );
}

export function CatchBoundary() {
  return (
    <>
      <div className="  px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <main className="sm:flex">
            <p className="text-4xl font-extrabold text-teal-600 sm:text-5xl">
              :(
            </p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                  Movie not found
                </h1>
                <p className="mt-1 text-base text-gray-500">
                  Sorry, we couldn't find movie your looking for.
                </p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <Link
                  to="/"
                  className="inline-flex items-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
                >
                  Go back home
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
