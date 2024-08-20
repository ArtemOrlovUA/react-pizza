import { useState } from 'react';
import {
  Form,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useSelector } from 'react-redux';
import { clearCart, getCart, getTotalPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import store from '../../store';
import { formatCurrency } from '../../utils/helpers';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const { state } = useNavigation();
  const username = useSelector((state) => state.user.username);
  const isSubmitting = state === 'submitting';
  const [withPriority, setWithPriority] = useState(false);

  const formErrors = useActionData();

  const cartTotalPrice = useSelector(getTotalPrice);

  const priorityPrice = withPriority ? cartTotalPrice * 0.2 : 0;

  const endPrice = cartTotalPrice + priorityPrice;

  const cart = useSelector(getCart);

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="mx-auto max-w-3xl text-center md:text-xl">
      <h2 className="mb-4 mt-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      <Form method="POST" className="flex flex-col">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-center">
          <label className="">First Name</label>
          <div>
            <input
              className="input hover:w-92 w-54 transition-all"
              type="text"
              defaultValue={username}
              name="customer"
              required
            />
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-center">
          <label className="">Phone number</label>
          <div>
            <input className="input" type="tel" name="phone" required />
          </div>
          {formErrors?.phone && (
            <p className="rounded-md bg-red-400">{formErrors.phone}</p>
          )}
        </div>

        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-center">
          <label className="">Address</label>
          <div>
            <input className="input" type="text" name="address" required />
          </div>
        </div>

        <div className="mb-4 ml-2.5 flex items-center justify-center space-x-2 sm:ml-0">
          <input
            className="ml-4 h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 sm:mr-4"
            type="checkbox"
            name="priority"
            id="priority"
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">
            Do you want to give your order priority?
          </label>
        </div>

        <div className="mb-4">
          <input
            className=""
            type="hidden"
            name="cart"
            value={JSON.stringify(cart)}
          ></input>
          <Button type="primary" state={state}>
            {isSubmitting
              ? 'Submitting...'
              : `Order for ${formatCurrency(endPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on',
  };
  console.log(order);

  const errors = {};
  if (!isValidPhone(data.phone))
    errors.phone = 'Please, give us actual number to contact you';
  if (Object.keys(errors).length > 0) return errors;

  const req = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${req.id}`);
}

export default CreateOrder;
