import { useState } from 'react'
import Login from '../components/Login';
import Register from '../components/Register';

const Account = () => {

  const [showLogin, setShowLogin] = useState(true)

  function toggleLogin() {
    setShowLogin(!showLogin)
  }

  return (
    <>
      {showLogin ? (
        <Login toggleLogin={toggleLogin} />
      ) : (
        <Register toggleLogin={toggleLogin} />
      )}
    </>
  );
}

export default Account
