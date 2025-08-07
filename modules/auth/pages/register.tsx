import Button from "@/components/ui/button"
import tw from "@/lib/tailwind"
import { useUserStore } from '@/stores/user-store'
import { getFormErrorMessage } from '@/utils/form'
import showToast from "@/utils/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import * as Google from "expo-auth-session/providers/google"
import { Link, useLocalSearchParams, useRouter } from "expo-router"
import * as WebBrowser from "expo-web-browser"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { ActivityIndicator, Text, View } from "react-native"
import { loginWithProvider, registerWithEmail } from '../auth-service'
import AuthHeader from "../components/auth-header"
import { AuthCheckbox, AuthInputs } from "../components/auth-inputs"
import AuthLayout from "../components/auth-layout"
import AuthProviders from "../components/auth-providers"
import { signUpInputs, signUpSchema } from "../data"

WebBrowser.maybeCompleteAuthSession();

export const RegisterScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const { role: rawRole } = useLocalSearchParams();

  //extract the roles if the role is not int right format/type
  const role = Array.isArray(rawRole) ? rawRole[0] : rawRole;
  const { control, handleSubmit, formState: { errors, isValid, }, } = useForm({
    resolver: zodResolver(signUpSchema),
  })

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
        loginWithProvider("google", authentication.accessToken, setUser, router, true, role);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const onRegister = handleSubmit(
    async (data) => {
      setIsLoading(true);
      try {
        const { name: fullname, email, password } = data;
        const success=await registerWithEmail(fullname, email, password, role, setUser, router);
        if(!success)return;
        // Create profile chain based on role
        let nextRoute = '/profile/personal-info?setup=true';
        
        // Navigate to the first profile screen in the chain
        router.replace(nextRoute as any);
      } catch (error) {
        // Error is already handled in registerWithEmail
      } finally {
        setIsLoading(false);
      }
    },
    (error) => {
      setIsLoading(false);
      const errormsg = getFormErrorMessage(error, "An error occurred during registration");
      console.log('REGISTER ERROR', errormsg);
      showToast.error(errormsg);
    }
  )

  // Pass a handler to AuthProviders for Google
  const handleProviderPress = (provider: string) => {
    if (provider.toLowerCase() === 'google') {
      promptAsync();
    } else {
      showToast.error('Facebook login coming soon');
    }
  };

  return (
    <AuthLayout >
      <AuthHeader
        heading={role === 'caregiver' ? "Join us to start offering care" : "Join us to start searching"}
        subheading={"Your trusted partner in holistic, patient-centered palliative care."}
      />
      <AuthProviders onPressProvider={handleProviderPress} />
      <View style={tw`w-full`}>
        <AuthInputs inputs={signUpInputs} control={control} errors={errors} />
        <View style={tw`centered w-full flex-row gap-2 mt-4`}>
          <AuthCheckbox
            control={control}
            name={'tos'}
          />
          <Text style={tw`flex-1 text-xs text-[#677294] font-normal`}>
            I agree with the <Link style={tw`font-medium text-[#677294]`} href={'https://family-care-gh.vercel.app/tos-policy'}>Terms of Service & Privacy Policy</Link>
          </Text>
        </View>
      </View>
      <View style={tw`mb-[] gap-4 min-w-full flex flex-col`}>
        <Button
          text={isLoading ? "" : "Register"}
          onPress={onRegister}
          disabled={isLoading}
        >
          {isLoading && (
            <ActivityIndicator size="small" color="white" style={tw`absolute`} />
          )}
        </Button>
        <Link
          href={'/login'}
          style={tw`text-good mx-auto text-centere text-sm mb-[46px] font-normal`}
        >
          Have an account? Log in
        </Link>
      </View>
    </AuthLayout>
  )
} 
