"use client";
import { useEffect, useState } from "react";
import { demoOrders } from "@/lib/demo-data";
import { Order } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
const statuses=["placed","confirmed","preparing","shipped","delivered","cancelled"];
export function AdminOrders(){const [orders,setOrders]=useState<Order[]>(demoOrders); const [live,setLive]=useState(false);
useEffect(()=>{(async()=>{const s=createClient();if(!s)return;const {data}=await s.from("orders").select("id,order_number,status,total,created_at,profiles(full_name),order_items(quantity)").order("created_at",{ascending:false});if(data){setOrders(data.map((o:any)=>({...o,customer_name:o.profiles?.full_name||"Customer",item_count:(o.order_items||[]).reduce((a:number,b:any)=>a+b.quantity,0)})));setLive(true)}})()},[]);
async function update(id:string,status:string){const s=createClient();if(s)await s.from("orders").update({status}).eq("id",id);setOrders(x=>x.map(o=>o.id===id?{...o,status:status as Order["status"]}:o))}
return <><div className="admin-title"><div><p>Fulfilment</p><h1>Orders</h1></div><span className={live?"mode live":"mode"}>{live?"● Live database":"● Demo mode"}</span></div><div className="panel"><div className="table-wrap"><table><thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th></tr></thead><tbody>{orders.map(o=><tr key={o.id}><td><b>{o.order_number}</b><small>{new Date(o.created_at).toLocaleDateString("en-IN")}</small></td><td>{o.customer_name}</td><td>{o.item_count||1}</td><td>₹{o.total}</td><td><select value={o.status} onChange={e=>update(o.id,e.target.value)}>{statuses.map(s=><option key={s}>{s}</option>)}</select></td></tr>)}</tbody></table></div></div></>}
