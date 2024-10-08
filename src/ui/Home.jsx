import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import Button from './Button';

function Home() {
  const username = useSelector((state) => state.user.username);

  return (
    <div className="mx-1 my-6 text-center text-xl sm:mx-0 lg:text-3xl xl:text-2xl">
      <h1 className="mb-8 text-center text-xl font-semibold lg:text-3xl xl:text-2xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {!username ? (
        <CreateUser />
      ) : (
        <Button to={'/menu'} type="primary">
          Start ordering, {username}
        </Button>
      )}
    </div>
  );
}

export default Home;
