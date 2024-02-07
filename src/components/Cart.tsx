"use client";
import { ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import React, { useEffect, useState } from "react";
import { Separator } from "@radix-ui/react-separator";
import { formatPrice } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { ScrollArea } from "./ui/scroll-area";
import CartItem from "./CartItem";

const Cart = () => {
  const { items } = useCart();
  const itemCount = items.length;
  const cartTotal = items.reduce(
    (total, { product }) => total + product.price,
    0
  );
  const fee = 1;
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex itmes  p-2">
        <ShoppingCart
          aria-hidden="true"
          className="h-6 w-6 flex-shrink text-gray-400 group-hover:text-gray-500 "
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          {isMounted ? itemCount : 0}
        </span>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart({itemCount})</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">
              {/* TODO Cart logic */}
              <ScrollArea>
                {items.map(({ product }) => (
                  <CartItem product={product} key={product.id} />
                ))}
              </ScrollArea>
              cart items
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Transaction Fee</span>
                  <span>{formatPrice(fee)}</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span>{formatPrice(cartTotal + fee)}</span>
                </div>
              </div>
              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href="/cart"
                    className={buttonVariants({ className: "w-full" })}
                  >
                    Continue to Checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex flex-col h-full items-center justify-center space-y-1">
            <div
              className="relative mb-4 w-60 h-60 text-muted-foreground "
              aria-hidden="true"
            >
              <Image
                src="/nav/hippo-empty-cart.png"
                alt="empty shopping cart hippo"
                fill
              />
            </div>
            <div className="text-xl font-semibold">Your Cart is empty</div>
            <SheetTrigger asChild>
              <Link
                href="/products"
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "text-sm text-muted-foreground",
                })}
              >
                Add item to your cart to Checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
