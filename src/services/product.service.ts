import axiosInstance from "../utils/axiosInstance";

export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  description: string;
  brand: string;
  warrantyInformation: string;
  returnPolicy: string;
  reviews: {
    rating: number;
    comment: string;
    reviewerName: string;
  }[];
}

interface PaginationParams {
  page: number;
  limit: number;
}

interface SortParams {
  sortBy: string;
  order: string | "asc" | "desc";
}

interface FilterParams {
  search?: string;
  category?: string;
}

interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await axiosInstance.get("/products/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

const fetchProducts = async (pagination: PaginationParams, sort: SortParams, category): Promise<ProductResponse> => {
  try {
    const url = !!category ? `/products/category/${category}` : "/products";

    let params = { ...pagination };
    if (sort.sortBy) {
      params = { ...params, ...sort };
    }
    const response = await axiosInstance.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

const productCache: { [key: string]: Product } = {};

const fetchProductById = async (id: number): Promise<Product> => {
  try {
    if (productCache[id]) {
      return Promise.resolve(productCache[id]);
    }
    const response = await axiosInstance.get(`/products/${id}`);
    productCache[id] = response.data;
    return response.data;
  } catch (error) {
    console.error("Error fetching product by id: " + id, error);
    throw error;
  }
};

export { fetchCategories, fetchProducts, fetchProductById };
