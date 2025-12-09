import { prisma } from "@/lib/prisma";
import IssueSummary from "./IssueSummary";
import LatestIssuePage from "./LatestIssuePage";
import IssueChart from "./IssueChart";

export default async function Home() {
  const [openIssesCount, inProgressIssuesCount, closedIssuesCount] = await Promise.all([
    prisma.issue.count({ where: { status: "OPEN" } }),
    prisma.issue.count({ where: { status: "IN_PROGRESS" } }),
    prisma.issue.count({ where: { status: "CLOSED" } }),
  ]);

  return <IssueChart open={openIssesCount} inProgress={inProgressIssuesCount} closed={closedIssuesCount} />;
}
