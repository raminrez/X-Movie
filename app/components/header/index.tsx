import { Link } from "@remix-run/react";
import SearchField from "../searchField";

export default function Header() {
  return (
    <header className="bg-teal-600">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-teal-700 py-6 lg:border-none">
          <div className="flex items-center">
            <Link
              to="/"
              className="rounded-sm border border-transparent outline-none ring-offset-2 ring-offset-transparent  focus:outline-none focus:ring-1 focus:ring-teal-700"
            >
              <span className="sr-only">XMovies</span>

              <h1
                aria-hidden="true"
                className="text-2xl font-extrabold tracking-wider text-white"
              >
                <strong className="text-teal-900">X</strong>Movies
              </h1>
            </Link>
          </div>
          <div className="hidden  px-6 pl-10 lg:block lg:flex-1 ">
            <SearchField />
          </div>
          <div className="ml-2 space-x-2 text-sm sm:ml-10 sm:space-x-4 sm:text-base ">
            <Link
              to="/favorites"
              className="inline-block rounded-md border border-transparent bg-white py-2 px-4   text-red-400 ring-offset-1 hover:bg-red-50 focus:outline-none  focus:ring-2 focus:ring-red-500 "
            >
              Favorites
            </Link>
            <Link
              to="/watch-list"
              className="inline-block rounded-md border border-transparent bg-white py-2 px-4  text-teal-600  ring-offset-1 hover:bg-teal-50   focus:outline-none focus:ring-2 focus:ring-teal-700 "
            >
              Watch List
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap justify-center  py-4 lg:hidden">
          <SearchField />
        </div>
      </nav>
    </header>
  );
}
