/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import DeleteItem from './DeleteItem';
import UpdateItemQuantity from './UpdateItemQuantity';
import { formatCurrency } from '../../utils/helpers';
import { getCurrentQuantityById } from './cartSlice';

function CartItem({ item, type, isLoadingIngredients, ingredients }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  if (type === 'order')
    return (
      <li className="flex items-center justify-between py-2">
        <p>
          <span className="font-semibold">
            {quantity}&times; {name}
          </span>
          <p className="capitalize">
            {isLoadingIngredients ? 'loading' : ingredients?.join(', ')}{' '}
          </p>
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
