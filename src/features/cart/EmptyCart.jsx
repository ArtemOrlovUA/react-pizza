import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';

function EmptyCart() {
  return (
    <div className="ml-4 mt-4">
      <LinkButton to={'/menu'}>Back to menu</LinkButton>

      <p className="mt-4">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
