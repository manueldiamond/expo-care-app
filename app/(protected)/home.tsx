import { useUserStore } from "@/stores/user-store";
import { Redirect } from "expo-router";

export default function EntryPage() {
  const user = useUserStore((s) => s.user);

  if (!user) {
    // If user is not loaded, fallback to a loading state or redirect to login
    // For now, just return null (could show a spinner)
    return null;
  }

  // Determine user type and redirect accordingly
  if (user.role === "caregiver") {
    return <Redirect href="/caregiver-user/home" />;
  } else if (user.role === "patient") {
    return <Redirect href="/patient-user/home" />;
  } else {
    // Unknown role, fallback to a default page or error
    return <Redirect href={'/login'}/>
  }
}
