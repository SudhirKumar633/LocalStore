import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-700">LocalStore</h1>
      <nav className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
        <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">Login</Link>
        <Link to="/register" className="text-gray-700 hover:text-blue-600 font-medium">Register</Link>
      </nav>
    </header>
  );
};

export default Header;
