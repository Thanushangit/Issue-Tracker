import { Button } from "@radix-ui/themes";
import Pagination from "./components/Pagination";

export default async function Home({searchParams}: {searchParams: {page?: string}}) {

  const searchparamsNew = await searchParams;
  return (
    <div>
      <Pagination itemCount={100} pageSize={10} currentPage={searchparamsNew.page ? parseInt(searchparamsNew.page) : 1} />
    </div>
  );
}
