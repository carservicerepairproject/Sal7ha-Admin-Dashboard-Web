import { headers } from "next/headers";
import { ShopSignInDto } from "../dto/sign-in.auth.dto";
import { AuthResponse } from "../dto/auth-response";

const BASE_URL = process.env.API_BASE_URL ?? "http://localhost:3333";

if (!BASE_URL) throw new Error("API_BASE_URL Is Not Set");

export async function signUp() {}

export async function signIn(dto: ShopSignInDto) {
  const res = await fetch(`${BASE_URL}/auth/shop/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });

  if (!res.ok) throw new Error(await res.text());
  const data = (await res.json()) as AuthResponse;
  localStorage.setItem("shop_taken", data.access_token);
  return data;
}
