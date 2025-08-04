

import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function SearchTab() {
  const router = useRouter();

  useEffect(() => {
    router.push('/patient-user/search');
  }, [router]);

  return null;
}