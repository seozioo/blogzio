import { useApi } from './use-api';

export function useVisit() {
  const { data, mutate, isLoading } = useApi('/visit');

  return {
    today: data?.today ?? 0,
    total: data?.total ?? 0,
    isLoading,
    mutate,
  };
}
