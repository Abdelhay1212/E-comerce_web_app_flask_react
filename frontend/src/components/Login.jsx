import { useState } from "react"
import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"

const Login = ({ toggleLogin }) => {

  Login.propTypes = {
    toggleLogin: PropTypes.func.isRequired,
  }

  const [loginIdentifier, setLoginIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const navigate = useNavigate()

  function handleIdentifierChange(event) {
    setLoginIdentifier(event.target.value)
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value)
  }

  function handleRememberChange(event) {
    setRememberMe(event.target.value)
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const user = {
      login_identifier: loginIdentifier,
      password: password,
      remember_me: rememberMe
    }

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }

    try {
      const response = await fetch('http://localhost:5000/api/v1/views/auth/login', options)
      const data = await response.json()
      if (response.ok) {
        alert(data.message)
        navigate('/')
      } else {
        alert(data.error)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl text-[#607d8b] font-extrabold">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-[#607d8b] max-w">
          Or <span className="w-1"></span>
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500" onClick={toggleLogin}>
            create an account
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="loginIdentifier" className="block text-sm font-medium text-gray-700">
                Email address or Username
              </label>
              <div className="mt-1">
                <input id="loginIdentifier" name="loginIdentifier" type="text" required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#607d8b] focus:border-[#607d8b] focus:z-10 sm:text-sm"
                  placeholder="Email, Username" onChange={handleIdentifierChange} />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input id="password" name="password" type="password" autoComplete="current-password" required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#607d8b] focus:border-[#607d8b] focus:z-10 sm:text-sm"
                  placeholder="Enter your password" onChange={handlePasswordChange} />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember_me" name="remember_me" type="checkbox"
                  className="h-4 w-4 text-[#607d8b] focus:ring-[#607d8b] border-[#607d8b] rounded" onChange={handleRememberChange} />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-[#607d8b] hover:text-[#607d8b]">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-2 border-[#607d8b] hover:border-[#607d8b] text-sm font-medium text-[#607d8b] hover:text-white bg-white hover:bg-[#607d8b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#607d8b]">
                Sign in
              </button>
            </div>
          </form>
          <div className="mt-6">

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-100 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <div>
                <a href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <img className="h-6 w-6" src="https://www.svgrepo.com/show/506498/google.svg"
                    alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
