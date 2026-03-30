import { paths } from "@/types/schema";
import createClient from "openapi-fetch";
import { createQueryHook } from "swr-openapi";

export const apiClient = createClient<paths>({
  baseUrl: "/api",
  fetch: async (request) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        request.headers.set("Authorization", `Bearer ${token}`);
      }
    }

    return fetch(request);
  }
});

export const useApi = createQueryHook(apiClient, "blogzio-api");
