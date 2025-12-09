import { prisma } from "@/lib/prisma";
import IssueSummary from "./IssueSummary";
import LatestIssuePage from "./LatestIssuePage";

export default async function Home() {
  const openIssesCount = prisma.issue.count({
    where: { status: "OPEN" },
  });

  const inProgressIssuesCount = prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  const closedIssuesCount = prisma.issue.count({
    where: { status: "CLOSED" },
  });

  return <IssueSummary open={openIssesCount} inProgress={inProgressIssuesCount} closed={closedIssuesCount} />;
}
