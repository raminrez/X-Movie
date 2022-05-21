import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import MovieGrid from "~/components/movieGrid";
import { getTrending } from "~/movie.server";

export const loader: LoaderFunction = async () => {
  const res = await getTrending();

  return json(res);
};

export default function Index() {
  const data = useLoaderData<MovieSample[]>();

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className=" pb-5 text-2xl text-gray-800">Trending this week</h2>
        <MovieGrid list={data} />
      </div>
    </div>
  );
}
