import { Link } from 'react-router-dom';

/* eslint-disable react/prop-types */
function Button({ children, state, to, onClick, type = 'primary' }) {
  const base = `rounded-full text-lg border bg-yellow-400 font-semibold uppercase tracking-wide transition-colors hover:bg-yellow-400 hover:text-stone-100 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed`;

  const styles = {
    primary: base + ` p-4 `,
    small: base + ` p-2 `,
    secondary:
      'rounded-full text-lg border-2 border-stone-400 font-semibold uppercase tracking-wide transition-colors hover:bg-yellow-400 hover:text-stone-100 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed p-1.5',
    round: base + ' px-4 py-1.5 md:px-4 md:py-2',
  };

  if (to)
    return (
      <Link className={`${styles[type]} mt-10`} onClick={onClick} to={to}>
        {children}
      </Link>
    );

  return (
    <button
      disabled={state === 'loading' || state === 'submitting'}
      className={styles[type]}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
