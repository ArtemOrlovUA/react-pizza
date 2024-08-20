/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { addItem, getCurrentQuantityById } from '../cart/cartSlice';
import DeleteItem from '../cart/DeleteItem';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const curentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = curentQuantity > 0;

  function handleAddToCart(e) {
    e.preventDefault();

    const newPizza = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(newPizza));
  }

  return (
    <li className="flex min-h-[129px] w-full gap-2 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-60 grayscale' : ''}`}
      />
      <div className="flex flex-col">
        <p className="font-semibold">{name}</p>
        <p className="text-sm capitalize italic">{ingredients.join(', ')}</p>
        <div className="mt-1 flex max-h-[45px] flex-row items-center">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm uppercase">Sold out</p>
          )}

          <span className="ml-4">
            {isInCart && (
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={curentQuantity}
              />
            )}
          </span>

          {curentQuantity > 0 && (
            <div className="ml-4">
              <DeleteItem item={{ ...pizza, pizzaId: pizza.id }} />
            </div>
          )}
          {!soldOut && curentQuantity === 0 && (
            <div className="justify-center pl-4">
              <Button type="small" onClick={(e) => handleAddToCart(e)}>
                Add to cart
              </Button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
