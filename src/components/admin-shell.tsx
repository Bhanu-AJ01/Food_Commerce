"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient, hasSupabaseEnv } from "@/lib/supabase/client";

export function AdminShell({children}:{children:React.ReactNode}){
  const p=usePathname(); const router=useRouter();
  const [allowed,setAllowed]=useState(!hasSupabaseEnv());
  const [checking,setChecking]=useState(hasSupabaseEnv());
  const links=[["/admin","Overview"],["/admin/products","Products"],["/admin/orders","Orders"],["/admin/customers","Customers"]];
  useEffect(()=>{(async()=>{
    const s=createClient(); if(!s){setAllowed(true);setChecking(false);return}
    const {data:{user}}=await s.auth.getUser();
    if(!user){router.replace("/login");return}
    const {data}=await s.from("profiles").select("role").eq("id",user.id).single();
    if(data?.role!=="admin"){setAllowed(false);setChecking(false);return}
    setAllowed(true);setChecking(false);
  })()},[router]);
  if(checking) return <div className="auth-wrap"><div className="auth-card"><h2>Checking admin access…</h2></div></div>;
  if(!allowed) return <div className="auth-wrap"><div className="auth-card"><span className="kicker red">ACCESS RESTRICTED</span><h1>Admin only</h1><p>Your account is signed in, but it does not have the admin role.</p><Link className="btn btn-primary" href="/">Return to store</Link></div></div>;
  return <div className="admin-layout"><aside className="admin-side"><Link href="/" className="admin-brand">🪷 Amma&apos;s Pantry</Link><small>ADMIN CONSOLE</small><nav>{links.map(([href,label])=><Link key={href} className={p===href?"active":""} href={href}>{label}</Link>)}</nav><Link className="back-store" href="/">← Back to store</Link></aside><main className="admin-main">{children}</main></div>
}
