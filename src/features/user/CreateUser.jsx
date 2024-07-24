import { useState } from 'react';
import Button from '../../ui/Button';

function CreateUser() {
  const [username, setUsername] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-8 lg:mb-4">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input mb-4 w-72 transition-all md:focus:w-96"
      />

      {username !== '' && (
        <div className="mt-4 transition-all md:mt-8">
          <Button to={'/menu'}>Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
