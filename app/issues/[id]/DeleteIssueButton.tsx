"use client";

import { Flex } from "@radix-ui/themes";
import { AlertDialog, Button } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const DeleteIssueButton = ({ issueId }: { issueId: string }) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" className="ml-3">
            {" "}
            <FaRegTrashCan /> Delete Issue
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you want to delete this issue? This action cannot be
            undone.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                disabled={loading}
                color="red"
                onClick={async () => {
                  try {
                    setLoading(true);
                    await axios.delete(`/api/issues/${issueId}`);
                    router.push("/issues");
                    router.refresh();
                  } catch (error) {
                    console.error("Error deleting issue:", error);
                    setErrorMessage(true);
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                {loading && (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                )}
                {loading ? "Deleting..." : "Delete Issue"}
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      {errorMessage && (
        <AlertDialog.Root open={errorMessage} onOpenChange={setErrorMessage}>
          <AlertDialog.Content maxWidth="450px">
            <AlertDialog.Title>Error</AlertDialog.Title>
            <AlertDialog.Description size="2">
              There was an error deleting the issue. Please try again later.
            </AlertDialog.Description>
            <Button
              variant="soft"
              color="gray"
              mt={"2"}
              onClick={() => setErrorMessage(false)}
            >
              Ok
            </Button>
          </AlertDialog.Content>
        </AlertDialog.Root>
      )}
    </>
  );
};

export default DeleteIssueButton;
