import { DevTool } from "@hookform/devtools";
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  username: z.string().nonempty("Username is required"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Email format is not valid"),
  channel: z.string().nonempty("Channel is required"),
});

export default function ZodYouTubeForm() {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
    },
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const { register, control, handleSubmit, formState } = form;

  const { errors, isDirty, isValid, isSubmitting } = formState;

  const onSubmit = (data) => {
    console.log("Form data: ", data);
  };

  return (
    <div className="text-white">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label className="mb-1.5 font-bold " htmlFor="username">
          Username
        </label>
        <input
          className="block w-[400px] px-2 py-3 border border-white rounded"
          type="text"
          id="username"
          {...register("username")}
        />
        <p className="text-red-500 text-sm my-2">{errors.username?.message}</p>

        <label className="mb-1.5 font-bold block" htmlFor="email">
          Email
        </label>
        <input
          className="block w-[400px] px-2 py-3 border border-white rounded"
          type="text"
          id="email"
          {...register("email")}
        />
        <p className="text-red-500 text-sm my-2">{errors.email?.message}</p>

        <label className="mb-1.5 font-bold block" htmlFor="channel">
          Channel
        </label>
        <input
          className="block w-[400px] px-2 py-3 border border-white rounded"
          type="text"
          id="channel"
          {...register("channel")}
        />
        <p className="text-red-500 text-sm my-2">{errors.channel?.message}</p>

        <button
          className="border border-white rounded mt-4 w-[150px] font-bold hover:bg-white active:text-white active:bg-[#333] hover:text-black transition block mx-auto"
          type="submit"
          disabled={!isDirty || !isValid || isSubmitting}
        >
          Submit
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
}
