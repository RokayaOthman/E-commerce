"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/products",
        );
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
    } else {
      const filtered = allProducts.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase()),
      );
      setResults(filtered);
    }
  }, [query, allProducts]);

  return (
    <div className="border border-gray relative w-full my-4 relative text-green-500 rounded-full overflow-hidden ">
       <div className="overflow-hidden rounded-full">
    {/* content here */}
      <Input
        placeholder="Search for products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        />

      {query.trim() !== "" && (
        <ul className="absolute left-0 right-0 bg-white border rounded mt-1 max-h-60 overflow-y-auto shadow-md z-10">
          {loading ? (
            <p className="p-2 text-gray-500">Loading...</p>
          ) : results.length > 0 ? (
            results.map((product) => (
              <Link key={product._id} href={`/products/${product._id}`}>
                <li className="p-2 hover:bg-gray-100 cursor-pointer">
                  {product.title}
                </li>
              </Link>
            ))
          ) : (
            <p className="p-2 text-gray-400">No results found</p>
          )}
        </ul>
      )}
      </div>
    </div>
  );
}
