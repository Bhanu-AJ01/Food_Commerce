import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
export const metadata: Metadata = { title:"Amma's Pantry — Traditional foods", description:"Pure ghee, ready mixes, podis and pantry favourites." };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><CartProvider>{children}</CartProvider></body></html>}
