import { DevTool } from "@hookform/devtools";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Email format is not valid")
    .required("Email is required"),
  channel: yup.string().required("Channel is required"),
});

// const Input = ({ name, register, control }) => {
//   const value = useWatch({
//     control,
//     name
//   })
//   const props = register(name);
//   return (
//     <input
//       className="block w-[400px] px-2 py-3 border border-white rounded"
//       value={value}
//       onChange={(e) => {
//         props.onChange({
//           target: {
//             name,
//             value: e.target.value,
//           },
//         });
//       }}
//       type="number"
//     />
//   );
// };

const Input = ({ name, register, control }) => {
  const value = useWatch({
    control,
    name
  })
  return (
    <>
      <input
        className="block w-[400px] px-2 py-3 border border-white rounded"
        value={value}
        {...register(name)}
        type="number"
      />
    <p>Current Value: {value}</p> {/* Displaying the watched value */}
    </>
  );
};

export default function YupYouTubeForm() {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      age: 0,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
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

        <Input {...{ name: "age", register, control }} />

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
