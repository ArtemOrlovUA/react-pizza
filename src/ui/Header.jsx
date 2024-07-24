import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';

function Header() {
  return (
    <header className="font-pizza border-b border-stone-400 bg-yellow-400 p-4 font-sans sm:flex sm:items-center sm:justify-between lg:text-xl">
      <Link to="/" className="text-2xl font-bold tracking-widest">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
