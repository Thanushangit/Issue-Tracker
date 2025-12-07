"use client"
import dynamic from "next/dynamic";
const IssueForm = dynamic(() => import("../components/IssueForm"), {ssr: false});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
