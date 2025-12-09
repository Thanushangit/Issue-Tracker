"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import { useSession, signOut } from "next-auth/react";
import { Avatar, Box, DropdownMenu, Text } from "@radix-ui/themes";


const Navbar = () => {
  const NavLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Issues", path: "/issues" },
  ];

  const pathName = usePathname();
  const { status, data: session } = useSession();
  return (
    <nav className="p-2 md:p-4 md:h-14 flex items-center justify-between space-x-6 border-b border-gray-400/40">
      <div className="flex items-center gap-3">
        <Link href="/">
          <AiFillBug size={20} />
        </Link>
        <ul className="flex items-center space-x-6">
          {NavLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.path}
                className={classnames({
                  "text-zinc-900": pathName === link.path,
                  "text-zinc-500": pathName !== link.path,
                  "hover:text-zinc-900 transition-colors": true,
                })}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Box>
        {status === "authenticated" && (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger title={session.user!.name! || "User"}>
              <Avatar
                src={session.user!.image!}
                fallback="?"
                referrerPolicy="no-referrer"
                size={"2"}
                radius="full"
                className="cursor-pointer"
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>
                <Text size={"2"}>{session.user!.email!}</Text>
              </DropdownMenu.Label>
              <DropdownMenu.Separator />
              <DropdownMenu.Item onClick={() => signOut()}>
                Logout
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}
        {status === "unauthenticated" && (
          <Link
            className={classnames({
              "text-zinc-900": pathName === "/api/auth/signin",
              "text-zinc-500": pathName !== "/api/auth/signin",
              "hover:text-zinc-900 transition-colors": true,
            })}
            href={"/api/auth/signin"}
          >
            Login
          </Link>
        )}
      </Box>
    </nav>
  );
};

export default Navbar;
