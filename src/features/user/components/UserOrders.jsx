import { useSelector, useDispatch } from "react-redux";
import {
  fetcheLoggedInUserOrdersAsync,
  selectUserOrder,
} from "../userSlice";
import { useEffect } from "react";


export default function UserOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrder);

  useEffect(() => {
    dispatch(fetcheLoggedInUserOrdersAsync());
  }, [dispatch]);

  return (
    <div>
      {orders && orders.map((order) => (
        <div className="mx-auto max-w-7xl px-4 mt-12  bg-white py-6 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Order #{order.id}
            </h1>
            <h3 className="text-xl my-5 text-red-900 font-bold">
              Order Status:{order.status}
            </h3>
            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          alt={item.product.title}
                          src={item.product.thumbnail}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={item.product.id}>{item.product.title}</a>
                            </h3>
                            <p className="ml-4">${item.product.discountPrice}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.product.brand}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label
                              htmlFor="quantity"
                              className="inline text-sm font-medium leading-6 text-gray-900"
                            >
                              Qty:{item.quantity}
                            </label>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${order.totalAmount}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total Items in Cart</p>
                <p>{order.totalItems} items</p>
              </div>
              <p>Shipping Address:</p>
              <div className="flex justify-between gap-x-6 py-5 px-5 border-solid border-2 border-gray-200">
                <div className="flex gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {order.selectedAddress.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {order.selectedAddress.street}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {order.selectedAddress.pinCode}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    {order.selectedAddress.phone}
                  </p>
                  <p className="text-sm leading-6 text-gray-900">
                    {order.selectedAddress.city}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
