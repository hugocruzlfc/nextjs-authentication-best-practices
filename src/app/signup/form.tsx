"use client";

import { signup } from "./actions";
import { useFormState } from "react-dom";
//import { useActionState } from "react";
//👆🏻 You can use the useFormState hook from the react-dom package as a temporary solution instead of the useActionState hook from the react package until a future Next.js update is available

const initialState = {
  errors: {
    name: "",
    email: "",
    password: "",
  },
};
export function SignUpForm() {
  const [state, action, pending] = useFormState(signup, null);
  return (
    <form
      action={action}
      className=" flex flex-col justify-center gap-4 w-full"
    >
      <div className="flex flex-col gap-1">
        <input
          placeholder="Name"
          name="name"
          className="w-full py-2 rounded-sm"
        />
        {state?.errors?.name && (
          <p className="text-red-600">{state.errors.name}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <input
          placeholder="Email"
          name="email"
          className=" py-2 rounded-sm"
        />
        {state?.errors?.email && (
          <p className="text-red-600">{state.errors.email}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <input
          placeholder="Password"
          name="password"
          className=" py-2 rounded-sm"
        />
        {state?.errors?.password && (
          <p className="text-red-600">{state.errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        className="my-5 border border-emerald-50  py-5 rounded-md"
      >
        {pending ? "Submiting..." : "Sign Up"}
      </button>
    </form>
  );
}
