"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 mt-8 w-full">
      &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
    </footer>
  );
}