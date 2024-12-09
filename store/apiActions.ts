import { createAction } from "@reduxjs/toolkit";

interface Props {
  url?: string;
  data?: object;
  method?: string;
  onStart?: string;
  onSuccess?: string;
  onFailed?: string;
  onFileStart?: string;
  onFileSuccess?: string;
  onFileFailed?: string;
  onReset?: string;
  onFileReset?: string;
  onChange?: string;
  formData?: boolean;
  isLogin?: boolean;
  paramsAuth?: boolean;
}

// root action creators
export const apiCallBegan = createAction<Props>("api/callBegan");
export const apiCallSuccess = createAction<Props>("api/callSuccess");
export const apiCallFailed = createAction<Props>("api/callFailed");
