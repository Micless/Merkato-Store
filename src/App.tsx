import {ProductCard} from "./Component/ProductCard";

function App() {
  return (
    <div>
      <h1>Merkato Store</h1>
      <ProductCard name="Apple Laptop" price={999}/>
      <ProductCard name="Hp Laptop" price={699}/>
      <ProductCard name="Dell Desktop" price={399}/>
      <ProductCard name="Samsung Phone" price={499}/>
      <ProductCard name="Pone Charger" price={99}/>
    </div>
  );
}
export default App