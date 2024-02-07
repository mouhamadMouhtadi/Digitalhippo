import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Icons } from "./Icons";
import Link from "next/link";
import Navitems from "./Navitems";
import { buttonVariants } from "./ui/button";
import Cart from "./Cart";
import { cookies } from "next/headers";
import { getServerSideUser } from "@/lib/payload-utils";
import UserAccountNav from "./UserAccountNav";
const NavBar = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);
  return (
    <div className="bg-white sticky -50 top-0 h-16 inset-x-0">
      <header className="bg-white relative">
        <MaxWidthWrapper>
          {/* logo and Ui-kits, Icons */}
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              {/* TODO: Mobile nav */}
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Icons.logo className="w-10 h-10" />
                </Link>
              </div>
              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <Navitems />
              </div>
              {/* sign-in ,sign-up and Cart */}
              <div className="ml-auto flex items-center ">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? null : (
                    <Link
                      href="/sign-in"
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Sign in
                    </Link>
                  )}
                  {user ? null : (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  )}
                  {user ? (
                    <UserAccountNav user={user} />
                  ) : (
                    <Link
                      href="/sign-up"
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Sign Up
                    </Link>
                  )}
                  {user ? null : (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  )}
                  {user ? (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  ) : null}
                  {user ? null : (
                    <div className="flex lg:ml-6">
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                  <div className="ml-4 flow-root lg:ml-6">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default NavBar;
