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


export type ProductImageFormat = {
  filePath: string;
  format: string;
  width: number;
  height: number;
};

export type ProductImage = {
  isPrimary: boolean;
  title: string;
  altText: string;
  formats: ProductImageFormat[];
};

export type ProductFeature = {
  featureName: string;
  optionId: string;
  optionName: string;
};

export type ProductCategory = {
  name: string;
  slug: string;
};


export type ProductTag = {
  name: string;
  slug: string;
};


export type ProductVariable = {
  optionId: string;
  optionName: string;
  price: number;
  salePrice: number;
  stockQuantity: number;
  stockStatus: number;
  weight: number;
  length: number;
  height: number;
  width: number;
  description: string;
};

export type ProductReview = {
  name: string;
  title: string;
  reviewText: string;
  rating: number;
  createdAt: string;
};

export type ProductSeo = {
  seoTitle: string;
  metaDescription: string;
  isIndexed: boolean;
  isFollowed: boolean;
  canonicalUrl: string | null;
};

export type ProductBySlug = {
  name: string;
  slug: string;
  brand: string;
  reviewsCount: number;
  averageRating: number;
  price: number;
  salePrice: number;
  discountPercent: number;
  tag: string;
  stockStatus: number;
  description: string;
  features: ProductFeature[];
  variables: ProductVariable[];
  images: ProductImage[];
  latestReviews: ProductReview[];
  categories : ProductCategory[];
  tags : ProductTag[];
  relatedProducts: Product[];
  seo: ProductSeo;
};


export type GetProductBySlugResponse = {
  data: ProductBySlug;
  isSuccess: boolean;
  statusCode: number;
  message: string;
};


