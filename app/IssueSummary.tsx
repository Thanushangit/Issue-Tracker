import { Status } from "@prisma/client";
import { Card, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const statuses: { label: string; value: number; status: Status }[] = [
    { label: "Open Issues", value: open, status: Status.OPEN },
    {
      label: "In Progress Issues",
      value: inProgress,
      status: Status.IN_PROGRESS,
    },
    { label: "Closed Issues", value: closed, status: Status.CLOSED },
  ];
  return (
    <Flex gap={"4"}>
      {statuses.map((status) => (
        <Card key={status.label}>
          <Flex direction={"column"} gap={"1"}>
            <Link href={`/issues?status=${status.status}`} className="text-sm font-medium">{status.label}</Link>
            <span className="font-semibold">{status.value}</span>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
