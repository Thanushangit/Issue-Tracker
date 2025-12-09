import { prisma } from "@/lib/prisma";
import { Table } from "@radix-ui/themes";
import IssueStatusBadge from "../components/IssueStatusBadge";
import IssueActionButton from "./IssueActionButton";
import { Issue, Status } from "@prisma/client";
import Link from "next/link";
import { FaArrowUp } from "react-icons/fa6";
import Pagination from "../components/Pagination";
import { Metadata } from "next";

const IssuePage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    status?: Status;
    orderBy?: keyof Issue;
    page: string;
  }>;
}) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    {
      label: "CreatedAt",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];

  const params = await searchParams;
  const statuses = Object.values(Status);
  const status =
    params.status && statuses.includes(params.status)
      ? params.status
      : undefined;
  const orderBy = columns.map((col) => col.value).includes(params.orderBy!)
    ? params.orderBy
    : undefined;

  const page = parseInt(params.page) || 1;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;
  const issues = await prisma.issue.findMany({
    where: status ? { status } : {},
    orderBy: orderBy ? { [orderBy]: "desc" } : { createdAt: "desc" },
    skip,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where: status ? { status } : {},
  });

  return (
    <div>
      <IssueActionButton />
      <Table.Root>
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <Link
                  href={{
                    query: { ...params, orderBy: column.value },
                  }}
                >
                  {column.label}
                </Link>
                {params.orderBy === column.value ? (
                  <FaArrowUp className="inline" />
                ) : (
                  ""
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <span className="md:hidden block text-xs">
                  <IssueStatusBadge status={issue.status} />
                </span>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toLocaleDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
};

export default IssuePage;

export const metadata: Metadata = {
  title: "Issue Tracker - Issues-List",
  description: "List of issues in the Issue Tracker application",
};
