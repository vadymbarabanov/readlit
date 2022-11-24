interface AuthFormProps {
  values?: {
    email?: string | null;
    password?: string | null;
  };
  errors?: {
    email?: string;
    password?: string;
    common?: string;
  };
  authType: "sign-in" | "sign-up";
}

export function AuthForm({ authType, values, errors }: AuthFormProps) {
  return (
    <form method="post" class="flex flex-col items-center">
      <h1 class="text-2xl font-semibold text-center">
        {authType === "sign-in" ? "Sign In" : "Sign Up"}
      </h1>

      {errors?.common && <p class="mt-5 text-red-500">{errors.common}</p>}

      <div class="mt-5">
        <label htmlFor="email">Email</label>
        {errors?.email && <p class="text-red-500 text-sm">{errors.email}</p>}
        <input
          class="block border-2"
          required
          id="email"
          name="email"
          type="email"
          value={values?.email || ""}
        />
      </div>

      <div class="mt-5">
        <label htmlFor="password">Password</label>
        {errors?.password && (
          <p class="text-red-500 text-sm">{errors.password}</p>
        )}
        <input
          class="block border-2"
          required
          id="password"
          name="password"
          type="password"
          value={values?.password || ""}
        />
      </div>

      <button
        class="block my-5 py-2 px-4 border-2 font-semibold"
        type="submit"
      >
        {authType === "sign-in" ? "Sign In" : "Sign Up"}
      </button>

      {authType === "sign-in"
        ? (
          <a class="block text-center text-sm text-purple-600" href="/sign-up">
            Don't have an account?
          </a>
        )
        : (
          <a class="block text-center text-sm text-purple-600" href="/sign-in">
            Already have an account?
          </a>
        )}
    </form>
  );
}
