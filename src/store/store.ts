import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  storage: storage,
  key: "root",
  whitelist: ["auth"]
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"]
      }
    })
});
export const persistor = persistStore(store);

export const useAppDispatch: () => typeof store.dispatch = () =>
  useDispatch<typeof store.dispatch>();

export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
