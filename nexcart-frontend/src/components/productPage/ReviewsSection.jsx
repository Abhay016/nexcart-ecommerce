import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { fetchReviewsByProduct } from "../../store/actions";

function ReviewsSection({ product }) {
  const dispatch = useDispatch();
  const { reviews, isLoading, errorMessage } = useSelector((state) => state.reviews);

  const productId = product?.productId;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (productId && (!reviews || reviews.length === 0)) {
      dispatch(fetchReviewsByProduct(productId));
    }
  }, [productId, dispatch, reviews]);

  const averageRating =
    reviews && reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  const handleSubmitReview = () => {
    console.log("Submitting review:", { rating, comment });
    setIsModalOpen(false);
    setRating(0);
    setComment("");
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount =
        direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="mt-20 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Customer Reviews
        </h2>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }).map((_, idx) => (
              <FaStar
                key={idx}
                className={`h-6 w-6 ${
                  idx < Math.round(averageRating) ? "fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-lg text-gray-700 font-semibold">
            {averageRating.toFixed(1)} / 5{" "}
            <span className="text-gray-500 font-normal">
              ({reviews ? reviews.length : 0} reviews)
            </span>
          </span>
          <button
            onClick={() => setIsModalOpen(true)}
            className="ml-6 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Write a Review
          </button>
        </div>
      </div>

      {/* Loading/Error */}
      {isLoading && (
        <p className="text-gray-500 italic animate-pulse">Loading reviews...</p>
      )}
      {errorMessage && (
        <p className="text-red-600 font-medium">Error: {errorMessage}</p>
      )}

      {/* Carousel */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute -left-6 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition z-10"
        >
          <FaChevronLeft className="h-5 w-5 text-gray-700" />
        </button>

        {/* Scrollable Row */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        >
          {reviews &&
            reviews.map((review) => (
              <div
                key={review.reviewId}
                className="min-w-[320px] max-w-[320px] flex-shrink-0 p-6 border rounded-xl shadow bg-white hover:shadow-lg transition-transform transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <p className="font-bold text-gray-900 text-base">
                      {review.userName || "Anonymous"}
                    </p>
                    {review.verified && (
                      <span className="text-xs text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full font-medium">
                        Verified Buyer
                      </span>
                    )}
                  </div>
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }).map((_, starIdx) => (
                      <FaStar
                        key={starIdx}
                        className={`h-4 w-4 ${
                          starIdx < review.rating ? "fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {review.comment}
                </p>
              </div>
            ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute -right-6 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition z-10"
        >
          <FaChevronRight className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      {/* Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Write a Review</h3>
            <div className="flex gap-2 mb-4">
              {Array.from({ length: 5 }).map((_, idx) => (
                <FaStar
                  key={idx}
                  onClick={() => setRating(idx + 1)}
                  className={`h-7 w-7 cursor-pointer ${
                    idx < rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              className="w-full border rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-indigo-500 mb-6"
              rows={4}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ReviewsSection;
