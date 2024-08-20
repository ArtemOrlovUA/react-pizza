import { Outlet, useNavigation } from 'react-router-dom';
import CartOverview from '../features/cart/CartOverview';
import Header from './Header';
import Loader from './Loader';
import { useSelector } from 'react-redux';

function AppLayout() {
  const navigation = useNavigation();
  // console.log(navigation);
  const isLoading = navigation.state === 'loading';
  const cart = useSelector((state) => state.cart.cart);

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] font-sans">
      {isLoading && <Loader />}

      <Header />

      <main className="overflow-auto">
        <Outlet />
      </main>

      {cart.length > 0 && <CartOverview />}
    </div>
  );
}

export default AppLayout;
