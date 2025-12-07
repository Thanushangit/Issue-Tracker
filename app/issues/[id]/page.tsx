import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { prisma } from "@/lib/prisma";
import { Box, Button, Card, Flex, Grid, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SlNote } from "react-icons/sl";

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
    <Grid gap={"5"} columns={{ initial: "1", md: "2" }}>
      <Box className="max-w-2xl">
        <Heading>{issue.title}</Heading>
        <Flex className="gap-3 mb-4!" my="1">
          <IssueStatusBadge status={issue.status} />
          <p className="text-xs">{issue.createdAt.toLocaleDateString()}</p>
        </Flex>
        <Card>
          <p>{issue.description}</p>
        </Card>
      </Box>
      <Box>
        <Button>
          <SlNote />
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export const dynamic = "force-dynamic";

export default IssueDetailsPage;
