// import axios from 'axios';
// import * as actions from '../apiActions';
// import { helpers } from '@utils';
// import { secureKeys } from '@config/constants';

// const { getSecureData } = helpers;

// interface ApiMiddlewareArgs {
//   dispatch: React.Dispatch<any>;
//   getState: () => StoreState;
// }

// // Define common types for action payloads and request options
// interface ApiCallPayload {
//   url: string;
//   method: string;
//   data?: any;
//   onStart?: string;
//   onSuccess?: string;
//   onFailed?: string;
//   formData?: boolean;
//   isLogin?: boolean;
//   paramsAuth?: boolean;
// }

// interface AxiosRequestConfig {
//   baseURL?: string;
//   url: string;
//   method: string;
//   data?: any;
//   headers?: Record<string, string>;
// }

// // Use a generic type parameter for StoreState type safety
// type StoreState = any;

// // Add type annotations for better readability and maintainability
// const api =
//   ({ dispatch }: ApiMiddlewareArgs) =>
//   (next: any) =>
//   async (action: any) => {
//     if (action.type !== actions.apiCallBegan.type) return next(action);

//     const {
//       url,
//       method,
//       data,
//       paramsAuth,
//       onStart,
//       onSuccess,
//       onFailed,
//       formData = false,
//       isLogin = false,
//     }: ApiCallPayload = action.payload;

//     if (onStart) dispatch({ type: onStart });
//     next(action);

//     try {
//       if (!url) return null;

//       const me = await getSecureData(secureKeys.accessToken);
//       const user = me ? JSON.parse(JSON.parse(me?.password)) : undefined;

//       const headers: Record<string, string> = {
//         'Content-Type': formData ? 'multipart/form-data' : 'application/json',
//         Authorization: `Bearer ${user?.accessToken}`,
//       };

//       const paramsAuthHeader: Record<string, string> = {
//         'Content-Type': formData ? 'multipart/form-data' : 'application/json',
//       };

//       const requestConfig: AxiosRequestConfig = {
//         baseURL: process.env.URL,
//         url: paramsAuth
//           ? `${url}?authorization=Bearer ${user?.accessToken}`
//           : `${url}`,
//         method,
//         data,
//         headers: isLogin ? {} : paramsAuth ? paramsAuthHeader : headers,
//       };

//       // console.log(requestConfig);

//       const response = await axios.request(requestConfig);

//       dispatch(actions.apiCallSuccess(response.data));
//       if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
//     } catch (error: any) {
//       const errorMessage =
//         error?.response &&
//         (error?.response?.data || error?.response?.data?.message)
//           ? error?.response?.data
//           : error?.message || 'Network error';

//       dispatch(actions.apiCallFailed(errorMessage));

//       if (onFailed) {
//         dispatch({
//           type: onFailed,
//           payload: errorMessage,
//         });
//       }
//     }
//   };

// export default api;
