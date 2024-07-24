import { Link } from 'react-router-dom';

function CartOverview() {
  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 text-sm font-semibold uppercase text-stone-300 md:text-lg">
      <p className="space-x-4">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link className="text-stone-200" to="/cart">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
