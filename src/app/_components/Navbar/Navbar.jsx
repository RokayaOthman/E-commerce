"use client";
import logo from "@/Utilities/logo.svg";
import Image from "next/image";
import Link from "next/link";
import {
  Navbar as Nav,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
import { signOut, useSession } from "next-auth/react";
import { useContext } from "react";
import { CartContext } from "@/context/Cartcontextx";
import SearchBar from "@/app/_components/Search/Search";

export default function Navbar() {
  const { numberOfCartItems } = useContext(CartContext);
  const { data: session } = useSession();

  function logout() {
    signOut({ callbackUrl: "/login" });
  }

  return (
    <Nav
      fluid
      className="border-b border-gray-200 bg-white px-4 py-0 shadow-sm [&>div]:py-0 h-25"
    >
      <div className="flex w-full items-center justify-between gap-6 px-6">
        <NavbarBrand as={Link} href="/" className="shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-gray-900">
              <Image
                src={logo}
                alt="FreshCart"
                width={160}
                height={31}
                className="h-6 lg:h-7 w-auto"
              />{" "}
            </span>
          </div>
        </NavbarBrand>

        <div className="hidden min-w-0 w-72 px-4 lg:block">
          <SearchBar />
        </div>

        <div className="hidden shrink-0 items-center gap-6 lg:flex">
          <ul className="flex items-center gap-6 text-[15px] font-medium text-gray-700">
            <li className="transition hover:text-green-500">
              <Link href="/">Home</Link>
            </li>
            <li className="transition hover:text-green-500">
              <Link href="/shop">Shop</Link>
            </li>
            <li className="transition hover:text-green-500">
              <Link href="/categories">Categories</Link>
            </li>
            <li className="transition hover:text-green-500">
              <Link href="/brands">Brands</Link>
            </li>
          </ul>

          <div className="flex items-center gap-2 text-gray-700">
            <div className="flex w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
              <i className="fa-solid fa-headset text-lg" />
            </div>
            <div className="leading-tight">
              <p className="text-xs text-gray-500">Support</p>
              <p className="text-sm font-semibold text-gray-800">24/7 Help</p>
            </div>
          </div>

          <Link
            href="/wishlist"
            className="text-2xl text-gray-700 transition hover:text-green-500"
          >
            <i className="fa-regular fa-heart" />
          </Link>

          <Link
            href="/cart"
            className="relative text-2xl text-gray-700 transition hover:text-green-500"
          >
            <i className="fa-solid fa-cart-shopping" />
            {numberOfCartItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-[11px] font-semibold text-white">
                {numberOfCartItems}
              </span>
            )}
          </Link>

          {!session ? (
            <Link
              href="/login"
              className="rounded-full bg-green-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-600"
            >
              Sign In
            </Link>
          ) : (
            <button
              onClick={logout}
              className="rounded-full bg-green-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-600"
            >
              Sign Out
            </button>
          )}
        </div>

        <div className="ml-auto flex items-center gap-3 lg:hidden">
          <Link href="/cart" className="relative text-xl text-gray-700">
            <i className="fa-solid fa-cart-shopping" />
            {numberOfCartItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-[11px] font-semibold text-white">
                {numberOfCartItems}
              </span>
            )}
          </Link>
          <NavbarToggle />
        </div>
      </div>

      <NavbarCollapse>
        <div className="mt-4 space-y-4 border-t border-gray-200 pt-4 lg:hidden">
          <SearchBar />

          <ul className="flex flex-col gap-3 text-sm font-medium text-gray-700">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/shop">Shop</Link>
            </li>
            <li>
              <Link href="/categories">Categories</Link>
            </li>
            <li>
              <Link href="/brands">Brands</Link>
            </li>
            <li>
              <Link href="/wishlist">Wishlist</Link>
            </li>
            {!session ? (
              <>
                <li>
                  <Link href="/register">Register</Link>
                </li>
                <li>
                  <Link href="/login">Login</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/profile">Profile</Link>
                </li>
                <li>
                  <button onClick={logout} className="text-left">
                    Sign Out
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </NavbarCollapse>
    </Nav>
  );
}
