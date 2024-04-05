import { useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'
import { Helmet } from 'react-helmet'

const Account = () => {

  const [showLogin, setShowLogin] = useState(true)

  function toggleLogin() {
    setShowLogin(!showLogin)
  }

  return (
    <>
      {showLogin ? (
        <div>
          <Helmet>
            <title>Login</title>
          </Helmet>
          <Login toggleLogin={toggleLogin} />
        </div>
      ) : (
        <div>
          <Helmet>
            <title>Register</title>
          </Helmet>
          <Register toggleLogin={toggleLogin} />
        </div>
      )}
    </>
  );
}

export default Account
