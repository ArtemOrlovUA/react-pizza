import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCart, getTotalPrice, getTotalQuantity } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
  const cart = useSelector(getCart);
  const totalQuantity = useSelector(getTotalQuantity);
  const totalPrice = useSelector(getTotalPrice);

  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 text-sm font-semibold uppercase text-stone-300 md:text-lg">
      <p className="space-x-4">
        <span>
          {' '}
          {totalQuantity}
          {cart.length > 1 || cart.length === 0 ? ' pizzas' : ' pizza'}
        </span>
        <span>Total: {formatCurrency(totalPrice)}</span>
      </p>
      <Link className="text-stone-200" to="/cart">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
