"use server";

import { createSession, signUpFormSchema } from "@/lib";
import { prisma } from "@/lib";
import bcrypt from "bcrypt";

export async function signup(prevState: any, formData: FormData) {
  //1- Validate fields

  const values = Object.fromEntries(formData.entries());

  const validationResult = signUpFormSchema.safeParse(values);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validationResult.data;

  //2- Create a new user

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });

  await createSession(newUser.id);
  //3- Return the user
}
