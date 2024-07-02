"use server";

import { signUpFormSchema } from "@/lib";

export async function signup(state, formData) {
  //1- Validate fields

  const validationResult = signUpFormSchema.parse({
    name: formData.name,
    email: formData.email,
    password: formData.password,
  });

  //2- Create a new user

  //3- Return the user
}
