// import { useLocalStorageState } from "./useLocalStorage";
import useLocalStorageState from "use-local-storage-state";

type StateType = {
  [key: number]: MovieSample;
};
const useWatchListStorage = () => {
  const [state, setState] = useLocalStorageState<StateType>("WATCH-LIST", {
    ssr: true,
    defaultValue: {},
  });

  const add = (movie: MovieSample) => {
    const { id } = movie;
    setState({ ...state, ...{ [id]: movie } });
  };

  const remove = (movieId: number) => {
    const { [movieId]: any, ...rest } = state;

    setState(rest);
  };

  const checkWatchList = (movieId: number) => state[movieId] !== undefined;

  const watchList = Object.values(state);

  return { items: watchList, add, remove, checkWatchList };
};

export { useWatchListStorage };
