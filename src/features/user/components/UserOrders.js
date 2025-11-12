import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLoggedInUserOrderAsync,
  selectUserInfoStatus,
  selectUserOrders,
} from "../userSlice";
import { discountedPrice } from "../../../app/constants";
import { Grid } from "react-loader-spinner";

export default function UserOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);
  const status = useSelector(selectUserInfoStatus);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync());
  }, [dispatch]);

  return (
    <div className="px-2 sm:px-4">
      {orders &&
        orders.map((order) => (
          <div key={order.id} className="my-8">
            <div>
              <div className="mx-auto mt-8 bg-white max-w-2xl md:max-w-4xl min-w-0 px-2 sm:px-4 md:px-6 lg:px-8 rounded-xl shadow-md">
                <div className="border-t border-gray-200 px-2 sm:px-4 py-4 sm:py-6">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl my-2 sm:my-5 font-bold tracking-tight text-gray-900">
                    Order # {order.id}
                  </h1>
                  <h3 className="text-lg sm:text-xl my-2 sm:my-5 font-bold tracking-tight text-red-900">
                    Order Status : {order.status}
                  </h3>
                  <div className="flow-root">
                    <ul className="-my-6 divide-y divide-gray-200">
                      {order.items.map((item) => (
                        <li
                          key={item.id}
                          className="flex flex-col sm:flex-row py-4 sm:py-6 gap-y-4"
                        >
                          <div className="h-28 w-full sm:w-24 sm:h-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mx-auto sm:mx-0">
                            <img
                              src={item.product.thumbnail}
                              alt={item.product.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="sm:ml-4 flex flex-1 flex-col justify-between">
                            <div>
                              <div className="flex flex-col sm:flex-row justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a
                                    href={item.product.id}
                                    className="break-words"
                                  >
                                    {item.product.title}
                                  </a>
                                </h3>
                                <p className="sm:ml-4 mt-2 sm:mt-0">
                                  ${discountedPrice(item.product)}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.product.brand}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm mt-2">
                              <div className="text-gray-500">
                                <label
                                  htmlFor="quantity"
                                  className="inline mr-3 sm:mr-5 text-sm font-medium leading-6 text-gray-900"
                                >
                                  Qty :{item.quantity}
                                </label>
                              </div>
                              <div className="flex"></div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-2 sm:px-4 py-4 sm:py-6">
                  <div className="flex flex-col sm:flex-row justify-between my-1 sm:my-2 text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p className="mt-1 sm:mt-0">$ {order.totalAmount}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between my-1 sm:my-2 text-base font-medium text-gray-900">
                    <p>Total Items in Cart</p>
                    <p className="mt-1 sm:mt-0">{order.totalItems} items</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping Address :
                  </p>
                  <div className="flex flex-col sm:flex-row justify-between gap-y-4 gap-x-6 px-2 py-3 sm:px-5 sm:py-5 border-solid border-2 border-gray-200 rounded-md mt-2">
                    <div className="flex gap-x-2">
                      <div className="min-w-0 flex-auto">
                        <p className="text-base font-semibold leading-6 text-gray-900">
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
                    <div className="flex flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        Phone: {order.selectedAddress.phone}
                      </p>
                      <p className="text-sm leading-6 text-gray-500">
                        {order.selectedAddress.city}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      {status === "loading" ? (
        <div className="flex justify-center items-center mt-8">
          <Grid
            height="64"
            width="64"
            color="rgb(79, 70, 229)"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : null}
    </div>
  );
}
