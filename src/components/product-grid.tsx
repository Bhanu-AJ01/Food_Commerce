"use client";
import { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import { demoProducts } from "@/lib/demo-data";
import { createClient } from "@/lib/supabase/client";
import { ProductCard } from "./product-card";

export function ProductGrid({featuredOnly=false}:{featuredOnly?:boolean}){
  const [products,setProducts]=useState<Product[]>(featuredOnly?demoProducts.filter(p=>p.featured):demoProducts);
  const [category,setCategory]=useState("All");
  const [live,setLive]=useState(false);
  useEffect(()=>{(async()=>{const supabase=createClient(); if(!supabase)return; const {data}=await supabase.from("products").select("*").eq("active",true).order("created_at",{ascending:false}); if(data?.length){ setProducts(data as Product[]); setLive(true); }})();},[]);
  const categories=["All",...Array.from(new Set(products.map(p=>p.category)))];
  const shown=products.filter(p=>(!featuredOnly||p.featured)&&(category==="All"||p.category===category));
  return <div>
    <div className="catalog-toolbar"><div className="chips">{categories.map(c=><button key={c} className={category===c?"chip active":"chip"} onClick={()=>setCategory(c)}>{c}</button>)}</div><span className={live?"mode live":"mode"}>{live?"● Live database":"● Demo data"}</span></div>
    <div className="product-grid">{shown.map(p=><ProductCard key={p.id} product={p}/>)}</div>
  </div>
}
