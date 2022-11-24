type Message = {
  message: string;
};

type FieldErrors<T extends string> = Record<T, Message[]>;
type FieldValues<T extends string> = Record<T, string | null>;

type AuthFields = "email" | "password";

export type AuthErrors = FieldErrors<AuthFields | "common">;
type AuthValues = FieldValues<AuthFields>;

export interface AuthResult {
  errors: AuthErrors | null;
  values: AuthValues | null;
}
