import { createCookieSessionStorage, json } from "@remix-run/node";
import invariant from "tiny-invariant";

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    maxAge: 3600,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

const WATCH_LIST_KEY = "WATCH_LIST_KEY";
const FAVORITE_LIST_KEY = "FAVORITE_LIST_KEY";

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function createWatchListSession({
  request,
  watchList,
  remember = true,
}: {
  request: Request;
  watchList: MovieSample[];
  remember?: boolean;
}) {
  const session = await getSession(request);
  session.set(WATCH_LIST_KEY, watchList);
  return json(
    { list: watchList },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session, {
          maxAge: remember
            ? 60 * 60 * 24 * 1 // 1 days
            : undefined,
        }),
      },
    }
  );
}

async function getWatchList(request: Request): Promise<MovieSample[]> {
  const session = await getSession(request);
  const watchList = session.get(WATCH_LIST_KEY);
  return watchList || [];
}

const addToWatchList = async ({
  request,
  movie,
}: {
  request: Request;
  movie: MovieSample;
}): Promise<Response> => {
  const currentList = await getWatchList(request);
  if (Array.isArray(currentList) && currentList.length !== 0) {
    currentList.push(movie);

    return await createWatchListSession({ request, watchList: currentList });
  } else {
    return await createWatchListSession({ request, watchList: [movie] });
  }
};

const removeFromWatchList = async ({
  request,
  movieId,
}: {
  request: Request;
  movieId: number;
}): Promise<Response> => {
  const currentList = await getWatchList(request);
  if (currentList === undefined) {
    return json(null);
  }

  const filteredList = currentList?.filter((movie) => movie.id !== movieId);

  return await createWatchListSession({ request, watchList: filteredList });
};

export async function createFavoriteSession({
  request,
  favorite,
  remember = true,
}: {
  request: Request;
  favorite: MovieSample[];
  remember?: boolean;
}) {
  const session = await getSession(request);
  session.set(FAVORITE_LIST_KEY, favorite);
  return json(
    { list: favorite },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session, {
          maxAge: remember
            ? 60 * 60 * 24 * 1 // 1 days
            : undefined,
        }),
      },
    }
  );
}

async function getFavorite(request: Request): Promise<MovieSample[]> {
  const session = await getSession(request);
  const favorites = session.get(FAVORITE_LIST_KEY);
  return favorites || [];
}

const addToFavorite = async ({
  request,
  movie,
}: {
  request: Request;
  movie: MovieSample;
}): Promise<Response> => {
  const currentList = await getFavorite(request);
  if (Array.isArray(currentList) && currentList.length !== 0) {
    currentList.push(movie);

    return await createFavoriteSession({ request, favorite: currentList });
  } else {
    return await createFavoriteSession({ request, favorite: [movie] });
  }
};

const removeFromFavorite = async ({
  request,
  movieId,
}: {
  request: Request;
  movieId: number;
}): Promise<Response> => {
  const currentList = await getFavorite(request);
  if (currentList === undefined) {
    return json(null);
  }

  const filteredList = currentList?.filter((movie) => movie.id !== movieId);

  return await createFavoriteSession({ request, favorite: filteredList });
};

export const watchList = {
  get: getWatchList,
  add: addToWatchList,
  remove: removeFromWatchList,
};

export const favorites = {
  get: getFavorite,
  add: addToFavorite,
  remove: removeFromFavorite,
};
