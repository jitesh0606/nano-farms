import ProductCard from "./components/ProductCard";

import cowMilk from "./assets/cowmilk.png";
import buffaloMilk from "./assets/buffalomilk.png";

function Milk({
  goHome,

  cartCount,
  setCartCount,

  rawMilkCount,
  setRawMilkCount,

  buffaloMilkCount,
  setBuffaloMilkCount,
}) {

  const milkProducts = [
    {
      image: cowMilk,
      name: "Raw Milk",
      badge: "🥛 Fresh",
      rating: 4.9,
      price: 80,
      count: rawMilkCount,
      setCount: setRawMilkCount,
    },
    {
      image: buffaloMilk,
      name: "Raw Buffalo Milk",
      badge: "⭐ Premium",
      rating: 4.8,
      price: 90,
      count: buffaloMilkCount,
      setCount: setBuffaloMilkCount,
    },
  ];

  return (
    <div className="product-page">

      <button
        className="back-button"
        onClick={goHome}
      >
        ⬅ Back to Home
      </button>

      <h2 className="cart-heading">
        🛒 Cart ({cartCount})
      </h2>

      <h1 className="page-title">
        🥛 Milk Products
      </h1>

      <div className="products">

        {milkProducts.map((product, index) => (

          <ProductCard
            key={index}

            image={product.image}
            name={product.name}
            badge={product.badge}
            rating={product.rating}
            price={product.price}

            count={product.count}
            setCount={product.setCount}

            cartCount={cartCount}
            setCartCount={setCartCount}
          />

        ))}

      </div>

    </div>
  );
}

export default Milk;