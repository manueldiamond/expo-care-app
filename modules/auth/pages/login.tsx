import Button from "@/components/ui/button"
import tw from "@/lib/tailwind"
import { useUserStore } from "@/stores/user-store"
import { getFormErrorMessage } from '@/utils/form'
import showToast from "@/utils/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import * as Google from "expo-auth-session/providers/google"
import { Link, useRouter } from "expo-router"
import * as WebBrowser from "expo-web-browser"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { ActivityIndicator, View } from "react-native"
import { loginWithEmail, loginWithProvider } from '../auth-service'
import AuthHeader from "../components/auth-header"
import { AuthInputs } from "../components/auth-inputs"
import AuthLayout from "../components/auth-layout"
import AuthProviders from "../components/auth-providers"
import { signInInputs, signInSchema } from "../data"
import ForgotPassword from "./forgot-password"

WebBrowser.maybeCompleteAuthSession();

export const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues:{
      email:'manueldiamondlistowell@gmail.com',
      password:'Basket86'
    }
  });

  const router = useRouter();
  const setUser = useUserStore((s) => s.setUser);

  // Google Auth 
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "363159037072-0gi38gtu02rdjeoe7tads24ga6tnmkkq.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      if (authentication?.accessToken) {
        loginWithProvider("google", authentication.accessToken, setUser, router);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const onLogin = handleSubmit(
    async (data) => {
      setIsLoading(true);
      try {
        const { email, password } = data;
        await loginWithEmail(email, password, setUser, router);
      } catch (error) {
        // Error is already handled in loginWithEmail
        //Additional in component error handling
      } finally {
        setIsLoading(false);
      }
    },
    (error) => {
      setIsLoading(false);
      const errormsg = getFormErrorMessage(error, "An error occurred during login");
      console.log('LOGIN ERROR', errormsg);
      showToast.error(errormsg);
    }
  );

  // Pass a handler to AuthProviders for Google
  const handleProviderPress = (provider: string) => {
    if (provider.toLowerCase() === 'google') {
      promptAsync();
    } else {
      showToast.error('Facebook login coming soon');
    }
  };

  return (
    <AuthLayout>
      <AuthHeader
        heading="Welcome Back"
        subheading="Your trusted partner in holistic, patient-centered palliative care."
      />
      <AuthProviders onPressProvider={handleProviderPress} />
      <AuthInputs inputs={signInInputs} control={control} errors={errors} />
      <View style={tw`mb-[] min-w-full flex flex-col`}>
        <Button
          text={isLoading ? "" : "Login"}
          onPress={onLogin}
          disabled={isLoading}
        >
          {isLoading && (
            <ActivityIndicator size="small" color="white" style={tw`absolute`} />
          )}
        </Button>
        <ForgotPassword />
      </View>
      <Link
        href={'/role-select'}
        style={tw`text-good text-sm mb-[46px]`}
      >
        Don't have an account? Join us
      </Link>
    </AuthLayout>
  )
} 
