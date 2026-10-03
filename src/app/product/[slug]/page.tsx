"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Product } from "@/lib/types";
import { demoProducts } from "@/lib/demo-data";
import { createClient } from "@/lib/supabase/client";
import { useCart } from "@/components/cart-provider";

export default function ProductPage(){
 const params=useParams<{slug:string}>(); const {add}=useCart();
 const [product,setProduct]=useState<Product|undefined>(()=>demoProducts.find(p=>p.slug===params.slug));
 const [live,setLive]=useState(false);
 useEffect(()=>{(async()=>{const s=createClient();if(!s)return;const {data}=await s.from("products").select("*").eq("slug",params.slug).eq("active",true).maybeSingle();if(data){setProduct(data as Product);setLive(true)}})()},[params.slug]);
 if(!product)return <><Header/><main className="shell section"><div className="empty"><h2>Product not found</h2><Link className="btn btn-primary" href="/shop">Back to shop</Link></div></main></>;
 return <><Header/><main className="shell section"><div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / {product.name}</div><div className="product-detail"><div className="detail-photo-card">{product.image_url?<img src={product.slug==="pure-cow-ghee" && !live?"/products/pure-cow-ghee-detail.jpg":product.image_url} alt={product.name}/>:<span>{product.image_emoji}</span>}</div><div className="detail-copy"><span className={live?"mode live":"mode"}>{live?"● Live product":"● Demo product"}</span><div className="eyebrow">{product.category}</div><h1>{product.name}</h1><div className="rating">★★★★★ <small>Prototype customer favourite</small></div><div className="detail-price">₹{product.price} {product.compare_at_price&&<s>₹{product.compare_at_price}</s>}</div><p>{product.description}</p><div className="pack-box"><b>Pack size</b><span>{product.unit}</span></div><div className="detail-actions"><button className="btn btn-primary" onClick={()=>add(product)} disabled={!product.stock}>Add to cart</button><Link className="btn btn-ghost" href="/cart">View cart</Link></div><div className="detail-benefits"><span>🌿 Pure ingredients</span><span>🚫 No artificial preservatives</span><span>🔥 Traditional recipes</span><span>📦 Small-batch packed</span></div></div></div></main></>
}
