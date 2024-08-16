import { useSelector } from 'react-redux';

function Username() {
  const username = useSelector((state) => state.user.username);

  if (!username) return null;

  return <div className="text-xl font-bold">{username}</div>;
}

export default Username;
