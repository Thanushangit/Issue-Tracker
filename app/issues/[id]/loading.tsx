import { Box, Card, Flex } from '@radix-ui/themes'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const IssueDetailsPageLoading = () => {
  return (
  <Box className="max-w-2xl">
     <Skeleton/>
      <Flex className="gap-3 mb-4!" my="1">
        <Skeleton width={"5rem"}/>
        <Skeleton width={"8rem"}/>
      </Flex>
      <Card>
       <Skeleton count={5}/>
      </Card>
    </Box>
  )
}

export default IssueDetailsPageLoading