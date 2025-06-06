import { GetProductBySlugResponse, GetProductsRequest, GetProductsResponse } from "@/types/product";


export const getProducts = async (
  body?: GetProductsRequest
): Promise<GetProductsResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_CATALOG_URL}/Product/Get`;

  const options: RequestInit = {
    cache: 'no-store',
  };

  if (body) {
    options.method = 'POST';
    options.headers = {
      'Content-Type': 'application/json',
    };
    options.body = JSON.stringify(body);
  }

  const res = await fetch(url, options);

  if (!res.ok) throw new Error('Failed to fetch');

  return res.json();
}; 



export const getProductBySlug = async (
  slug: string
): Promise<GetProductBySlugResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_CATALOG_URL}/Product/Get/${slug}`;

  console.log(url);

  const options: RequestInit = {
    cache: 'no-store',
  };

  const res = await fetch(url, options);
  if (!res.ok) throw new Error('Failed to fetch');

  return res.json();
}; 