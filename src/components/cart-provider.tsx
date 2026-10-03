"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CartItem, Product } from "@/lib/types";

type CartContextType = {
  items: CartItem[]; count: number; subtotal: number;
  add: (product: Product) => void; remove: (id:string) => void;
  setQty: (id:string, qty:number) => void; clear: () => void;
};
const CartContext=createContext<CartContextType | null>(null);
export function CartProvider({children}:{children:React.ReactNode}){
  const [items,setItems]=useState<CartItem[]>([]);
  const [ready,setReady]=useState(false);
  useEffect(()=>{ try{ const raw=localStorage.getItem("ammas-cart"); if(raw) setItems(JSON.parse(raw)); }catch{} setReady(true); },[]);
  useEffect(()=>{ if(ready) localStorage.setItem("ammas-cart",JSON.stringify(items)); },[items,ready]);
  const value=useMemo(()=>({
    items,
    count:items.reduce((s,i)=>s+i.quantity,0),
    subtotal:items.reduce((s,i)=>s+i.price*i.quantity,0),
    add:(p:Product)=>setItems(x=>{const f=x.find(i=>i.id===p.id); return f?x.map(i=>i.id===p.id?{...i,quantity:i.quantity+1}:i):[...x,{...p,quantity:1}]}),
    remove:(id:string)=>setItems(x=>x.filter(i=>i.id!==id)),
    setQty:(id:string,qty:number)=>setItems(x=>qty<=0?x.filter(i=>i.id!==id):x.map(i=>i.id===id?{...i,quantity:qty}:i)),
    clear:()=>setItems([])
  }),[items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
export function useCart(){ const v=useContext(CartContext); if(!v) throw new Error("useCart must be inside CartProvider"); return v; }
