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

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

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

function CreateOrder() {
  const { state } = useNavigation();
  const username = useSelector((state) => state.user.username);
  const isSubmitting = state === 'submitting';
  console.log(state);

  const formErrors = useActionData();

  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    <div className="mx-auto max-w-3xl text-center md:text-xl">
      <h2 className="mb-4 mt-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      <Form method="POST">
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
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
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
            {isSubmitting ? 'Submitting...' : 'Order now!'}
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

  const errors = {};
  if (!isValidPhone(data.phone))
    errors.phone = 'Please, give us actual number to contact you';
  if (Object.keys(errors).length > 0) return errors;

  const req = await createOrder(order);

  return redirect(`/order/${req.id}`);
}

export default CreateOrder;
