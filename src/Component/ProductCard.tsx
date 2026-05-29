interface ProductCardProps {
    name: string;
    price: number;
}
export const ProductCard = ({ name, price }: ProductCardProps) => {
    return (
        <div style={{ border: '1px solid #f305d3', padding: '5px', margin: '10px' }}>
      <h2>{name}</h2> 
      <p>price: ${price}</p>
        </div>
    );
}
