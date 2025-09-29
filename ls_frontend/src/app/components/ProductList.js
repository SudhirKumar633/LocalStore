"use client";

const products = [
  { id: 1, name: "Campus Sneakers", price: "₹999", image: "/campus.jpg" },
  { id: 2, name: "Relaxo Sandals", price: "₹799", image: "/relaxo.jpg" },
  { id: 3, name: "Sports Shoes", price: "₹1299", image: "/sports.jpg" },
];

export default function ProductList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {products.map(product => (
        <div key={product.id} className="border rounded-lg p-4 text-center">
          <img src={product.image} alt={product.name} className="h-40 mx-auto mb-4 object-contain" />
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-blue-600 font-bold">{product.price}</p>
          <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">Add to Cart</button>
        </div>
      ))}
    </div>
  );
}