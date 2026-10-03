import { Product, Order } from "./types";

export const demoProducts: Product[] = [
  { id:"p1", slug:"pure-cow-ghee", name:"Pure Cow Ghee", description:"Traditional bilona-style ghee with a deep golden colour and nutty aroma.", category:"Ghee & Oils", price:650, compare_at_price:699, unit:"500 ml", stock:25, featured:true, active:true, image_emoji:"🫙", image_url:"/products/pure-cow-ghee.jpg" },
  { id:"p2", slug:"idli-podi", name:"Idli Podi", description:"Roasted lentils, sesame and chillies ground into a fragrant everyday podi.", category:"Podis & Spices", price:180, compare_at_price:199, unit:"200 g", stock:40, featured:true, active:true, image_emoji:"🌶️", image_url:"/products/idli-podi.jpg" },
  { id:"p3", slug:"dosa-mix", name:"Dosa Mix", description:"A convenient traditional breakfast mix for crisp dosas with minimal prep.", category:"Ready Mixes", price:220, compare_at_price:249, unit:"1 kg", stock:15, featured:true, active:true, image_emoji:"🥣", image_url:"/products/dosa-mix.jpg" },
  { id:"p4", slug:"sambar-podi", name:"Sambar Podi", description:"Aromatic coriander, chillies and lentils blended for homestyle sambar.", category:"Podis & Spices", price:160, compare_at_price:180, unit:"200 g", stock:30, featured:true, active:true, image_emoji:"🧂", image_url:"/products/sambar-podi.jpg" },
  { id:"p5", slug:"rasam-podi", name:"Rasam Podi", description:"Peppery, tangy spice blend for a comforting South Indian rasam.", category:"Podis & Spices", price:150, unit:"200 g", stock:18, featured:false, active:true, image_emoji:"🌿", image_url:"/products/rasam-podi.jpg" },
  { id:"p6", slug:"millet-dosa-mix", name:"Millet Dosa Mix", description:"A wholesome millet-based dosa mix made for quick weekday breakfasts.", category:"Ready Mixes", price:240, unit:"1 kg", stock:12, featured:true, active:true, image_emoji:"🌾", image_url:"/products/millet-dosa-mix.jpg" },
  { id:"p7", slug:"peanut-chutney-podi", name:"Peanut Chutney Podi", description:"Roasted peanuts, chillies and spices for idli, dosa, rice or curd rice.", category:"Podis & Spices", price:170, unit:"200 g", stock:22, featured:true, active:true, image_emoji:"🥜", image_url:"/products/peanut-chutney-podi.jpg" },
  { id:"p8", slug:"karuppu-kavuni-rice", name:"Karuppu Kavuni Rice", description:"Traditional black rice with a naturally nutty flavour for special meals.", category:"Pantry", price:220, unit:"1 kg", stock:10, featured:false, active:true, image_emoji:"🍚", image_url:"/products/karuppu-kavuni-rice.jpg" }
];

export const demoOrders: Order[] = [
  {id:"o1", order_number:"AP-1042", status:"preparing", total:1450, created_at:"2026-10-03T09:30:00Z", customer_name:"Priya S", item_count:3},
  {id:"o2", order_number:"AP-1041", status:"shipped", total:890, created_at:"2026-10-03T08:10:00Z", customer_name:"Rahul K", item_count:2},
  {id:"o3", order_number:"AP-1040", status:"delivered", total:2100, created_at:"2026-10-02T15:00:00Z", customer_name:"Anjali M", item_count:4},
  {id:"o4", order_number:"AP-1039", status:"confirmed", total:680, created_at:"2026-10-02T12:00:00Z", customer_name:"Karthik R", item_count:1}
];
