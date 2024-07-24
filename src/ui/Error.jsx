import { Link, useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function NotFound() {
  const error = useRouteError();
  console.log(error.message);

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.message}</p>
      <LinkButton to="-1">Go back home</LinkButton>
    </div>
  );
}

export default NotFound;
