import { useState } from "react";
import cowMilk from "./assets/cowmilk.png";
import buffaloMilk from "./assets/buffalomilk.png";

function Milk({
  goHome,
  cartCount,
  setCartCount,
  rawMilkCount,
  setRawMilkCount,
  buffaloMilkCount,
  setBuffaloMilkCount
}){

  return (
    <div className="product-page">

      <button onClick={goHome}>
        ⬅ Back to Home
      </button>

      <h2>🛒 Cart ({cartCount})</h2>
      <h1>Milk Products</h1>

      <div className="products">

        <div className="card">
          <img src={cowMilk} alt="Raw Milk" />
          <h3>Raw Milk</h3>
          <p>₹80 / Litre</p>

          <div>
            <button
  onClick={() => {
    if(rawMilkCount > 0){
      setRawMilkCount(rawMilkCount - 1);
      setCartCount(cartCount - 1);
    }
  }}
>
  -
</button>

            <span style={{ margin: "0 10px" }}>
              {rawMilkCount}
            </span>

            <button
  onClick={() => {
    setRawMilkCount(rawMilkCount + 1);
    setCartCount(cartCount + 1);
  }}
>
  +
</button>
          </div>
        </div>

        <div className="card">
          <img src={buffaloMilk} alt="Raw Buffalo Milk" />
          <h3>Raw Buffalo Milk</h3>
          <p>₹90 / Litre</p>

          <div>
            <button
  onClick={() => {
    if (buffaloMilkCount > 0) {
      setBuffaloMilkCount(buffaloMilkCount - 1);
      setCartCount(cartCount - 1);
    }
  }}
>
  -
</button>

<span style={{ margin: "0 10px" }}>
  {buffaloMilkCount}
</span>

<button
  onClick={() => {
    setBuffaloMilkCount(buffaloMilkCount + 1);
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

export default Milk;