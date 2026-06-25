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
  setCompostCount
})  {
  return (
  <div className="product-page">
    <button onClick={goHome}>
      ⬅ Back to Home
    </button>

    <h2>🛒 Cart ({cartCount})</h2>
    <h1>Organic Fertilizers</h1>

    <div className="products">

      <div className="card">
        <img src={vermicompost} alt="Vermicompost" />
        <h3>Vermicompost</h3>
        <p>₹90 / kg</p>
        <div>
          <button
            onClick={() => {
              if (vermicompostCount > 0) {
                setVermicompostCount(vermicompostCount + 1);
                setCartCount(cartCount + 1);
              }
            }}
          >
            -
          </button>

          <span style={{ margin: "0 10px" }}>
            {vermicompostCount}
          </span>

          <button
  onClick={() => {
    if (vermicompostCount > 0) {
      setVermicompostCount(vermicompostCount - 1);
      setCartCount(cartCount - 1);
    }
  }}
>
  -
</button>

<span style={{ margin: "0 10px" }}>
  {vermicompostCount}
</span>

<button
  onClick={() => {
    setVermicompostCount(vermicompostCount + 1);
    setCartCount(cartCount + 1);
  }}
>
  +
</button>
        </div>
      </div>

      <div className="card">
        <img src={cowdung} alt="Cow Dung Manure" />
        <h3>Cow Dung Manure</h3>
         <p>₹90 / kg</p>
        <div>
          <button
            onClick={() => {
              if (cowDungCount > 0) {
                setCowDungCount(cowDungCount + 1);
                setCartCount(cartCount + 1);
              }
            }}
          >
            -
          </button>

          <span style={{ margin: "0 10px" }}>
            {cowDungCount}
          </span>

          <button
            onClick={() => {
              setCowDungCount(cowDungCount + 1);
              setCartCount(cartCount + 1);
            }}
          >
            +
          </button>
        </div>
      </div>

      <div className="card">
        <img src={neemcake} alt="Neem Cake" />
        <h3>Neem Cake</h3>
        <p>₹100 / kg</p>
        <div>
          <button
            onClick={() => {
              if (neemCakeCount > 0) {
                setNeemCakeCount(neemCakeCount - 1);
                setCartCount(cartCount - 1);
              }
            }}
          >
            -
          </button>

          <span style={{ margin: "0 10px" }}>
            {neemCakeCount}
          </span>

          <button
            onClick={() => {
              setNeemCakeCount(neemCakeCount + 1);
              setCartCount(cartCount + 1);
            }}
          >
            +
          </button>
        </div>
      </div>

      <div className="card">
        <img src={compost} alt="Organic Compost" />
        <h3>Organic Compost</h3>
        <p>₹100 / kg</p>
        <div>
          <button
            onClick={() => {
              if (compostCount > 0) {
                setCompostCount(compostCount - 1);
                setCartCount(cartCount - 1);
              }
            }}
          >
            -
          </button>

          <span style={{ margin: "0 10px" }}>
            {compostCount}
          </span>

          <button
            onClick={() => {
              setCompostCount(compostCount + 1);
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

export default Fertilizer;