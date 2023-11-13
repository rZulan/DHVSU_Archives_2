import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">DHVSU Archives</h1>
      <nav>
        <Link to='/' className="ml-4">Home</Link>
        <Link to='/library' className="ml-4">Library</Link>
        <Link to='/admin' className="ml-4">Admin</Link>
        <Link to='/admin' className="ml-4 text-yellow-300">Logout</Link>
      </nav>
    </header>
  );
};

export default Header;
