import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from '../../ui/PizzaItem';

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const cart = fakeCart;

  return (
    <div className="ml-4 mt-2 md:text-xl">
      <LinkButton to={'/menu'}>Back to menu</LinkButton>

      <h2 className="mb-3 mt-8 text-xl font-semibold">Your cart, %NAME%</h2>

      <ul className="mb-2 min-w-72 max-w-full divide-y divide-slate-600 sm:max-w-[90dvh]">
        {cart.map((item) => (
          <CartItem key={item.pizzaId} item={item} type="cart" />
        ))}
      </ul>

      <div className="space-x-4">
        <Button type="small" to="/order/new">
          Order pizzas
        </Button>
        <Button type="secondary">Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
