import MovieGrid from "~/components/movieGrid";
import NoData from "~/components/noData";

import { useWatchListStorage } from "~/hooks/useWatchListStorage";

export default function WatchList() {
  const { items } = useWatchListStorage();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
      {items.length > 0 ? (
        <>
          <h2 className=" pb-5 text-2xl text-gray-800">Watch list</h2>
          <MovieGrid list={items as MovieSample[]} />
        </>
      ) : (
        <NoData
          title="Watch list"
          message="You have no movies on the watch list, please pick one"
        />
      )}
    </div>
  );
}
