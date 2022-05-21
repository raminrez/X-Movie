import { Link } from "@remix-run/react";
import type { VFC } from "react";

export interface MovieGridProps {
  list: MovieSample[];
}
const MovieGrid: VFC<MovieGridProps> = ({ list }) => {
  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {list.map((movie) => (
        <Link
          key={movie.id}
          to={`/${movie.id}`}
          className="group rounded-lg outline-none focus:outline-none  focus:ring-2 focus:ring-teal-800/75 focus:ring-offset-4"
        >
          <div className="aspect-w-7 aspect-h-10 w-full overflow-hidden rounded-lg bg-gray-200">
            <img
              src={movie.poster_path}
              alt={movie.title}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
          <h3 className="mt-4 text-lg text-gray-900 sm:text-base">{`${movie.title} (${movie.release_date})`}</h3>
        </Link>
      ))}
    </div>
  );
};

export default MovieGrid;
