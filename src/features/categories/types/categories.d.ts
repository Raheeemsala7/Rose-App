export interface SubCategory {
  id: string;
  title: string;
}

export interface CategoryCount {
  products: number;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  image: string;
  immutable: boolean;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  subCategories: SubCategory[];
  _count: CategoryCount;
}