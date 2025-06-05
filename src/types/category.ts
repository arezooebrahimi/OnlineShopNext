import { Seo } from "./common";

export type Category = {
  name: string;
  slug: string;
  filePath: string;
  altText: string;
};


export type GetCategoryBySlugDto = Seo & {
  name: string;
  description: string;
  slug: string;
  childsSlug: string[];
};

export type GetCategoryBySlugResponse = {
  data: GetCategoryBySlugDto; 
};