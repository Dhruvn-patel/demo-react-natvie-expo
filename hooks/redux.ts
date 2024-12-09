import configureStore from "../store/configureStore";

import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";

const store = configureStore();

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;

export const useDispatch = () => useAppDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
