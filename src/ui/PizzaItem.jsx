/* eslint-disable react/prop-types */
import Button from './Button';
import { formatCurrency } from '../utils/helpers';

function CartItem({ item, type }) {
  const { pizzaId, name, quantity, totalPrice } = item;

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
      <li className="flex items-center justify-between py-2 sm:ml-4">
        <p>
          {quantity}&times; {name}
        </p>
        <div className="mr-3 flex items-center gap-4">
          <p className="font-semibold">{formatCurrency(totalPrice)}</p>
          <Button type="small">Remove</Button>
        </div>
      </li>
    );
}

export default CartItem;
