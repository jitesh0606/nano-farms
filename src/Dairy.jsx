import ProductCard from "./components/ProductCard";

import paneer from "./assets/paneer.png";
import curd from "./assets/curd.png";
import butter from "./assets/butter.png";
import ghee from "./assets/ghee.png";

function Dairy({
  goHome,

  cartCount,
  setCartCount,

  paneerCount,
  setPaneerCount,

  gheeCount,
  setGheeCount,

  curdCount,
  setCurdCount,

  butterCount,
  setButterCount,
}) {

  const dairyProducts = [
    {
      image: paneer,
      name: "Fresh Paneer",
      badge: "🧀 Fresh",
      rating: 4.9,
      price: 95,
      count: paneerCount,
      setCount: setPaneerCount,
    },
    {
      image: ghee,
      name: "Pure Desi Ghee",
      badge: "⭐ Premium",
      rating: 5.0,
      price: 650,
      count: gheeCount,
      setCount: setGheeCount,
    },
    {
      image: curd,
      name: "Fresh Curd",
      badge: "🥣 Homemade",
      rating: 4.8,
      price: 30,
      count: curdCount,
      setCount: setCurdCount,
    },
    {
      image: butter,
      name: "White Butter",
      badge: "🧈 Fresh",
      rating: 4.9,
      price: 300,
      count: butterCount,
      setCount: setButterCount,
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
        🥛 Dairy Products
      </h1>

      <div className="products">

        {dairyProducts.map((product, index) => (

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

export default Dairy;