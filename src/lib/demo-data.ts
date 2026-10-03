import { Product, Order } from "./types";

export const demoProducts: Product[] = [
  { id:"p1", slug:"pure-cow-ghee", name:"Pure Cow Ghee", description:"Slow-cooked golden ghee with a rich, nutty aroma.", category:"Ghee & Oils", price:650, compare_at_price:720, unit:"500 ml", stock:42, featured:true, active:true, image_emoji:"🫙" },
  { id:"p2", slug:"idli-dosa-mix", name:"Idli Dosa Mix", description:"Soft idlis and crisp dosas with a quick traditional batter mix.", category:"Ready Mixes", price:180, unit:"500 g", stock:68, featured:true, active:true, image_emoji:"🥣" },
  { id:"p3", slug:"milagai-podi", name:"Milagai Podi", description:"Roasted lentils, sesame and chillies — perfect with idli and dosa.", category:"Podis & Spices", price:150, unit:"200 g", stock:31, featured:true, active:true, image_emoji:"🌶️" },
  { id:"p4", slug:"sambar-powder", name:"Sambar Powder", description:"A fragrant house blend inspired by a Tamil family kitchen.", category:"Podis & Spices", price:160, unit:"200 g", stock:27, featured:true, active:true, image_emoji:"🧂" },
  { id:"p5", slug:"ragi-malt-mix", name:"Ragi Malt Mix", description:"Wholesome finger millet mix for a comforting breakfast drink.", category:"Ready Mixes", price:200, unit:"400 g", stock:36, featured:true, active:true, image_emoji:"🌾" },
  { id:"p6", slug:"filter-coffee-blend", name:"Filter Coffee Blend", description:"Deep, aromatic South Indian coffee with a touch of chicory.", category:"Pantry", price:280, unit:"250 g", stock:22, featured:false, active:true, image_emoji:"☕" },
  { id:"p7", slug:"murukku-combo", name:"Traditional Snacks Combo", description:"Crunchy murukku and ribbon pakoda packed for sharing.", category:"Snacks", price:499, unit:"2 × 250 g", stock:16, featured:true, active:true, image_emoji:"🥨" },
  { id:"p8", slug:"festive-hamper", name:"Festive Pantry Hamper", description:"Ghee, podi, coffee and sweets in a gift-ready box.", category:"Gift Hampers", price:999, unit:"1 box", stock:9, featured:false, active:true, image_emoji:"🎁" }
];

export const demoOrders: Order[] = [
  {id:"o1", order_number:"AP-1042", status:"preparing", total:1480, created_at:"2026-10-03T09:30:00Z", customer_name:"Priya S", item_count:3},
  {id:"o2", order_number:"AP-1041", status:"shipped", total:999, created_at:"2026-10-03T08:10:00Z", customer_name:"Rahul K", item_count:1},
  {id:"o3", order_number:"AP-1040", status:"delivered", total:830, created_at:"2026-10-02T15:00:00Z", customer_name:"Anjali M", item_count:2},
  {id:"o4", order_number:"AP-1039", status:"confirmed", total:650, created_at:"2026-10-02T12:00:00Z", customer_name:"Karthik R", item_count:1}
];
