
import potato from "./assets/potato.png";
import onion from "./assets/onion.png";
import tomato from "./assets/tomato.png";
import ginger from "./assets/ginger.png";

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
  return (
  <div className="product-page">
    <button onClick={goHome}>
      ⬅ Back to Home
    </button>

    <h2>🛒 Cart ({cartCount})</h2>
    <h1>Fresh Vegetables</h1>

    <div className="products">

      <div className="card">
        <img src={potato} alt="Potato" />
        <h3>Potato</h3>
        <p>₹50 / kg</p>

        <div>
          <button
            onClick={() => {
              if (potatoCount > 0) {
                setPotatoCount(potatoCount - 1);
                setCartCount(cartCount - 1);
              }
            }}
          >
            -
          </button>

          <span style={{ margin: "0 10px" }}>
            {potatoCount}
          </span>

          <button
            onClick={() => {
              setPotatoCount(potatoCount + 1);
              setCartCount(cartCount + 1);
            }}
          >
            +
          </button>
        </div>
      </div>

      <div className="card">
        <img src={onion} alt="Onion" />
        <h3>Onion</h3>
        <p>₹50 / kg</p>
        <div>
          <button
            onClick={() => {
              if (onionCount > 0) {
                setOnionCount(onionCount - 1);
                setCartCount(cartCount - 1);
              }
            }}
          >
            -
          </button>

          <span style={{ margin: "0 10px" }}>
            {onionCount}
          </span>

          <button
            onClick={() => {
              setOnionCount(onionCount + 1);
              setCartCount(cartCount + 1);
            }}
          >
            +
          </button>
        </div>
      </div>

      <div className="card">
        <img src={tomato} alt="Tomato" />
        <h3>Tomato</h3>
        <p>₹70 / kg</p>
        <div>
          <button
            onClick={() => {
              if (tomatoCount > 0) {
                setTomatoCount(tomatoCount - 1);
                setCartCount(cartCount - 1);
              }
            }}
          >
            -
          </button>

          <span style={{ margin: "0 10px" }}>
            {tomatoCount}
          </span>

          <button
            onClick={() => {
              setTomatoCount(tomatoCount + 1);
              setCartCount(cartCount + 1);
            }}
          >
            +
          </button>
        </div>
      </div>

      <div className="card">
        <img src={ginger} alt="Ginger" />
        <h3>Ginger</h3>
        <p>₹30 / kg</p>
        <div>
          <button
            onClick={() => {
              if (gingerCount > 0) {
                setGingerCount(gingerCount - 1);
                setCartCount(cartCount - 1);
              }
            }}
          >
            -
          </button>

          <span style={{ margin: "0 10px" }}>
            {gingerCount}
          </span>

          <button
            onClick={() => {
              setGingerCount(gingerCount + 1);
              setCartCount(cartCount + 1);
            }}
          >
            +
          </button>
        </div>
      </div>

    </div>
  </div>
);
}

export default Vegetables;