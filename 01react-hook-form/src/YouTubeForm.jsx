import { DevTool } from "@hookform/devtools";
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";

export default function YouTubeForm() {
  const form = useForm({
    defaultValues: {
      username: "Hanuman",
      email: "wedrewfwe@gmail.com",
      channel: "kjhljh",
      social: {
        twitter: "kjhj",
        facebook: "jhgjh",
      },
      phones: ["65768768", "87687"],
      numbers: [{ number: "87687" }],
      age: 0,
      dob: "",
      // image: []
    },
    mode: "onBlur",
    // shouldUnregister: true,

    // defaultValues: async () => {
    //   const res = await fetch('https://jsonplaceholder.typicode.com/users/1')
    //   const data = await res.json()
    //   return {
    //     username: 'Hanuman',
    //     email: data.email,
    //     channel: ''
    //   }
    // }
  });

  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
    trigger,
    setError,
    resetField,
    unregister,
  } = form;

  const {
    errors,
    touchedFields,
    dirtyFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
  } = formState;
  useEffect(() => {
    console.log("Updated isSubmitSuccessful:", isSubmitSuccessful);
    console.log("Updated submitCount:", submitCount);
  }, [isSubmitSuccessful, submitCount]);

  const { fields, append, remove } = useFieldArray({
    name: "numbers",
    control,
  });
  // console.log(fields);

  useEffect(() => {
    const subscription = watch((value) => {
      // console.log(value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = (data, event) => {
    console.log("Form data: ", data);
    console.log("Event: ", event);
    const files = event.target.image.files;  // Access the FileList directly
    console.log(files);  // Shows the selected files  
  };

  const onError = (error) => {
    console.log(error);
  };

  return (
    <div className="text-white">
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <label className="mb-1.5 font-bold " htmlFor="username">
          Username
        </label>
        <input
          className="block w-[400px] px-2 py-3 border border-white rounded"
          type="text"
          id="username"
          {...register("username", {
            required: {
              value: true,
              message: "Username is required",
            },
          })}
        />
        <p className="text-red-500 text-sm my-2">{errors.username?.message}</p>

        <label className="mb-1.5 font-bold block" htmlFor="email">
          Email
        </label>
        <input
          className="block w-[400px] px-2 py-3 border border-white rounded"
          type="text"
          id="email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email formate",
            },
            validate: {
              notAdmin: (value) => {
                return (
                  value !== "admin@example.com" ||
                  "Enter a different email address"
                );
              },
              notBlackListed: (value) => {
                return (
                  !value.endsWith("baddomain.com") ||
                  "This domain is not supported"
                );
              },
              // notBlackListed: async (value) => {
              //   const res = await fetch(
              //     `https://jsonplaceholder.typicode.com/users?email=${value}`
              //   );
              //   const data = await res.json();

              //   return !data.email == value || "Email is already exists";
              // },
            },
          })}
        />
        <p className="text-red-500 text-sm my-2">{errors.email?.message}</p>

        <label className="mb-1.5 font-bold block" htmlFor="channel">
          Channel
        </label>
        <input
          className="block w-[400px] px-2 py-3 border border-white rounded"
          type="text"
          id="channel"
          {...register("channel", {
            required: {
              value: true,
              message: "Channel is required",
            },
          })}
        />
        <p className="text-red-500 text-sm my-2">{errors.channel?.message}</p>

        <label className="mb-1.5 font-bold block" htmlFor="twitter">
          Twitter
        </label>
        <input
          className="block w-[400px] px-2 py-3 border border-white rounded"
          type="text"
          id="twitter"
          {...register("social.twitter", {
            // disabled: watch("channel") === "",
            required: "Twitter is required",
          })}
        />

        <label className="mb-1.5 font-bold block" htmlFor="facebook">
          Facebook
        </label>
        <input
          className="block w-[400px] px-2 py-3 border border-white rounded"
          type="text"
          id="facebook"
          {...register("social.facebook")}
        />

        <label className="mb-1.5 font-bold block" htmlFor="phone1">
          Phone 1
        </label>
        <input
          className="block w-[400px] px-2 py-3 border border-white rounded"
          type="text"
          id="phone1"
          {...register("phones[0]")}
        />

        <label className="mb-1.5 font-bold block" htmlFor="phone2">
          Phone 2
        </label>
        <input
          className="block w-[400px] px-2 py-3 border border-white rounded"
          type="text"
          id="phone2"
          {...register("phones[1]")}
        />

        <label className="mb-1.5 font-bold block" htmlFor="numbers">
          List of Phone Numbers
        </label>
        {fields.map((field, index) => (
          <div key={field.id}>
            <input
              className="block w-[400px] px-2 py-3 border border-white rounded mb-3"
              type="text"
              {...register(`numbers[${index}].number`)}
            />
            {index > 0 && (
              <button
                className="text-red-400 border border-white rounded mt-4 w-[70px] font-bold hover:bg-white active:text-white active:bg-[#333] hover:text-black transition block mx-auto mb-3"
                type="button"
                onClick={() => remove(index)}
              >
                remove
              </button>
            )}
          </div>
        ))}
        <button
          className="text-green-500 border border-white rounded mt-4 w-[50px] font-bold hover:bg-white active:text-white active:bg-[#333] hover:text-black transition block mx-auto"
          type="button"
          onClick={() => append({ number: "" })}
        >
          add
        </button>

        <label className="mb-1.5 font-bold block" htmlFor="age">
          Age
        </label>
        <input
          className="block w-[400px] px-2 py-3 border border-white rounded"
          type="number"
          id="age"
          {...register("age", {
            valueAsNumber: true,
          })}
        />
        <p className="text-red-500 text-sm my-2">{errors.age?.message}</p>

        <label className="mb-1.5 font-bold block" htmlFor="dob">
          Date of Birth
        </label>
        <input
          className="block w-[400px] px-2 py-3 border border-white rounded"
          type="date"
          id="dob"
          {...register("dob", {
            valueAsDate: true,
          })}
        />

        <label className="block font-bold mb-2"  htmlFor="image">Upload Image</label>
        <input
          type="file"
          id="image"
          // accept="image/*"
          {...register("image")}
          className="w-full px-4 py-2 border rounded-lg bg-gray-700"
        />

        <button
          className="border border-white rounded mt-4 w-[150px] font-bold hover:bg-white active:text-white active:bg-[#333] hover:text-black transition block mx-auto"
          type="submit"
          disabled={!isDirty || isSubmitting}
        >
          Submit
        </button>

        <button
          className="border border-white rounded mt-4 w-[150px] font-bold hover:bg-white active:text-white active:bg-[#333] hover:text-black transition block mx-auto"
          type="button"
          onClick={() => console.log(getValues("email"))}
        >
          get email
        </button>

        <button
          className="border border-white rounded mt-4 w-[150px] font-bold hover:bg-white active:text-white active:bg-[#333] hover:text-black transition block mx-auto"
          type="button"
          onClick={() =>
            setValue("email", "wedrewfwe@gn.com", {
              shouldDirty: true,
              shouldValidate: true,
              shouldTouch: true,
            })
          }
        >
          set email
        </button>
        <button
          className="border border-white rounded mt-4 w-[150px] font-bold hover:bg-white active:text-white active:bg-[#333] hover:text-black transition block mx-auto"
          type="button"
          onClick={() => trigger("email")}
        >
          validate email
        </button>

        <button
          className="border border-white rounded mt-4 w-[150px] font-bold hover:bg-white active:text-white active:bg-[#333] hover:text-black transition block mx-auto"
          type="button"
          onClick={() =>
            setError("age", {
              type: "custom",
              message: "something went wrong",
            })
          }
        >
          set error
        </button>

        <button
          className="border border-white rounded mt-4 w-[150px] font-bold hover:bg-white active:text-white active:bg-[#333] hover:text-black transition block mx-auto"
          type="button"
          onClick={() => resetField("email")}
        >
          reset email
        </button>

        <button
          className="border border-white rounded mt-4 w-[150px] font-bold hover:bg-white active:text-white active:bg-[#333] hover:text-black transition block mx-auto"
          type="button"
          onClick={() => unregister("email", { keepError: true })}
        >
          unregister email
        </button>

      </form>
      <DevTool control={control} />
    </div>
  );
}
