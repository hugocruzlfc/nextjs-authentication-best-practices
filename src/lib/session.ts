import "server-only";
import { JWTPayload, SignJWT, jwtVerify } from "jose";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";

const key = new TextEncoder().encode(process.env.SESSION_SECRET);

const COOKIE = {
  name: "session",
  options: {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  },
  duration: 24 * 60 * 60 * 1000,
};

export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1day")
    .sign(key);
}

export async function decrypt(session: string) {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (error) {
    return null;
  }
}

export async function createSession(user: User) {
  const expires = new Date(Date.now() + COOKIE.duration);
  const session = await encrypt({ userId: user.id, role: user.role, expires });

  cookies().set(COOKIE.name, session, {
    ...COOKIE.options,
    sameSite: "lax",
    expires,
  });

  redirect("/dashboard");
}

export async function verifySession() {
  const cookie = cookies().get(COOKIE.name)?.value || "";
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/login");
  }

  return { userId: session.userId, role: session.role };
}

export async function deleteSession() {
  cookies().delete(COOKIE.name);
  redirect("/login");
}
