"use client";

import { Callout, TextField, Button } from "@radix-ui/themes";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { IssueSchema } from "@/app/ZodValidationSchemas/IssueSchema";
import "easymde/dist/easymde.min.css";

import dynamic from "next/dynamic";
import axios from "axios";
import { Issue } from "@prisma/client";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface IssueForm {
  title: string;
  description: string;
}

interface issue {
  props?: Issue;
}

const IssueForm = ({ props }: issue) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(IssueSchema),
    defaultValues: {
      title: props ? props.title : "",
      description: props ? props.description : "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useRouter();

  const Onsubmit = async (data: IssueForm) => {
    try {
      setErrorMessage("");
      setLoading(true);
      if (props) await axios.patch(`/api/issues/${props.id}`, data);
      else await axios.post("/api/issues", data);
      navigation.push("/issues");
      navigation.refresh();
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
          {errors?.title && (
            <span className="text-xs mb-0.5 text-red-500">
              {errors?.title?.message}
            </span>
          )}
          <TextField.Root
            placeholder="Title..."
            {...register("title")}
          ></TextField.Root>
        </div>
        <div>
          {errors?.description && (
            <span className="text-xs mb-0.5 text-red-500 block">
              {errors?.description?.message}
            </span>
          )}
          <Controller
            name="description"
            control={control}
            render={({ field }) => <SimpleMDE {...field} />}
          />
        </div>
        <Button disabled={loading} className="flex item-center cursor-pointer">
          {loading && <AiOutlineLoading3Quarters className="animate-spin" />}{" "}
          {props
            ? loading
              ? "Updating..."
              : "Update Issue"
            : loading
            ? "Submitting..."
            : "Submit New Issue"}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
