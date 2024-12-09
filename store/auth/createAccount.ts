import { apiCallBegan } from "../apiActions";
import { apiRoutes, methods } from "../apiRoutes";
import createGenericSlice from "../types";

interface DataType {
  success: boolean;
}

const slice = createGenericSlice({
  name: "create-account",
  initialState: {
    data: undefined as DataType | undefined,
    loading: false,
    error: undefined,
  },
  reducers: {
    requested: (state) => {
      state.loading = true;
    },
    success: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = undefined;
    },
    failed: (state, action) => {
      state.data = undefined;
      state.loading = false;
      state.error = action.payload;
    },
    reset: (state) => {
      state.data = undefined;
      state.loading = false;
      state.error = undefined;
    },
  },
});

const { requested, success, failed, reset } = slice.actions;
export default slice.reducer;

export const createAccount = (data: any) => {
  return apiCallBegan({
    url: apiRoutes.authRegister,
    data,
    method: methods.POST,
    onStart: requested.type,
    onSuccess: success.type,
    onFailed: failed.type,
  });
};

export const clearCreateAccountResponse = () =>
  apiCallBegan({ onReset: reset.type });
