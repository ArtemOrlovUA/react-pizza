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
    <form onSubmit={handleSubmit}>
      <input
        value={searchQuery}
        placeholder="Search order number"
        onChange={(e) => setSearchQuery(e.target.value)}></input>
    </form>
  );
}

export default SearchOrder;
