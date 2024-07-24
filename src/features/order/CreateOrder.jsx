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
  const isSubmitting = state === 'submitting';
  console.log(state);

  const formErrors = useActionData();

  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="mt-4">Ready to order? Let&apos;s go!</h2>

      <Form method="POST">
        <div className="mb-4">
          <label className="">First Name</label>
          <div>
            <input className="input" type="text" name="customer" required />
          </div>
        </div>

        <div className="mb-4">
          <label className="">Phone number</label>
          <div>
            <input className="input" type="tel" name="phone" required />
          </div>
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>

        <div className="mb-4">
          <label className="">Address</label>
          <div>
            <input className="input" type="text" name="address" required />
          </div>
        </div>

        <div className="mb-4 flex items-center justify-center space-x-2">
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

        <div className="">
          <input
            className=""
            type="hidden"
            name="cart"
            value={JSON.stringify(cart)}
          ></input>
          <Button state={state}>
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
