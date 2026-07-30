import ProductCard from "./components/ProductCard";

import vermicompost from "./assets/vermicompost.png";
import cowdung from "./assets/cowdung.png";
import neemcake from "./assets/neemcake.png";
import compost from "./assets/compost.png";

function Fertilizer({
  goHome,

  cartCount,
  setCartCount,

  vermicompostCount,
  setVermicompostCount,

  cowDungCount,
  setCowDungCount,

  neemCakeCount,
  setNeemCakeCount,

  compostCount,
  setCompostCount,
}) {

  const fertilizerProducts = [
    {
      image: vermicompost,
      name: "Vermicompost",
      badge: "🌱 Organic",
      rating: 4.9,
      price: 90,
      count: vermicompostCount,
      setCount: setVermicompostCount,
    },
    {
      image: cowdung,
      name: "Cow Dung Manure",
      badge: "🐄 Natural",
      rating: 4.8,
      price: 90,
      count: cowDungCount,
      setCount: setCowDungCount,
    },
    {
      image: neemcake,
      name: "Neem Cake",
      badge: "🌿 Premium",
      rating: 4.9,
      price: 100,
      count: neemCakeCount,
      setCount: setNeemCakeCount,
    },
    {
      image: compost,
      name: "Organic Compost",
      badge: "♻️ Eco",
      rating: 4.8,
      price: 100,
      count: compostCount,
      setCount: setCompostCount,
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
        🌱 Organic Fertilizers
      </h1>

      <div className="products">

        {fertilizerProducts.map((product, index) => (

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

export default Fertilizer;