import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import IssueSummary from "./IssueSummary";
import LatestIssuePage from "./LatestIssuePage";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";

export default async function Home() {
  const [openIssesCount, inProgressIssuesCount, closedIssuesCount] =
    await Promise.all([
      prisma.issue.count({ where: { status: "OPEN" } }),
      prisma.issue.count({ where: { status: "IN_PROGRESS" } }),
      prisma.issue.count({ where: { status: "CLOSED" } }),
    ]);

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
      <Flex direction="column" gap="5">
        <IssueSummary
          open={openIssesCount}
          inProgress={inProgressIssuesCount}
          closed={closedIssuesCount}
        />
        <IssueChart
          open={openIssesCount}
          inProgress={inProgressIssuesCount}
          closed={closedIssuesCount}
        />
      </Flex>
      <Flex direction="column" gap="5">
        <LatestIssuePage />
      </Flex>
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker Dashboard",
  description: "Overview of issues in the Issue Tracker application",
};
