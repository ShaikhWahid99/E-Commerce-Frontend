import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductByIdAsync,
  selectProductById,
  selectProductListStatus,
} from "../productSlice";
import { useParams } from "react-router-dom";
import { addToCartAsync, selectItems } from "../../cart/cartSlice";
import { selectLoggedInUser } from "../../auth/authSlice";
import { discountedPrice } from "../../../app/constants";
import { useAlert } from "react-alert";
import { Grid } from "react-loader-spinner";

const highlights = [
  "Hand cut and sewn locally",
  "Dyed with our proprietary colors",
  "Pre-washed & pre-shrunk",
  "Ultra-soft 100% cotton",
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const items = useSelector(selectItems);
  const product = useSelector(selectProductById);
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();
  const status = useSelector(selectProductListStatus);

  const handleCart = (e) => {
    e.preventDefault();
    if (items.findIndex((item) => item.product.id === product.id) < 0) {
      const newItem = {
        product: product.id,
        quantity: 1,
      };
      if (selectedColor) {
        newItem.color = selectedColor;
      }
      if (selectedSize) {
        newItem.size = selectedSize;
      }
      dispatch(addToCartAsync(newItem));
      alert.success("Item added to Cart");
    } else {
      alert.error("Item Already added");
    }
  };

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  return (
    <div className="bg-white">
      {status === "loading" ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Grid
            height="80"
            width="80"
            color="rgb(79, 70, 229)"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : null}
      {product && (
        <div className="pt-4 sm:pt-6">
          <nav aria-label="Breadcrumb" className="mb-2">
            <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8 overflow-x-auto whitespace-nowrap">
              {product.breadcrumbs &&
                product.breadcrumbs.map((breadcrumb) => (
                  <li key={breadcrumb.id}>
                    <div className="flex items-center">
                      <a
                        href={breadcrumb.href}
                        className="mr-2 text-sm font-medium text-gray-900"
                      >
                        {breadcrumb.name}
                      </a>
                      <svg
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-4 text-gray-300"
                      >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </div>
                  </li>
                ))}
              <li className="text-sm">
                <a
                  href={product.href}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product.title}
                </a>
              </li>
            </ol>
          </nav>

          {/* Responsive Image gallery */}
          <div className="mx-auto mt-4 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 w-full">
            {/* Mobile image carousel */}
            <div className="block lg:hidden">
              <div className="flex space-x-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {product.images &&
                  product.images.map((img, idx) => (
                    <div
                      className="shrink-0 w-44 h-44 rounded-lg overflow-hidden border border-gray-200"
                      key={img + idx}
                    >
                      <img
                        src={img}
                        alt={product.title}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  ))}
              </div>
            </div>
            {/* Desktop image gallery */}
            <div className="hidden lg:grid lg:grid-cols-3 lg:gap-x-8">
              <div className="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="grid grid-cols-1 gap-y-8">
                <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                  <img
                    src={product.images[1]}
                    alt={product.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                  <img
                    src={product.images[2]}
                    alt={product.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="aspect-w-4 aspect-h-5 lg:aspect-w-3 lg:aspect-h-4 overflow-hidden rounded-lg">
                <img
                  src={product.images[3]}
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* Product info - responsive two column on desktop, single on mobile */}
          <div className="mx-auto max-w-2xl px-4 pb-10 pt-6 sm:px-6 lg:max-w-7xl lg:px-8 lg:pt-10 lg:pb-24 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
            {/* Title section */}
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className="flex items-center gap-3">
                <p className="text-base sm:text-xl line-through tracking-tight text-gray-900 opacity-70">
                  ${product.price}
                </p>
                <p className="text-xl sm:text-2xl md:text-3xl tracking-tight text-gray-900 font-bold">
                  ${discountedPrice(product)}
                </p>
              </div>

              {/* Reviews */}
              <div className="mt-4">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="ml-2 text-xs text-gray-500">
                    {product.rating} / 5
                  </p>
                </div>
              </div>

              <form className="mt-8">
                {/* Colors */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Color</h3>
                    <RadioGroup
                      value={selectedColor}
                      onChange={setSelectedColor}
                      className="mt-2"
                    >
                      <RadioGroup.Label className="sr-only">
                        Choose a color
                      </RadioGroup.Label>
                      <div className="flex flex-wrap gap-2">
                        {product.colors.map((color, index) => (
                          <RadioGroup.Option
                            key={color.name || `color-${index}`}
                            value={color}
                            className={({ active, checked }) =>
                              classNames(
                                color.selectedClass,
                                active && checked ? "ring ring-offset-1" : "",
                                !active && checked ? "ring-2" : "",
                                "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                              )
                            }
                          >
                            <RadioGroup.Label as="span" className="sr-only">
                              {color.name}
                            </RadioGroup.Label>
                            <span
                              aria-hidden="true"
                              className={classNames(
                                color.class,
                                "h-8 w-8 rounded-full border border-black border-opacity-10"
                              )}
                            />
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Sizes (still commented out) */}

                <button
                  onClick={handleCart}
                  type="submit"
                  className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to Cart
                </button>
              </form>
            </div>

            {/* Description/Details Section */}
            <div className="py-8 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>

              {product.highlights && (
                <div className="mt-8">
                  <h3 className="text-sm font-medium text-gray-900">
                    Highlights
                  </h3>
                  <div className="mt-2">
                    <ul
                      role="list"
                      className="list-disc space-y-2 pl-4 text-sm"
                    >
                      {product.highlights.map((highlight) => (
                        <li key={highlight} className="text-gray-400">
                          <span className="text-gray-600">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="mt-8">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>
                <div className="mt-2 space-y-6">
                  <p className="text-sm text-gray-600">{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
