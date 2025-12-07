"use client";
import NextLink from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";

interface props {
  href: string;
  children: string;
}

const Link = ({ href, children }: props) => {
  return (
    <RadixLink asChild>
      <NextLink href={href}>{children}</NextLink>
    </RadixLink>
  );
};

export default Link;
