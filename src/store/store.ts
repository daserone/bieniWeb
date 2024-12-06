import { Action, combineReducers, Store } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import user from "@store/reducers/user.reducer";
import { configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["user"],
  blacklist: ["err"],
};

const rootReducer = combineReducers({
  user,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store: AppStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
      thunk: true,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunkDispatch = ThunkDispatch<RootState, any, Action>;
export type AppStore = Omit<Store<RootState, Action>, "dispatch"> & {
  dispatch: AppThunkDispatch;
};

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
