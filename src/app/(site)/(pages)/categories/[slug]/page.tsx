import React from "react";
import ShopWithSidebar from "@/components/ShopWithSidebar";
import { Metadata } from "next";
import { getProducts } from "@/services/products";
import { getCategoryBySlug } from "@/services/category";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const data = await getCategoryBySlug(slug);
    const category = data.data;
    return {
      title: category.seoTitle || category.name,
      description: category.metaDescription || category.description,
      robots: {
        index: category.isIndexed? category.isIndexed : true,
        follow: category.isFollowed? category.isFollowed : true,
      },
      alternates: {
        canonical: category.canonicalUrl || undefined,
      },
    };
  } catch {
    return {
      title: "",
      description: "",
      robots: { index: true, follow: true },
      alternates: {},
    };
  }
}

interface ShopWithSidebarPageProps {
  params: Promise<{ slug: string }>;
}

const ShopWithSidebarPage = async ({ params }: ShopWithSidebarPageProps) => {
  const { slug } = await params;
  let products = [];
  let category = null;
  let body = {
    limit: 5,
    offset: 0,
    sort: {
      column: "createdAt",
      order: "desc" as "desc"
    },
    filters: {}
  };

  let total = 0;
  let error = null;


  try {
    const data = await getCategoryBySlug(slug);
    category = data.data;
    body.filters = {
      "categories.category.slug": {
        operator: "or",
        filterModes: [
          { mode: "equals", value: category.slug },
          ...((category.childsSlug || []).map((child: string) => ({ mode: "equals", value: child })))
        ]
      }
    };

    try {
      const productsData = await getProducts(body);
      products = Array.isArray(productsData.data.items) ? productsData.data.items : [];
      total = productsData.data.total;
    } catch (e: any) {
      error = e;
      console.error('API Products Error:', e);
    }
  } catch (e: any) {
    error = e;
    console.error('API Error:', e);
  }

  return (
    <main>
      {error && <div style={{ color: 'red' }}>خطا در دریافت محصولات: {error?.message || error?.toString()}</div>}
      <ShopWithSidebar
        products={products}
        title={category?.name}
        desc={category?.description}
        total={total}
        itemsPerPage={3} />
    </main>
  );
};

export default ShopWithSidebarPage;
