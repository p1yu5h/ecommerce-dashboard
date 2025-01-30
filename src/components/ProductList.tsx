import { useEffect, useRef, useState } from "react";

import { Category, fetchCategories, fetchProducts, Product } from "../services/product.service";
import Loader from "./common/Loader";
import ProductItem from "./ProductItem";

const sortOptions = [
  { label: "Sort by", value: "" },
  { label: "Price (Low to High)", value: "price_asc" },
  { label: "Price (High to Low)", value: "price_desc" },
  { label: "Name (A to Z)", value: "title_asc" },
  { label: "Name (Z to A)", value: "title_desc" },
];

const ProductList = () => {
  const [sort, setSort] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [pagination, setPagination] = useState({ page: 0, limit: 8 });
  const [totalProducts, setTotalProducts] = useState<number | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastProductElementRef = useRef<HTMLDivElement | null>(null);

  // Fetch categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories);
      } catch (err) {
        setError("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const [sortBy, order] = sort.split("_"); // "title_asc" => sortBy: "title", order: "asc"

        const response = await fetchProducts(pagination, { sortBy, order }, selectedCategory || "");

        if (response.skip === 0) {
          setProducts(response.products);
        } else {
          setProducts((prevProducts) => [...prevProducts, ...response.products]);
        }
        setTotalProducts(response.total);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pagination, sort, selectedCategory]);

  // Infinite scrolling using IntersectionObserver
  useEffect(() => {
    if (loading) return;

    // To detect last page of the API
    if (totalProducts !== null && totalProducts <= pagination.page * pagination.limit) {
      return;
    }

    const currentElement = lastProductElementRef.current;
    if (!currentElement) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        // Increment the page number to load the next set of products
        setPagination((prev) => ({ ...prev, page: prev.page + 1, skip: prev.page * prev.limit }));
      }
    };

    observer.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "100px",
    });

    observer.current.observe(currentElement);

    return () => {
      if (observer.current && currentElement) {
        observer.current.unobserve(currentElement);
      }
    };
  }, [loading]);

  const handleSortChange = (value: string) => {
    window.scrollTo(0, 0);
    setSort(value);
    setPagination({ page: 0, limit: 8 });
  };

  const handleCategoryChange = (value: string) => {
    window.scrollTo(0, 0);
    setSelectedCategory(value);
    setPagination({ page: 0, limit: 8 });
  };

  if (error) {
    return (
      <div className="flex w-screen h-screen justify-center items-center text-center p-4 text-red-500">{error}</div>
    );
  }

  return (
    <div className="w-screen h-screen overflow-scroll bg-gray-300">
      <h1 className="text-slate-900 p-4">Product List</h1>

      <div className="flex gap-4 bg-gray-300 sticky top-0 z-10 p-4">
        <select
          className="cursor-pointer border border-gray-300 rounded-md p-2 text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={selectedCategory || ""}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(({ name, slug }) => (
            <option key={slug} value={slug}>
              {name}
            </option>
          ))}
        </select>

        <select
          className="cursor-pointer border border-gray-300 rounded-md p-2 text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={sort}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          {sortOptions.map(({ label, value }) => (
            <option key={label} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {loading && pagination.page === 0 ? (
        <Loader />
      ) : (
        <div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* This is the target for the Intersection Observer */}
      <div ref={lastProductElementRef}></div>

      {loading && <Loader />}
    </div>
  );
};

export default ProductList;
