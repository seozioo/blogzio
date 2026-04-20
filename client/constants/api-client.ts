import { paths } from '@/types/schema';
import createClient from 'openapi-fetch';

const baseUrl =
  typeof window === 'undefined'
    ? `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'}/api`
    : '/api';

export const apiClient = createClient<paths>({
  baseUrl,
  fetch: async (request) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        request.headers.set('Authorization', `Bearer ${token}`);
      }
    }

    return fetch(request);
  },
});
