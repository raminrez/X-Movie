import { SearchIcon } from "@heroicons/react/outline";
import { Form, useSearchParams } from "@remix-run/react";
import { useEffect, useRef } from "react";

export default function SearchField() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q") || "";

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.value = searchTerm;
    }
  }, [searchTerm]);

  const searchRef = useRef<HTMLInputElement>(null);

  return (
    <Form method="get" action="/search" className="w-full">
      <label htmlFor="search" className="sr-only">
        Search Movies
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            role="search"
            ref={searchRef}
            defaultValue={searchTerm}
            type="search"
            autoComplete="off"
            name="q"
            id="search"
            className="block w-full rounded-none rounded-l-md border-gray-300 pl-10 text-base font-normal tracking-wide text-gray-900 placeholder:text-gray-500/80 focus:border-teal-700 focus:ring-teal-700"
            placeholder="Search your keywords"
          />
        </div>
        <button
          type="submit"
          className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-base font-normal text-gray-700 hover:bg-gray-100 focus:border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-700"
        >
          Search
        </button>
      </div>
    </Form>
  );
}
