import { useState, FormEvent, ChangeEvent } from "react";

import Auth from '../utils/auth';
import { register } from "../api/authAPI";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await register(registerData);
      Auth.login(data.accessToken);
    } catch (err) {
      console.error('Failed to register', err);
    }
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Register</h1>
        <label >Username</label>
        <input 
          type='text'
          name='username'
          value={registerData.username || ''}
          onChange={handleChange}
        />
        <label >email</label>
        <input 
          type='email'
          name='email'
          value={registerData.email|| ''}
          onChange={handleChange}
        />
      <label>Password</label>
        <input 
          type='password'
          name='password'
          value={registerData.password || ''}
          onChange={handleChange}
        />
        <button type='submit'>Submit Form</button>
      </form>
    </div>
    
  )
};

export default Register;
