"use client";
import Link from "next/link";
import { useCart } from "./cart-provider";

export function Header(){
  const {count}=useCart();
  return <>
    <div className="topbar"><span>🚚 Free delivery on orders above ₹999</span><span className="topbar-right">🌿 Pure ingredients &nbsp; • &nbsp; Traditional recipes &nbsp; • &nbsp; Made in small batches</span></div>
    <header className="header shell">
      <Link href="/" className="brand"><span className="brand-mark">🪷</span><span><b>Amma&apos;s Pantry</b><small>TRADITION IN EVERY BITE</small></span></Link>
      <nav className="nav"><Link href="/">Home</Link><Link href="/shop">Products</Link><Link href="/#story">Our Story</Link><Link href="/admin">Admin</Link></nav>
      <div className="header-actions"><Link className="icon-btn" href="/login" aria-label="Account">👤</Link><Link className="cart-link" href="/cart">🛒 <span>{count}</span></Link></div>
    </header>
  </>
}
