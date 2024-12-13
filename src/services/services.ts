import axios, { AxiosInstance } from "axios";

import { store } from "@store/store";
import { IService } from "./constants";
import { ConfigService } from "@providers/config/ConfigService";
import { PetsRequestModifier } from "./modifyPetsRequest.interceptor";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: ConfigService.instance.apiURL,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (request) => {
    if (!axiosInstance.defaults.headers.common.Authorization) {
      // User logged, first EP call. Sets the default header from getTokenFromRedux
      const token = getTokenFromRedux();

      if (token) {
        // request!.headers!.Authorization = `Bearer ${token}`;
      }
    }
    // given request url example : /controller/tratamientos.php
    // if isPet is true, then the request url will be : /controller/mascotas/tratamientos.php
    // Modify the request URL and data if necessary
    try {
      //Log
      let timestamp = new Date();
      console.log(
        `[metodo][${timestamp}][${ConfigService.instance.apiURL}][${request.url}]`
      );
      if (request?.params) {
        console.log(`[GET][${JSON.stringify(request?.params)}]`);
      }
      if (request?.data) {
        console.log(`[POST][${JSON.stringify(request?.data)}]`);
      }

      const { isPet, idPet } = getIsPetFromRedux();

      if (!isPet) {
        return request;
      }

      const petsRequestModifier = new PetsRequestModifier();

      const { modifiedData, modifiedParams, modifiedUrl } =
        petsRequestModifier.modifyRequestPets(
          request.data,
          request.params,
          request.url!,
          isPet,
          idPet
        );

      if (isPet && modifiedData) {
        console.log(
          `[POST-MODIFIED][${modifiedUrl}][${JSON.stringify(modifiedData)}]`
        );
      }

      if (isPet && modifiedParams) {
        console.log(
          `[GET-MODIFIED][${modifiedUrl}][${JSON.stringify(modifiedParams)}]`
        );
      }

      request.params = modifiedParams;
      request.url = modifiedUrl;
      request.data = modifiedData;
      return request;
    } catch (error) {
      console.error("error", error);
      throw error;
    }
  },
  (error) => {
    return Promise.reject(error.response.data.error);
  }
);

const getTokenFromRedux = (): string => {
  const state = store.getState();
  const token = state?.user?.access_token;
  if (token) {
    // axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  return token;
};

const getIsPetFromRedux = (): { isPet: boolean; idPet: string } => {
  const state = store.getState();
  const isPet = state?.user?.isPet;
  return { isPet, idPet: state?.user?.id_pet ?? "" };
};

const service: IService = {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
  patch: axiosInstance.patch,
};

export default service;
