import PropTypes from "prop-types"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const Register = ({ toggleLogin }) => {

  Register.propTypes = {
    toggleLogin: PropTypes.func.isRequired,
  }

  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  function handleFormOnChange(event) {
    const { name, value } = event.target
    switch (name) {
      case 'firstName':
        setFirstName(value)
        break
      case 'lastName':
        setLastName(value)
        break
      case 'username':
        setUsername(value)
        break
      case 'email':
        setEmail(value)
        break
      case 'password':
        setPassword(value)
        break
      case 'confirmPassword':
        setConfirmPassword(value)
        break
      default:
        break
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    const user = {
      first_name: firstName,
      last_name: lastName,
      username: username,
      email: email,
      password: password,
    }

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }

    try {
      const response = await fetch('http://localhost:5000/api/v1/views/auth/register', options)
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
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
      <h1 className="text-xl font-bold text-center text-[#607d8b] mb-6">Create Your Account</h1>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div className="flex items-start flex-col justify-start">
          <label htmlFor="firstName" className="text-sm text-gray-700 mr-2">First Name:</label>
          <input type="text" id="firstName" name="firstName" required onChange={handleFormOnChange} className="w-full px-3 text-gray-700 py-2 rounded-md border border-gray-300 focus:border-none focus:outline-none focus:ring-1 focus:ring-[#607d8b]" />
        </div>

        <div className="flex items-start flex-col justify-start">
          <label htmlFor="lastName" className="text-sm text-gray-700 mr-2">Last Name:</label>
          <input type="text" id="lastName" name="lastName" required onChange={handleFormOnChange} className="w-full px-3 text-gray-700 py-2 rounded-md border border-gray-300 focus:border-none focus:outline-none focus:ring-1 focus:ring-[#607d8b]" />
        </div>

        <div className="flex items-start flex-col justify-start">
          <label htmlFor="username" className="text-sm text-gray-700 mr-2">Username:</label>
          <input type="text" id="username" name="username" required onChange={handleFormOnChange} className="w-full px-3 text-gray-700 py-2 rounded-md border border-gray-300 focus:border-none focus:outline-none focus:ring-1 focus:ring-[#607d8b]" />
        </div>

        <div className="flex items-start flex-col justify-start">
          <label htmlFor="email" className="text-sm text-gray-700 mr-2">Email:</label>
          <input type="email" id="email" name="email" required onChange={handleFormOnChange} className="w-full px-3 text-gray-700 py-2 rounded-md border border-gray-300 focus:border-none focus:outline-none focus:ring-1 focus:ring-[#607d8b]" />
        </div>

        <div className="flex items-start flex-col justify-start">
          <label htmlFor="password" className="text-sm text-gray-700 mr-2">Password:</label>
          <input type="password" id="password" name="password" required onChange={handleFormOnChange} className="w-full px-3 text-gray-700 py-2 rounded-md border border-gray-300 focus:border-none focus:outline-none focus:ring-1 focus:ring-[#607d8b]" />
        </div>

        <div className="flex items-start flex-col justify-start">
          <label htmlFor="confirmPassword" className="text-sm text-gray-700 mr-2">Confirm Password:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" required onChange={handleFormOnChange} className="w-full px-3 text-gray-700 py-2 rounded-md border border-gray-300 focus:border-none focus:outline-none focus:ring-1 focus:ring-[#607d8b]" />
        </div>

        <button type="submit" className="bg-white hover:bg-[#607d8b] text-[#607d8b] hover:text-white border border-2 border-[#607d8b] hover:border-[#607d8b] focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-[#607d8b] font-medium py-2 px-4 rounded-md shadow-sm">Register</button>
      </form>

      <div className="mt-4 text-center">
        <span className="text-sm text-gray-500">Already have an account? </span>
        <a href="#" className="text-[#607d8b] hover:text-[#607d8b]" onClick={toggleLogin}>Login</a>
      </div>
    </div>
  )
}

export default Register
