import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-blue-600 text-white p-4">
    <div className="max-w-6xl mx-auto flex justify-between items-center">
      <h1 className="text-xl font-bold">🎬 Movie Store</h1>
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/set-price">Set Price</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;