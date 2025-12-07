import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { prisma } from "@/lib/prisma";
import { Card, Flex, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";


interface props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: props) => {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: {
      id: id,
    },
  });

  if (!issue) {
    notFound();
  }
  return (
    <div className="max-w-2xl">
      <Heading>{issue.title}</Heading>
      <Flex className="gap-3 mb-4!" my="1">
        <IssueStatusBadge status={issue.status} />
        <p className="text-xs">{issue.createdAt.toLocaleDateString()}</p>
      </Flex>
      <Card>
        <p>{issue.description}</p>
      </Card>
    </div>
  );
};

export default IssueDetailsPage;
