import { verifySession } from "@/lib";
import { prisma } from "@/lib";
import { User } from "@prisma/client";
import { cache } from "react";

export const getUser = cache(async () => {
  // 1- Verify user's session

  const session = await verifySession();

  // 2- Fetch user from database
  const user = await prisma.user.findUnique({
    where: {
      id: session.userId as string,
    },
  });

  // 3- Return user
  //   const user = await Promise.resolve(usersPromise);

  return userDTO(user);
});

function userDTO(user: User | null) {
  if (user) {
    return {
      email: user.email,
      name: user.name,
      //     session: user.session,
      //   auditTrail: canViewAudit(user.auditTrail, user.role)
    };
  }
  return null;
}

function canViewAudit(auditTrail: string, role: UserRole) {
  return role === UserRole.ADMIN ? auditTrail : null;
}

enum UserRole {
  ADMIN = "admin",
  USER = "user",
}
