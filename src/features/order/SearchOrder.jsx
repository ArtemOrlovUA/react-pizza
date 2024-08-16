import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigator = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!searchQuery) return;
    navigator(`/order/${searchQuery}`);
    setSearchQuery('');
  }

  return (
    <form onSubmit={handleSubmit} className="my-2">
      <input
        value={searchQuery}
        placeholder="Search order number"
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-56 rounded-full border border-stone-300 bg-yellow-100 p-2 text-sm transition-all placeholder:text-stone-700 focus:outline-none focus:ring focus:ring-yellow-500 custom:focus:w-72"
      ></input>
    </form>
  );
}

export default SearchOrder;
