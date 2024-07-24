/* eslint-disable react/prop-types */
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  return (
    <li className="flex gap-2 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-60 grayscale' : ''}`}
      />
      <div className="flex flex-col">
        <p className="font-semibold">{name}</p>
        <p className="text-sm capitalize italic">{ingredients.join(', ')}</p>
        <div className="mt-auto flex flex-row items-center">
          {!soldOut ? (
            <p className="">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm uppercase">Sold out</p>
          )}
          <div className="mb-3 justify-center pl-4 pt-4">
            <Button type="small" to={`/menu/${id}`} disabled={soldOut}>
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
