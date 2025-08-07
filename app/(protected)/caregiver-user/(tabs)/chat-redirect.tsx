import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function ChatRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/chat' as any);
  }, [router]);

  return null;
} 