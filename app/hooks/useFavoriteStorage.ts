// import { useLocalStorageState } from "./useLocalStorage";
import useLocalStorageState from "use-local-storage-state";

type StateType = {
  [key: number]: MovieSample;
};
const useFavoriteStorage = () => {
  const [state, setState] = useLocalStorageState<StateType>("FAVORITE-LIST", {
    ssr: true,
    defaultValue: {},
  });

  const add = (movie: MovieSample) => {
    const { id } = movie;
    setState({ ...state, ...{ [id]: movie } });
  };

  const remove = (movieId: number) => {
    const { [movieId]: MovieSample, ...rest } = state;

    setState(rest);
  };

  const checkFavorite = (movieId: number) => state[movieId] !== undefined;

  const favList = Object.values(state);

  return { items: favList, add, remove, checkFavorite };
};

export { useFavoriteStorage };
