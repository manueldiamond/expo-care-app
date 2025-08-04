import Loading from "@/components/loading";
import { useAuthCheck } from "@/hooks/use-auth-check";
import { Intro } from "@/modules/intro/pages";

export default function Index() {
  const { loading } = useAuthCheck({
    redirectTo: '/home',
    onLoadingChange: (isLoading) => {
      // Optional: Handle loading state changes
    }
  });

  if (loading) {
    return <Loading message="" />;
  }

  return <Intro />;
}
