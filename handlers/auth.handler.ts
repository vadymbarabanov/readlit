import { Handler } from "$fresh/server.ts";
import { AuthErrors, AuthResult } from "../types/auth.ts";
import { readerToSearchParams } from "../utils/reader-to-search-params.ts";

type AuthServiceHandler = Handler<AuthResult, Record<string, unknown>>;

export default class AuthHandler {
  public GET: AuthServiceHandler = (_, ctx) => {
    return ctx.render({ values: null, errors: null });
  };

  public POST: AuthServiceHandler = async (
    req,
    ctx,
  ) => {
    const reader = req.body?.getReader();

    if (!reader) {
      console.error("Reader doesn't exist");
      return ctx.render({
        errors: null,
        values: null,
      });
    }

    const params = await readerToSearchParams(reader);

    const email = params.get("email");
    const password = params.get("password");

    const errors = this.validateFields(email, password);

    return ctx.render({
      errors,
      values: {
        email,
        password,
      },
    });
  };

  private validateFields = (email: string | null, password: string | null) => {
    const errors: AuthErrors = {
      email: [],
      password: [],
      common: [],
    };

    if (!email) {
      errors.email.push({
        message: "should not be empty",
      });
    }

    if (!password) {
      errors.password.push({
        message: "should not be empty",
      });
    }

    if (password && password.length < 5) {
      errors.password.push({
        message: "should be at least 5 characters",
      });
    }

    return errors;
  };
}
