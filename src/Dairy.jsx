import paneer from "./assets/paneer.png";
import curd from "./assets/curd.png";
import butter from "./assets/butter.png";

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
  setButterCount
}) {
  return (
    <div className="product-page">

      <button onClick={goHome}>
        ⬅ Back to Home
      </button>

      <h1>Dairy Products</h1>

      <div className="products">

       <div className="card">
  <img src={paneer} alt="Paneer" />
  <h3>Fresh Paneer</h3>
  <p>₹95 / kg</p>

  <div>
    <button
      onClick={() => {
        if (paneerCount > 0) {
          setPaneerCount(paneerCount - 1);
          setCartCount(cartCount - 1);
        }
      }}
    >
      -
    </button>

    <span style={{ margin: "0 10px" }}>
      {paneerCount}
    </span>

    <button
      onClick={() => {
        setPaneerCount(paneerCount + 1);
        setCartCount(cartCount + 1);
      }}
    >
      +
    </button>
  </div>
</div>

        

        <div className="card">
  <img src={curd} alt="Curd" />
  <h3>Fresh Curd</h3>
<p>₹30 / 250 gram</p>
  <div>
    <button
      onClick={() => {
        if (curdCount > 0) {
          setCurdCount(curdCount - 1);
          setCartCount(cartCount - 1);
        }
      }}
    >
      -
    </button>

    <span style={{ margin: "0 10px" }}>
      {curdCount}
    </span>

    <button
      onClick={() => {
        setCurdCount(curdCount + 1);
        setCartCount(cartCount + 1);
      }}
    >
      +
    </button>
  </div>
</div>

        <div className="card">
  <img src={butter} alt="White Butter" />
  <h3>White Butter</h3>
<p>₹300 / 500gm</p>
  <div>
    <button
      onClick={() => {
        if (butterCount > 0) {
          setButterCount(butterCount - 1);
          setCartCount(cartCount - 1);
        }
      }}
    >
      -
    </button>

    <span style={{ margin: "0 10px" }}>
      {butterCount}
    </span>

    <button
      onClick={() => {
        setButterCount(butterCount + 1);
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

export default Dairy;