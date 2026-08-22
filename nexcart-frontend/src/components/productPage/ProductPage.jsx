import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../store/actions';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import ProductActions from './ProductActions';
import ReviewsSection from './ReviewsSection';
import RelatedProducts from './RelatedProducts';
import ProductSpecifications from './ProductSpecifications';

function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { productById } = useSelector((state) => state.products);

  useEffect(() => {
    if (id && (!productById || productById.productId !== Number(id))) {
      dispatch(fetchProductById(id));
    }
  }, [id, productById, dispatch]);


  if (isLoading) {
    return <div className="text-center py-10">Loading product...</div>;
  }

  if (errorMessage) {
    return <div className="text-center py-10 text-red-500">Error: {errorMessage}</div>;
  }

  if (!productById) {
    return <div className="text-center py-10">No product found</div>;
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-rose-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Product Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductGallery image={productById.image} />

          {/* Sticky Info + Actions */}
          <div className="space-y-8 lg:sticky lg:top-24 self-start">
            <ProductInfo product={productById} />
            <ProductActions product={productById} />
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 border-t border-gray-200"></div>

        <ProductSpecifications />

        {/* Reviews */}
        <ReviewsSection product={productById} />

        {/* Related Products */}
        <RelatedProducts categoryName={productById.categoryName} productId={productById.productId} />
      </div>
    </div>
  );
}

export default ProductPage;
