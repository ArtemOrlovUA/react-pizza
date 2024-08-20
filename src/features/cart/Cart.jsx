import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from '../../ui/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart } from './cartSlice';

function Cart() {
  const username = useSelector((state) => state.user.username);
  // const cart = fakeCart;
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  const handleClearCart = (e) => {
    e.preventDefault();
    dispatch(clearCart());
  };

  return (
    <div className="ml-4 mt-2 md:text-xl">
      <LinkButton to={'/menu'}>Back to menu</LinkButton>

      <h2 className="mb-3 mt-8 text-xl font-semibold">Your cart, {username}</h2>

      {cart.length > 0 ? (
        <ul className="mb-2 max-w-full divide-y divide-slate-600">
          {cart.map((item) => (
            <CartItem key={item.pizzaId} item={item} type="cart" />
          ))}
        </ul>
      ) : (
        <p className="my-4">Your cart is empty, add something to it!</p>
      )}

      {cart.length > 0 ? (
        <div className="space-x-4">
          <Button type="small" to="/order/new">
            Order pizzas
          </Button>
          <Button onClick={(e) => handleClearCart(e)} type="secondary">
            Clear cart
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default Cart;
