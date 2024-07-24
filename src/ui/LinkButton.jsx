import { Link, useNavigate } from 'react-router-dom';

/* eslint-disable react/prop-types */
function LinkButton({ children, to }) {
  const navigate = useNavigate();

  const className = 'text-blue-500 hover:underline';

  if (to === '-1')
    return (
      <button className={className} onClick={() => navigate(-1)}>
        &larr; Go back
      </button>
    );

  return (
    <Link className={className} to={to}>
      &larr; {children}
    </Link>
  );
}

export default LinkButton;
