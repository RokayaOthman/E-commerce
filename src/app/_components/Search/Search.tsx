"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/products");
        const data = await res.json();
        setAllProducts(data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      setIsOpen(false);
    } else {
      const filtered = allProducts.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }
  }, [query, allProducts]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative flex flex-grow my-4 rounded-full border border-gray-300 text-green-500"
    >
      <Input
        placeholder="Search for products, brands and more..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => {
          if (query.trim() !== "") setIsOpen(true);
        }}
        className="h-14 w-full rounded-full pr-12 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
      />

      <button
        type="button"
        className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-green-500 text-white transition-colors hover:bg-green-600 pointer-events-none"
      >
        <svg
          data-prefix="fas"
          data-icon="magnifying-glass"
          className="text-sm h-3 w-3"
          role="img"
          viewBox="0 0 512 512"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 0 0 0 288z"
          />
        </svg>
      </button>

      {isOpen && query.trim() !== "" && (
        <ul className="absolute top-full left-0 right-0 z-50 mt-2 max-h-60 overflow-y-auto rounded-md border bg-white shadow-md">
          {loading ? (
            <li className="p-2 text-gray-500">Loading...</li>
          ) : results.length > 0 ? (
            results.map((product) => (
              <li key={product._id} className="hover:bg-gray-100">
                <Link
                  href={`/products/${product._id}`}
                  className="block p-2"
                  onClick={() => setIsOpen(false)}
                >
                  {product.title}
                </Link>
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-400">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
}