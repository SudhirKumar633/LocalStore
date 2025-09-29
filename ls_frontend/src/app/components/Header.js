"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const closeTimer = useRef(null);
  const [dealerOpen, setDealerOpen] = useState(false);
  const dealerCloseTimer = useRef(null);

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
        closeTimer.current = null;
      }
      if (dealerCloseTimer.current) {
        clearTimeout(dealerCloseTimer.current);
        dealerCloseTimer.current = null;
      }
    };
  }, []);
  const [showMsg] = useState(true);
  const messages = [
    "Flat 20% off on all orders today — use code LOCAL20",
    "Free shipping on orders above ₹1999",
    "New arrivals: sports collection launched"
  ];
  const [msgIndex, setMsgIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hold = 3000; // visible duration in ms
    const fade = 600; // fade out/in duration in ms
    const interval = setInterval(() => {
      // fade out
      setVisible(false);
      setTimeout(() => {
        setMsgIndex((i) => (i + 1) % messages.length);
        // fade in
        setVisible(true);
      }, fade);
    }, hold + fade);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <header className="w-full bg-blue-600 text-white">
      {showMsg && (
        <div style={{ background: '#FFE66D', color: '#000', width: '100%' }}>
          <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '4px 10px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 30, overflow: 'hidden' }}>
            <div style={{ height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ transition: `opacity 400ms ease`, opacity: visible ? 1 : 0, textAlign: 'center', lineHeight: '20px', fontSize: 13 }}>
                {messages[msgIndex]}
              </div>
            </div>
          </div>
        </div>
      )}
  <div className="max-w-[1600px] mx-auto px-4 md:px-0 py-4 flex items-center justify-between">
        <div className="flex items-center ml-0 md:ml-6">
          <img src="/file.svg" alt="YourBrand" style={{ height: 34, width: 'auto' }} />
        </div>

  <div className="hidden md:flex items-center gap-6 mr-6">
            <nav className="flex items-center gap-4">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/products" className="hover:underline">Products</Link>
            <Link href="/Sales" className="hover:underline">Sales</Link>
            <div
              className="relative"
              onMouseEnter={() => {
                if (closeTimer.current) {
                  clearTimeout(closeTimer.current);
                  closeTimer.current = null;
                }
                setCompanyOpen(true);
              }}
              onMouseLeave={() => {
                // small delay so pointer can move into dropdown without it closing
                closeTimer.current = setTimeout(() => setCompanyOpen(false), 150);
              }}
            >
              <button className="hover:underline cursor-pointer">Company Info</button>
              <div
                onMouseEnter={() => {
                  if (closeTimer.current) {
                    clearTimeout(closeTimer.current);
                    closeTimer.current = null;
                  }
                }}
                onMouseLeave={() => {
                  closeTimer.current = setTimeout(() => setCompanyOpen(false), 150);
                }}
                className={`transition-all duration-150 absolute left-0 top-full mt-1 w-40 bg-white text-black rounded shadow z-50 p-2 ${companyOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}
              >
                <ul className="text-sm">
                  <li className="py-1"><Link href="/about" className="cursor-pointer">About Us</Link></li>
                  <li className="py-1"><Link href="/media" className="cursor-pointer">Media</Link></li>
                  <li className="py-1"><Link href="/careers" className="cursor-pointer">Careers</Link></li>
                  <li className="py-1"><Link href="/contact" className="cursor-pointer">Contact Us</Link></li>
                </ul>
              </div>
            </div>
            <Link href="/contact" className="hover:underline">Contact</Link>
            <Link href="/basket-quote" aria-label="Basket Quote" className="flex items-center gap-2 bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2l1.5 4h9L18 2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 6h18l-1 11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2L3 6z" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="10" cy="18" r="1" />
                <circle cx="17" cy="18" r="1" />
              </svg>
              <span className="font-medium">Basket Quote</span>
            </Link>
          </nav>

      <div className="flex items-center gap-1">
            <input
              type="search"
              placeholder="Search products..."
        className="rounded-md px-2 py-1 text-black max-w-[220px] md:max-w-[320px]"
            />
            <div
              className="relative"
              onMouseEnter={() => {
                if (dealerCloseTimer.current) {
                  clearTimeout(dealerCloseTimer.current);
                  dealerCloseTimer.current = null;
                }
                setDealerOpen(true);
              }}
              onMouseLeave={() => {
                dealerCloseTimer.current = setTimeout(() => setDealerOpen(false), 150);
              }}
            >
              <button className="px-3 py-1 border border-white rounded cursor-pointer">Dealer</button>
              <div
                onMouseEnter={() => {
                  if (dealerCloseTimer.current) {
                    clearTimeout(dealerCloseTimer.current);
                    dealerCloseTimer.current = null;
                  }
                }}
                onMouseLeave={() => {
                  dealerCloseTimer.current = setTimeout(() => setDealerOpen(false), 150);
                }}
                className={`transition-all duration-150 absolute right-0 top-full mt-1 w-44 bg-white text-black rounded shadow z-50 p-2 ${dealerOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}
              >
                <ul className="text-sm">
                  <li className="py-1"><Link href="/login" className="cursor-pointer">Login</Link></li>
                  <li className="py-1"><Link href="/register" className="cursor-pointer">Registration</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Sign + hamburger */}
      <div className="flex md:hidden items-center gap-4 mr-2">
        <Link href="/basket-quote" className="px-2 py-1 bg-yellow-400 text-black rounded flex items-center justify-center"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M6 2l1.5 4h9L18 2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 6h18l-1 11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2L3 6z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="sr-only">Basket Quote</span>
          </Link>
          
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen(prev => !prev)}
            className="p-2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-blue-500 w-full">
          <div style={{ padding: 12 }}>
            <input
              type="search"
              placeholder="Search products..."
              className="rounded-md px-3 py-2 text-black w-full"
            />
            <nav style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Link href="/products" className="block">Products</Link>
              <Link href="/Sales" className="block">Sales</Link>
              <Link href="/about" className="block">About Us</Link>
              <Link href="/media" className="block">Media</Link>
              <Link href="/careers" className="block">Careers</Link>
              <Link href="/contact" className="block">Contact Us</Link>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Link href="/login" className="block">Dealer Login</Link>
                <Link href="/register" className="block">Dealer Registration</Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}