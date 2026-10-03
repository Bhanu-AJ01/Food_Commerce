"use client";
import { useEffect, useMemo, useState } from "react";
import { Product } from "@/lib/types";
import { demoProducts } from "@/lib/demo-data";
import { createClient } from "@/lib/supabase/client";
import { ProductCard } from "./product-card";

export function ProductGrid({featuredOnly=false}:{featuredOnly?:boolean}){
  const [products,setProducts]=useState<Product[]>(featuredOnly?demoProducts.filter(p=>p.featured):demoProducts);
  const [category,setCategory]=useState("All");
  const [query,setQuery]=useState("");
  const [sort,setSort]=useState("featured");
  const [live,setLive]=useState(false);
  useEffect(()=>{(async()=>{const supabase=createClient(); if(!supabase)return; const {data}=await supabase.from("products").select("*").eq("active",true).order("created_at",{ascending:false}); if(data?.length){ setProducts(data as Product[]); setLive(true); }})();},[]);
  const categories=["All",...Array.from(new Set(products.map(p=>p.category)))];
  const shown=useMemo(()=>{
    const rows=products.filter(p=>(!featuredOnly||p.featured)&&(category==="All"||p.category===category)&&(p.name+" "+p.description+" "+p.category).toLowerCase().includes(query.toLowerCase()));
    return [...rows].sort((a,b)=>sort==="low"?a.price-b.price:sort==="high"?b.price-a.price:sort==="stock"?b.stock-a.stock:Number(b.featured)-Number(a.featured));
  },[products,featuredOnly,category,query,sort]);
  return <div>
    {!featuredOnly && <div className="shop-controls"><input className="shop-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search ghee, mixes, podis…"/><select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option><option value="stock">In stock first</option></select></div>}
    <div className="catalog-toolbar"><div className="chips">{categories.map(c=><button key={c} className={category===c?"chip active":"chip"} onClick={()=>setCategory(c)}>{c}</button>)}</div><span className={live?"mode live":"mode"}>{live?"● Live database":"● Demo data"}</span></div>
    <div className="product-grid">{shown.map(p=><ProductCard key={p.id} product={p}/>)}</div>
    {!shown.length&&<div className="empty-mini">No products match your search.</div>}
  </div>
}
