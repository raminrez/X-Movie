import MovieGrid from "~/components/movieGrid";
import NoData from "~/components/noData";
import { useFavoriteStorage } from "~/hooks/useFavoriteStorage";

export default function Movie() {
  const { items } = useFavoriteStorage();

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 pt-8 sm:px-6 lg:max-w-7xl lg:px-8">
        {items.length > 0 ? (
          <>
            <h2 className=" pb-5 text-2xl text-gray-800">Favorites</h2>
            <MovieGrid list={items as MovieSample[]} />
          </>
        ) : (
          <NoData
            title="Favorites"
            message="You have no favorite movies yet, please pick one"
          />
        )}
      </div>
    </div>
  );
}
