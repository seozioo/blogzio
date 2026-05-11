import { apiClient } from '@/constants/api-client';
import { createQueryHook } from 'swr-openapi';

export const useApi = createQueryHook(apiClient, 'blogzio-api');
