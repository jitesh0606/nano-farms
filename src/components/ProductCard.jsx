import "./ProductCard.css";

function ProductCard({
  image,
  name,
  rating,
  badge,
  price,

  count,
  setCount,

  cartCount,
  setCartCount,
}) {

  const addItem = () => {
    setCount(count + 1);
    setCartCount(cartCount + 1);
  };

  const removeItem = () => {
    if (count > 0) {
      setCount(count - 1);
      setCartCount(cartCount - 1);
    }
  };

  return (

    <div className="product-card">

      <div className="product-image">

        <img
          src={image}
          alt={name}
        />

      </div>

      <div className="product-info">

        <h3 className="product-name">
          {name}
        </h3>

        <div className="product-badge">
          {badge}
        </div>

        <div className="product-rating">
          ⭐ {rating} Star
        </div>

        <select
          className="variant-select"
          defaultValue="1kg"
        >
          <option value="1kg">
            1 KG
          </option>

          <option value="2kg" disabled>
            2 KG (Coming Soon)
          </option>

          <option value="5kg" disabled>
            5 KG (Coming Soon)
          </option>
        </select>

        <div className="product-price">
          ₹{price}.00
        </div>
                {count === 0 ? (

          <button
            className="cart-button"
            onClick={addItem}
          >
            🛒 ADD TO CART
          </button>

        ) : (

       <div className="cart-quantity">

    <button
        className="qty-button"
        onClick={removeItem}
    >
        −
    </button>

    <span className="qty-number">
        {count}
    </span>

    <button
        className="qty-button"
        onClick={addItem}
    >
        +
    </button>

</div>

        )}

      </div>

    </div>

  );
}

export default ProductCard;