"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get<User[]>("/api/users");
      return response.data;
    },
    staleTime: 1000 * 60,
    retry: 3,
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) return null;

  return (
    <>
      <Toaster />

      <Select.Root
        defaultValue={issue.assignToUserId || "unassigned"}
        onValueChange={async (userId) => {
          try {
            await axios.patch("/api/issues/" + issue.id, {
              assignToUserId: userId === "unassigned" ? null : userId,
            });
            toast.success("Assignee updated successfully");
          } catch (err) {
            toast.error("Failed to update assignee");
            console.error(err);
          }
        }}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassign</Select.Item>
            {users?.map((usr) => (
              <Select.Item key={usr.id} value={usr.id}>
                {usr.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default AssigneeSelect;
