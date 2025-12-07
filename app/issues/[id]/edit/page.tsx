import React from "react";
import IssueForm from "../../components/IssueForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface props {
  params: {
    id: string;
  };
}

const EditIssuePage = async({ params }: props) => {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: {
      id: id,
    },
  });

  if(!issue) notFound()
  return <IssueForm props={issue} />;
};

export default EditIssuePage;
