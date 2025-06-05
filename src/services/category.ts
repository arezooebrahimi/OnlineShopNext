import { GetCategoryBySlugResponse } from "@/types/category";


export const getCategoryBySlug = async (
  slug?: string
): Promise<GetCategoryBySlugResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_CATALOG_URL}/Category/GetBySlug/${slug}`;

  const options: RequestInit = {
    cache: 'no-store',
  };

  const res = await fetch(url, options);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}; 