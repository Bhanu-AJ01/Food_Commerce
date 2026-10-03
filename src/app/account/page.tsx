"use client";
import { useEffect,useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { createClient } from "@/lib/supabase/client";
import { demoOrders } from "@/lib/demo-data";
import { Order } from "@/lib/types";

export default function Account(){
 const [name,setName]=useState("Demo Customer"); const [email,setEmail]=useState("demo@example.com"); const [orders,setOrders]=useState<Order[]>(demoOrders.slice(0,3)); const [live,setLive]=useState(false); const router=useRouter();
 useEffect(()=>{(async()=>{const s=createClient();if(!s){try{const u=JSON.parse(localStorage.getItem("demo-user")||"{}");if(u.full_name)setName(u.full_name);if(u.email)setEmail(u.email)}catch{}return}const {data:{user}}=await s.auth.getUser();if(!user){router.replace("/login");return}setLive(true);setEmail(user.email||"");const {data:profile}=await s.from("profiles").select("full_name").eq("id",user.id).single();setName(profile?.full_name||user.user_metadata?.full_name||"Customer");const {data:o}=await s.from("orders").select("id,order_number,status,total,created_at").eq("user_id",user.id).order("created_at",{ascending:false}).limit(8);if(o)setOrders(o as Order[])})()},[router]);
 async function logout(){const s=createClient();if(s)await s.auth.signOut();else localStorage.removeItem("demo-user");router.push("/")}
 return <><Header/><main className="shell section"><div className="account-head"><div><span className="kicker red">MY ACCOUNT</span><h1>Namaste, {name.split(" ")[0]} 👋</h1><p>{email} · {live?"Live account":"Demo account"}</p></div><div className="hero-actions"><Link className="btn btn-ghost" href="/shop">Continue shopping</Link><button className="btn btn-ghost" onClick={logout}>Logout</button></div></div><div className="dashboard-grid"><section className="panel"><h2>Recent orders</h2>{orders.length?orders.map(o=><div className="order-line" key={o.id}><div><b>{o.order_number}</b><small>{new Date(o.created_at).toLocaleDateString("en-IN")}</small></div><span className="status-pill green">{o.status}</span><strong>₹{o.total}</strong></div>):<p>No orders yet.</p>}</section><section className="panel"><h2>Delivery profile</h2><p>Your checkout addresses are stored with each order in Stage 3. A reusable address-book UI can be added with payments in the next stage.</p><Link className="btn btn-ghost" href="/checkout">Go to checkout</Link></section></div></main></>
}
