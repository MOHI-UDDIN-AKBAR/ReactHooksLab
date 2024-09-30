import { useEffect, useReducer, useState } from 'react';

const PRODUCT_API_URL = 'https://jsonplaceholder.typicode.com/photos';
const MAX_PRODUCT_PRICE = 1000;
const MIN_PRODUCT_PRICE = 100;

type ProductType = {
  albumId?: number;
  id: number;
  title: string;
  url: string;
  price: number;
  thumbnailUrl?: string;
};

type CartItem = { product: ProductType; productQuantity: number }[];

type CardDetailsType = {
  totalQuantity: number;
  totalPrice: number;
  cartItems: CartItem;
};

type AddProductAction = {
  type: 'ADD_PRODUCT';
  product: ProductType;
};

type RemoveProductAction = {
  type: 'REMOVE_PRODUCT';
  id: number;
};
type IncreaseProductAction = {
  type: 'INCREASE_PRODUCT_QUANTITY';
  id: number;
};
type DecreaseProductAction = {
  type: 'DECREASE_PRODUCT_QUANTITY';
  id: number;
};

type CartActions =
  | AddProductAction
  | IncreaseProductAction
  | DecreaseProductAction
  | RemoveProductAction;

const initialState: CardDetailsType = {
  totalQuantity: 0,
  totalPrice: 0,
  cartItems: [],
};

const reducer = (
  state: CardDetailsType,
  action: CartActions
): CardDetailsType => {
  const { cartItems, totalQuantity, totalPrice } = state;

  switch (action.type) {
    case 'ADD_PRODUCT': {
      const { product } = action;

      const isProductExistInCart = (): boolean => {
        return cartItems.some(({ product: { id } }) => id === product.id);
      };

      const incrementProductQuantity = () => {
        return cartItems.map((item) =>
          item.product.id === product.id
            ? { ...item, productQuantity: item.productQuantity + 1 }
            : item
        );
      };

      const updatedCartItems = isProductExistInCart()
        ? incrementProductQuantity()
        : [
            ...cartItems,
            {
              product,
              productQuantity: 1,
            },
          ];

      const updatedState = {
        ...state,
        totalQuantity: totalQuantity + 1,
        totalPrice: totalPrice + product.price,
        cartItems: updatedCartItems,
      };

      return updatedState;
    }

    case 'INCREASE_PRODUCT_QUANTITY': {
      let currentProductPrice: number = 0;

      const updatedCartItems = cartItems.map((item) => {
        if (item.product.id === action.id) {
          currentProductPrice = item.product.price;
          return { ...item, productQuantity: item.productQuantity + 1 };
        }
        return item;
      });

      return {
        ...state,
        totalQuantity: totalQuantity + 1,
        totalPrice: totalPrice + currentProductPrice,
        cartItems: updatedCartItems,
      };
    }

    case 'DECREASE_PRODUCT_QUANTITY': {
      let priceDecrement: number = 0;

      const updatedCartItems = cartItems.reduce((acc, item) => {
        if (item.product.id === action.id) {
          priceDecrement = item.product.price;

          item.productQuantity > 1 &&
            acc.push({ ...item, productQuantity: item.productQuantity - 1 });
        } else {
          acc.push(item);
        }
        return acc;
      }, [] as CartItem);

      return {
        ...state,
        totalQuantity: totalQuantity - 1,
        totalPrice: totalPrice - priceDecrement,
        cartItems: updatedCartItems,
      };
    }

    case 'REMOVE_PRODUCT': {
      const productToRemove = cartItems.find(
        (item) => item.product.id === action.id
      );

      const updatedCartItems = cartItems.filter(
        (item) => item.product.id !== action.id
      );

      const priceReduction =
        (productToRemove?.product.price ?? 0) *
        (productToRemove?.productQuantity ?? 0);

      return {
        ...state,
        totalQuantity: totalQuantity - (productToRemove?.productQuantity ?? 0),
        totalPrice: totalPrice - priceReduction,
        cartItems: updatedCartItems,
      };
    }

    default: {
      return state;
    }
  }
};

const generateRandomProductPrice = (): number =>
  Math.floor(
    Math.random() * (MAX_PRODUCT_PRICE - MIN_PRODUCT_PRICE + 1) +
      MIN_PRODUCT_PRICE
  );

const addProductToCart = (product: ProductType): AddProductAction => ({
  type: 'ADD_PRODUCT',
  product: product,
});

const removeProductFromCart = (id: number): RemoveProductAction => ({
  type: 'REMOVE_PRODUCT',
  id: id,
});

const increaseProductQuantity = (id: number): IncreaseProductAction => ({
  type: 'INCREASE_PRODUCT_QUANTITY',
  id,
});

const decreaseProductQuantity = (id: number): DecreaseProductAction => ({
  type: 'DECREASE_PRODUCT_QUANTITY',
  id,
});

const Products = ({
  product: { id, title, url, price },
  isInCart,
  dispatch,
  productQuantity,
}: {
  product: ProductType;
  dispatch: React.Dispatch<CartActions>;
  isInCart?: boolean;
  productQuantity?: number;
}) => {
  const formateTitle = (title: string): string => {
    return title.length > 20
      ? `${title.charAt(0).toUpperCase()}${title.substring(1, 20)}...`
      : `${title.charAt(0).toUpperCase()}${title.substring(1)}`;
  };

  return (
    <article className="products">
      <div className="product" key={id}>
        <h4 className="product-title">{formateTitle(title)}</h4>
        <img
          src={url}
          alt={title}
          width={150}
          height={100}
          className="product-image"
        />
        {!isInCart && (
          <button
            type="button"
            className="add-to-card-btn"
            onClick={() =>
              dispatch(addProductToCart({ id, title, price, url }))
            }
          >
            Add to card
          </button>
        )}
        {isInCart && (
          <div className="cart-controls">
            <div className="cart-quantity-controls">
              <button
                type="button"
                className="decrease-product-btn"
                onClick={() => dispatch(decreaseProductQuantity(id))}
              >
                <strong>-</strong>
              </button>
              <strong className="product-quantity">{productQuantity}</strong>
              <button
                type="button"
                className="increase-product-btn"
                onClick={() => dispatch(increaseProductQuantity(id))}
              >
                <strong>+</strong>
              </button>
            </div>
            <button
              type="button"
              className="remove-from-card__btn"
              onClick={() => dispatch(removeProductFromCart(id))}
            >
              Remove Product
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

const CardSummary = ({
  cardDetails,
  dispatch,
}: {
  dispatch: React.Dispatch<CartActions>;
  cardDetails: CardDetailsType | null;
}) => {
  if (!cardDetails) return null;
  const { cartItems, totalQuantity, totalPrice } = cardDetails;
  return (
    <article className="cart-summary">
      <div className="cart-summary-header">
        <strong>Total Items : {totalQuantity}</strong>
        <strong>Total Price : {totalPrice} </strong>
      </div>
      <article className="cart-items">
        {cartItems.map(({ product, productQuantity }) => (
          <Products
            key={product.id}
            product={product}
            isInCart={true}
            productQuantity={productQuantity}
            dispatch={dispatch}
          />
        ))}
      </article>
    </article>
  );
};

const JustPracticeFour = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [products, setProducts] = useState<ProductType[]>([]);
  const [cardDetails, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchProductsData = async () => {
      setIsLoading(true);
      setError('');
      try {
        const res = await fetch(PRODUCT_API_URL);
        if (!res.ok) throw new Error('Failed to fetch Products data.');
        const data = await res.json();
        setProducts(
          data.slice(0, 20).map((item: ProductType) => ({
            ...item,
            price: generateRandomProductPrice(),
          }))
        );
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductsData();
  }, []);

  return (
    <div className="container product-page">
      <div className="card-details">
        <CardSummary cardDetails={cardDetails} dispatch={dispatch} />
      </div>
      <div className="products-list">
        <div className="status">
          {isLoading && (
            <h1
              style={{
                border: '2px solid blue',
                margin: '1rem',
                padding: '1rem',
              }}
            >
              Loading...
            </h1>
          )}
          {error && (
            <h1
              style={{
                border: '2px solid blue',
                margin: '1rem',
                padding: '1rem',
              }}
            >
              {error}
            </h1>
          )}
        </div>
        <article className="products">
          {products.map((product) => (
            <Products product={product} dispatch={dispatch} key={product.id} />
          ))}
        </article>
      </div>
    </div>
  );
};

export default JustPracticeFour;
