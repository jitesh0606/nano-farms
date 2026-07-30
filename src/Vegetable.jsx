import potato from "./assets/potato.png";
import onion from "./assets/onion.png";
import tomato from "./assets/tomato.png";
import ginger from "./assets/ginger.png";

import ProductCard from "./components/ProductCard";

function Vegetables({
  goHome,
  cartCount,
  setCartCount,

  potatoCount,
  setPotatoCount,

  onionCount,
  setOnionCount,

  tomatoCount,
  setTomatoCount,

  gingerCount,
  setGingerCount,
}) {

  const vegetableProducts = [
    {
      id: 1,
      name: "Potato",
      image: potato,
      rating: 4.9,
      badge: "🔥 Best Seller",
      price: 50,
      count: potatoCount,
      setCount: setPotatoCount,
    },

    {
      id: 2,
      name: "Onion",
      image: onion,
      rating: 4.8,
      badge: "🌿 Organic",
      price: 50,
      count: onionCount,
      setCount: setOnionCount,
    },

    {
      id: 3,
      name: "Tomato",
      image: tomato,
      rating: 4.7,
      badge: "🥬 Fresh",
      price: 70,
      count: tomatoCount,
      setCount: setTomatoCount,
    },

    {
      id: 4,
      name: "Ginger",
      image: ginger,
      rating: 4.9,
      badge: "⭐ Premium",
      price: 30,
      count: gingerCount,
      setCount: setGingerCount,
    },
  ];

return (
  <div className="product-page">

    <button onClick={goHome}>
      ⬅ Back to Home
    </button>

    <h2>🛒 Cart ({cartCount})</h2>

    <h1>Fresh Vegetables</h1>

    <div className="products">

      {vegetableProducts.map((product) => (

        <ProductCard
          key={product.id}
          image={product.image}
          name={product.name}
          rating={product.rating}
          badge={product.badge}
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

export default Vegetables;
