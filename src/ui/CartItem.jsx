/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import DeleteItem from '../features/cart/DeleteItem';
import UpdateItemQuantity from '../features/cart/UpdateItemQuantity';
import { formatCurrency } from '../utils/helpers';
import { getCurrentQuantityById } from '../features/cart/cartSlice';

function CartItem({ item, type }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  if (type === 'order')
    return (
      <li className="flex items-center justify-between py-2 sm:ml-4">
        <p>
          {quantity}&times; {name}
        </p>
        <p className="font-semibold">{formatCurrency(totalPrice)}</p>
      </li>
    );

  if (type === 'cart')
    return (
      <li className="flex items-center justify-between py-2">
        <p>
          {quantity}&times; {name}
        </p>
        <div className="mr-4 flex items-center justify-between gap-4">
          <p className="font-semibold">{formatCurrency(totalPrice)}</p>
          <UpdateItemQuantity
            pizzaId={pizzaId}
            currentQuantity={currentQuantity}
          ></UpdateItemQuantity>
          <span className="flex items-center">
            <DeleteItem item={item}></DeleteItem>
          </span>
        </div>
      </li>
    );
}

export default CartItem;
