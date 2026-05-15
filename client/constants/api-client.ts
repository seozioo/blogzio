import { paths } from '@/types/schema';
import createClient from 'openapi-fetch';

const baseUrl =
  typeof window === 'undefined'
    ? `${process.env.NEXT_PUBLIC_API_URL || 'http://blogzio-server:4000'}/api`
    : '/api';

export type TokenRefreshHandelr = (token: string) => void;

const tokenRefreshHandelrs: TokenRefreshHandelr[] = [];

export function registerTokenrefresh(handler: TokenRefreshHandelr) {
  tokenRefreshHandelrs.push(handler);
}

export function unregisterTokenrefresh(handler: TokenRefreshHandelr) {
  const index = tokenRefreshHandelrs.indexOf(handler);
  if (index !== -1) {
    tokenRefreshHandelrs.splice(index, 1);
  }
}

export const apiClient = createClient<paths>({
  baseUrl,
  fetch: async (request) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        request.headers.set('Authorization', `Bearer ${token}`);
      }
    }

    const response = await fetch(request.clone());

    if (response.status === 401) {
      const res = await fetch('/api/auth/refresh', { method: 'POST' });
      if (res.ok) {
        const data = (await res.json()) as { accessToken: string };
        localStorage.setItem('accessToken', data.accessToken);
        request.headers.set('Authorization', `Bearer ${data.accessToken}`);

        tokenRefreshHandelrs.forEach((h) => {
          h(data.accessToken);
        });

        return await fetch(request);
      }
    }

    return response;
  },
});
