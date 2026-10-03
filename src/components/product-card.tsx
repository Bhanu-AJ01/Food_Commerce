"use client";
import { Product } from "@/lib/types";
import { useCart } from "./cart-provider";
export function ProductCard({product}:{product:Product}){
  const {add}=useCart();
  return <article className="product-card">
    <div className="product-art"><span>{product.image_emoji}</span><em>{product.unit}</em></div>
    <div className="product-body"><div className="eyebrow">{product.category}</div><h3>{product.name}</h3><p>{product.description}</p>
      <div className="price-row"><div><strong>₹{product.price}</strong>{product.compare_at_price?<s>₹{product.compare_at_price}</s>:null}</div><span className={product.stock<15?"stock low":"stock"}>{product.stock<15?`Only ${product.stock} left`:`In stock`}</span></div>
      <button className="btn btn-primary full" onClick={()=>add(product)}>Add to cart</button>
    </div>
  </article>
}
