"use server";

import { verifySession } from "@/lib";
import { Role } from "@prisma/client";

export async function banUser() {
  // 1- Verify user

  const session = await verifySession();
  const role = session.role;

  if (role !== Role.ADMIN) {
    return {
      error: "Unauthorized",
    };
  }
}
