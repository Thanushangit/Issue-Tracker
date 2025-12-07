"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { IssueSchema } from "@/app/ZodValidationSchemas/IssueSchema";

import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(IssueSchema),
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useRouter();

  const Onsubmit = async (data: IssueForm) => {
    try {
      setErrorMessage("");
      setLoading(true);
      await axios.post("/api/issues", data);
      navigation.push("/issues");
    } catch (error) {
      console.error("Error: ", error);
      setErrorMessage("Something wrong to add the issue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl">
      {errorMessage && (
        <Callout.Root color="red" className="mb-2">
          <Callout.Icon>
            <MdErrorOutline />
          </Callout.Icon>
          <Callout.Text>{errorMessage}</Callout.Text>
        </Callout.Root>
      )}

      <form onSubmit={handleSubmit(Onsubmit)} className="space-y-3">
        <div>
          <TextField.Root
            placeholder="Title..."
            {...register("title")}
          ></TextField.Root>
          {errors?.title && (
            <span className="text-xs mt-0.5 text-red-500">
              {errors?.title?.message}
            </span>
          )}
        </div>
        <div>
          <Controller
            name="description"
            control={control}
            render={({ field }) => <SimpleMDE {...field} />}
          />
          {errors?.description && (
            <span className="text-xs text-red-500 block">
              {errors?.description?.message}
            </span>
          )}
        </div>
        <Button disabled={loading} className="flex item-center cursor-pointer">
          {loading && <AiOutlineLoading3Quarters className="animate-spin" />}{" "}
          {loading ? "Submitting..." : "Submit New Issue"}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
