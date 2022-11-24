import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { AuthForm } from "../components/AuthForm.tsx";
import { AuthResult } from "../types/auth.ts";
import AuthService from "../handlers/auth.handler.ts";

const authService = new AuthService();

export const handler: Handlers<AuthResult> = {
  GET: authService.GET,
  POST: authService.POST,
};

export default function SignIn({ data }: PageProps<AuthResult>) {
  const { errors, values } = data;

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <main class="h-screen flex justify-center items-center">
        <AuthForm
          values={{
            email: values?.email,
            password: values?.password,
          }}
          errors={{
            common: errors?.common?.[0]?.message,
            email: errors?.email?.[0]?.message,
            password: errors?.password?.[0]?.message,
          }}
          authType="sign-in"
        />
      </main>
    </>
  );
}
