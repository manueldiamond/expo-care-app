import { Stack } from 'expo-router';

export default function ProtectedLayout() {

  console.log("PROTECTED LAYOUT TRIGGERED")
  /*
  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        showToast.error('Not logged in', 'You must be logged in to access this page');
        console.log("NO TOKEN GO BACK TO LOGIN")
        router.replace('/login');
      } else {
        console.log("TOKEN FOUND!")
      }
    };
    checkAuth();
  }, []);
*/
  return (
    <Stack 
      screenOptions={{ 
        headerShown: false,
       }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="add-records" />
      <Stack.Screen name="medical-record" />
      <Stack.Screen name="book-appointment" />
      <Stack.Screen name="patient" />
    </Stack>
  );
} 