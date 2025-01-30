import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { fetchProductById, Product } from "../services/product.service";
import Loader from "./common/Loader";

interface ProductDetailsModalProps {
  productId: number | undefined;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ productId, isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [productDetails, setProductDetails] = useState<Product | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      if (!productId || !isOpen) return;

      setLoading(true);

      try {
        const product = await fetchProductById(productId);

        setProductDetails(product);
      } catch (err) {
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId, isOpen]);

  if (!isOpen || !productDetails) return <div>Loading...</div>;

  if (error) {
    return <div>{error}</div>;
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg relative flex flex-col sm:flex-row"
        onClick={(e) => e.stopPropagation()} // Prevent closing on modal content click
      >
        <button className="absolute top-2 right-2 text-xl text-gray-500 bg-white" onClick={onClose}>
          ×
        </button>

        {/* Image Section */}
        <div className="flex-shrink-0 w-full self-center  sm:w-1/2 p-4">
          <img
            src={productDetails.thumbnail}
            alt={productDetails.title}
            className="w-full h-72 object-contain rounded-lg"
          />
        </div>

        {/* Product Details Section */}
        <div className="flex-grow w-full sm:w-1/2 p-4">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">{productDetails.title}</h3>
          <p className="text-lg text-gray-600 mb-2">
            Price: <span className="text-green-600">${productDetails.price}</span>
          </p>
          <p className="text-sm text-gray-500 mb-4">Category: {productDetails.category}</p>
          <p className="text-gray-700 mb-4">{productDetails.description}</p>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Brand:</strong> {productDetails.brand}
          </p>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Warranty:</strong> {productDetails.warrantyInformation}
          </p>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Return Policy:</strong> {productDetails.returnPolicy}
          </p>

          {/* Reviews Section */}
          <div className="mt-4">
            <h4 className="font-semibold  text-gray-900">Customer Reviews:</h4>
            {productDetails.reviews.slice(0, 2).map((review, index) => (
              <div key={index} className="border-t mt-2">
                <p className="text-sm text-gray-800">
                  <strong>{review.reviewerName}:</strong> {review.comment}
                </p>
                <p className="text-sm text-gray-600">Rating: {review.rating}/5</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProductDetailsModal;
