
export type GetProductsRequest = {
  limit?: number;
  offset?: number;
  sort?: {
    column: string;
    order: 'asc' | 'desc';
  };
  filters?: Record<string, any>;
};

export type Product = {
  name: string;
  slug: string;
  price: number;
  salePrice: number;
  raiting: number;
  reviewsCount: number;
  filePath: string;
  altText: string;
};

export type GetProductsResponse = {
  data: {
    items: Product[];
    total?: number;
  };
};
