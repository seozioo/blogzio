'use client';

import { apiClient } from '@/constants/api-client';
import { useEffect } from 'react';
import { useVisit } from '../hooks/use-visit';

export function VisitTracker() {
  const { mutate } = useVisit();

  useEffect(() => {
    apiClient.POST('/visit/daily').then(() => mutate());
  }, []);

  return null;
}
