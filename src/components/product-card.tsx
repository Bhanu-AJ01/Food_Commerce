"use client";
import Link from "next/link";
import { Product } from "@/lib/types";
import { useCart } from "./cart-provider";

export function ProductCard({product}:{product:Product}){
  const {add}=useCart();
  return <article className="product-card">
    <Link href={`/product/${product.slug}`} className="product-photo-wrap" aria-label={`View ${product.name}`}>
      {product.image_url ? <img className="product-photo" src={product.image_url} alt={product.name}/> : <span className="product-fallback">{product.image_emoji}</span>}
      <em>{product.unit}</em>
      {product.featured && <b className="featured-badge">Bestseller</b>}
    </Link>
    <div className="product-body"><div className="eyebrow">{product.category}</div><Link href={`/product/${product.slug}`}><h3>{product.name}</h3></Link><p>{product.description}</p>
      <div className="price-row"><div><strong>₹{product.price}</strong>{product.compare_at_price?<s>₹{product.compare_at_price}</s>:null}</div><span className={product.stock<15?"stock low":"stock"}>{product.stock<15?`Only ${product.stock} left`:`In stock`}</span></div>
      <button className="btn btn-primary full" onClick={()=>add(product)} disabled={product.stock<=0}>{product.stock>0?"Add to cart":"Out of stock"}</button>
    </div>
  </article>
}
