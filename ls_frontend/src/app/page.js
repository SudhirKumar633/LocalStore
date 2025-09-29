import Header from "./components/Header";
import Banner from "./components/Banner";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";

export default function Home() {
  return (
    // Plain wrapper to ensure content is visible even if Tailwind isn't loaded
    <div style={{ minHeight: '100vh', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <Header />
      <div style={{ padding: '16px', background: '#fff' }}>
        <Banner />
        <main style={{ maxWidth: 1100, margin: '24px auto' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Featured Products</h2>
          <ProductList />
        </main>
      </div>
      <Footer />
    </div>
  );
}
