import { paths } from "@/types/schema";
import createClient from "openapi-fetch";
import { createQueryHook } from "swr-openapi";

export const apiClient = createClient<paths>({
  baseUrl: "/api",
});

export const useApi = createQueryHook(apiClient, "blogzio-api");
