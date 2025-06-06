import React from "react";
import ShopDetails from "@/components/ShopDetails";
import { Metadata } from "next";
import { getProductBySlug } from "@/services/products";

export const metadata: Metadata = {
  title: "Shop Details Page | NextCommerce Nextjs E-commerce template",
  description: "This is Shop Details Page for NextCommerce Template",
  // other metadata
};



const ShopDetailsPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;

  let product = null;
  let error = null;

  try {
    const data = await getProductBySlug(slug);
    product = data.data;
  } catch (e: any) {
    error = e;
    console.error('API Error:', e);
  }

  return (
    <main>
      <ShopDetails product={product} />
    </main>
  );
};

export default ShopDetailsPage;
