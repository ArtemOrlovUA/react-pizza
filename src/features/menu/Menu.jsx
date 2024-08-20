import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

function Menu() {
  const menu = useLoaderData();
  // console.log(menu);

  return (
    <ul className="max-w-[360px] pl-1 sm:max-w-[100%] md:grid md:grid-cols-[1fr_1fr]">
      {menu.map((pizza) => {
        return <MenuItem pizza={pizza} key={pizza.id} />;
      })}
    </ul>
  );
}

export async function loader() {
  const data = await getMenu();
  return data;
}

export default Menu;
