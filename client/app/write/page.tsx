import { Suspense } from 'react';
import { WriteContent } from './_components/WriteContent';

export default function Write() {
  return (
    <Suspense fallback={null}>
      <WriteContent />
    </Suspense>
  );
}
