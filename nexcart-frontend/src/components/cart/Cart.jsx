import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ItemContent from "./ItemContent";
import CartEmpty from "./CartEmpty";
import { formatPrice } from "../../utils/formatPrice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.carts);
  const newCart = { ...cart };

  newCart.totalPrice = cart?.reduce(
    (acc, cur) => acc + Number(cur?.specialPrice) * Number(cur?.quantity),
    0
  );

  if (!cart || cart.length === 0) return <CartEmpty />;

  return (
    <div className="lg:px-14 sm:px-8 px-4 py-10 bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
          <MdShoppingCart size={36} className="text-blue-600 animate-bounce" />
          Your Cart
        </h1>
        <p className="text-lg text-gray-600 mt-2">Review your selected items</p>
      </div>

      {/* Table Header (hidden on mobile) */}
      <div className="hidden md:grid md:grid-cols-5 gap-4 pb-4 font-semibold items-center border-b border-gray-200">
        <div className="md:col-span-2 justify-self-start text-lg text-slate-800 lg:ps-4">
          Product
        </div>
        <div className="justify-self-center text-lg text-slate-800">Price</div>
        <div className="justify-self-center text-lg text-slate-800">Quantity</div>
        <div className="justify-self-center text-lg text-slate-800">Total</div>
      </div>

      {/* Cart Items */}
      <div className="divide-y divide-gray-100">
        {cart.map((item, i) => (
          <ItemContent key={i} {...item} />
        ))}
      </div>

      {/* Subtotal + Actions */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 mt-6 pt-6 flex sm:flex-row sm:px-0 px-2 flex-col sm:justify-between gap-6 shadow-inner">
        <div></div>
        <div className="flex flex-col gap-3 w-full sm:w-[350px]">
          <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-md shadow-sm">
            <span className="text-gray-700 font-semibold">Subtotal</span>
            <span className="text-gray-900 font-bold text-lg">
              {formatPrice(newCart?.totalPrice)}
            </span>
          </div>

          <p className="text-slate-500 text-sm">
            Taxes and shipping calculated at checkout
          </p>

          <Link to="/checkout" className="w-full">
            <button
              className="w-full py-3 px-4 rounded-md bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-300"
            >
              <MdShoppingCart size={20} />
              Proceed to Checkout
            </button>
          </Link>

          <Link
            to="/products"
            className="flex gap-2 items-center justify-center text-blue-600 hover:underline transition"
          >
            <MdArrowBack />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
