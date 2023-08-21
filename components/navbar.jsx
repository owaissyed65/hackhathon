import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Navbar = ({ user, userId }) => {
  return (
    <div className="border-b bg-[#7749f8] h-12">
      <div className="px-8 p-2 flex justify-between">
        <div className="pl-14 text-xl md:text-2xl  font-semibold text-white ">
          Personal Blogging App
        </div>
        <div className="flex gap-x-4 items-center">
          {user && (
            <Link href={`/dashboard/${userId}`}>
              <div className="text-white">
                {user?.firstName
                  ? user?.firstName
                  : user.emailAddresses[0].emailAddress}
              </div>
            </Link>
          )}

          {!user ? (
            <Link href="/sign-in">
              <div className="text-white">Login</div>
            </Link>
          ) : (
            <UserButton afterSignOutUrl="/" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
