// Test ID: IIDSAT

import { useFetcher, useLoaderData } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import CartItem from '../cart/CartItem';
import { useEffect } from 'react';
import UpdateOrder from './UpdateOrder';

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const order = useLoaderData();
  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
    },
    [fetcher],
  );

  console.log(fetcher.data);

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="ml-4 mt-4 sm:text-xl">
      <div className="mr-4 flex flex-col items-start justify-between rounded-md bg-gray-200 p-2 md:flex-row">
        <h2 className="font-semibold">Status of order: #{id}</h2>

        <div className="mr-4 flex gap-2">
          {priority && (
            <div className="flex items-center">
              <span className="rounded-md bg-yellow-400 p-1 text-white">
                Priority
              </span>
            </div>
          )}

          <span className="rounded-md bg-green-400 p-1 text-white">
            <span className="capitalize">{status}</span> order
          </span>
        </div>
      </div>

      <div className="mr-4 mt-4 rounded-md bg-gray-200 p-2">
        {cart.map((item) => (
          <CartItem
            key={item.pizzaId}
            item={item}
            isLoadingIngredients={fetcher.state === 'loading'}
            ingredients={
              fetcher?.data?.find((el) => el.id === item.pizzaId)
                ?.ingredients ?? []
            }
            type="order"
          />
        ))}
      </div>

      <div className="mr-4 mt-4 rounded-md bg-gray-200 p-2 min-[850px]:flex min-[850px]:items-center min-[850px]:justify-between">
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p>
          (Estimated delivery:{' '}
          <span className="font-semibold">
            {formatDate(estimatedDelivery)}){' '}
          </span>
        </p>
      </div>

      <div className="mr-4 mt-4 rounded-md bg-gray-200 p-2">
        <p>
          Price pizza:
          <span className="font-semibold"> {formatCurrency(orderPrice)} </span>
        </p>
        {priority && (
          <p>
            Price priority:{' '}
            <span className="font-semibold">
              {formatCurrency(priorityPrice)}
            </span>
          </p>
        )}
      </div>
      <div className="my-4 mr-4 rounded-md bg-gray-200 p-2">
        <p className="">
          To pay on delivery:{' '}
          <span className="font-semibold">
            {' '}
            {formatCurrency(orderPrice + priorityPrice)}
          </span>{' '}
        </p>
      </div>
      <div className="my-4">{!priority && <UpdateOrder order={order} />}</div>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
