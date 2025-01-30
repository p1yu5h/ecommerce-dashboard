import React, { useState } from "react";
const ProductDetailsModal = React.lazy(() => import("./ProductDetailsModal"));

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
}

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full h-full border  rounded-lg shadow-md p-4 bg-white cursor-pointer" onClick={openModal}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-40 object-contain border border-gray-200 rounded-lg mb-4"
      />
      <div className="flex flex-col">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h3>
        <p className="text-lg text-gray-600 mb-2 text-green-600">${product.price}</p>

        <span className="inline-block bg-blue-200 text-blue-800 w-fit text-sm font-semibold px-3 py-1 rounded-md capitalize">
          {product.category?.split("-")?.join(" ")}
        </span>
      </div>

      {/* Modal Component */}
      <ProductDetailsModal productId={product.id} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default ProductItem;
