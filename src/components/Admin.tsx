"use client";
import { prisma } from "@/lib";
import * as React from "react";

interface AdminProps {}

export async function Admin({}: AdminProps) {
  const users = await prisma.user.findMany();

  if (!!users.length) {
    return <div>No users found</div>;
  }

  return (
    <div>
      <h1>Admin</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
