import { useState } from "react";
import { MdClose } from "react-icons/md";

function ProductGallery({ image }) {
  const mainImage = image; // single image
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Hero Product Image */}
      <div
        className="relative w-full bg-gradient-to-br from-indigo-50 via-white to-rose-50 rounded-2xl shadow-lg p-6 cursor-zoom-in group"
        onClick={() => setLightboxOpen(true)}
      >
        <img
          src={`${import.meta.env.VITE_NEXCART_BACKEND_BASE_URL}/uploads/images/${mainImage}`}
          alt="Product"
          className="rounded-xl object-contain w-full h-[420px] transition-transform duration-500 group-hover:scale-105"
        />
        {/* Decorative overlay */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-t from-black/5 via-transparent to-transparent"></div>
      </div>

      {/* Caption */}
      <p className="text-sm text-gray-500">Click image to enlarge</p>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fadeIn"
          onClick={() => setLightboxOpen(false)} // click outside closes modal
        >
          <div className="relative max-h-[90%] max-w-[90%]">
            {/* Enlarged Image */}
            <img
              src={`${import.meta.env.VITE_NEXCART_BACKEND_BASE_URL}/uploads/images/${mainImage}`}
              alt="Enlarged product"
              className="object-contain rounded-lg shadow-2xl transition-transform duration-500 hover:scale-105"
            />

            {/* Close Button overlaying the image */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent closing when clicking button itself
                setLightboxOpen(false);
              }}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/70 hover:bg-black/90 transition shadow-lg z-50"
              aria-label="Close"
            >
              <MdClose className="text-white text-2xl" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default ProductGallery;
