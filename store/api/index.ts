import axiosInstance from "./axiosInstance";

// Example function to handle API calls
const get = async <T>(
  url: string,
  params?: Record<string, any>
): Promise<T> => {
  const response = await axiosInstance.get(url, { params });
  return response.data;
};

const post = async <T>(url: string, data?: Record<string, any>): Promise<T> => {
  const response = await axiosInstance.post(url, data);
  return response.data;
};

const put = async <T>(url: string, data?: Record<string, any>): Promise<T> => {
  const response = await axiosInstance.put(url, data);
  return response.data;
};

const del = async <T>(url: string): Promise<T> => {
  const response = await axiosInstance.delete(url);
  return response.data;
};

export { get, post, put, del, axiosInstance };
