function CartRow({
  emoji,
  name,
  price,
  count,
  setCount,
  cartCount,
  setCartCount,
}) {
  if (count === 0) return null;

  return (
    <div className="cart-item">

      <div className="cart-name">
        {emoji} {name}
      </div>

      <div className="cart-quantity">

        <button
          className="qty-btn"
          onClick={() => {
            if (count > 0) {
              setCount(count - 1);
              setCartCount(cartCount - 1);
            }
          }}
        >
          -
        </button>

        <span className="qty-box">
  {count}
</span>

        <button
          className="qty-btn"
          onClick={() => {
            setCount(count + 1);
            setCartCount(cartCount + 1);
          }}
        >
          +
        </button>

      </div>

      <div className="cart-price">
        ₹{count * price}
      </div>

    </div>
  );
}

export default CartRow;