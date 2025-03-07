import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  const [ loginCheck, setLoginCheck ] = useState(false);

  const checkLogin = () =>  {
    if(auth.loggedIn()) {
      console.log('logged in');
      setLoginCheck(true);
    }
    else {
      setLoginCheck(false);
    }
    console.log(loginCheck);
    return loginCheck;

  };

  useEffect(() => {
    console.log(loginCheck);
    checkLogin();
  }, [loginCheck])

  return (
    <div className='nav'>
      <div className='nav-title'>
        <Link to='/'>Stocks Rock!</Link>
      </div>
      <ul>
      {
        !loginCheck ? (
          <li className='nav-item'>
            <button type='button'>
              <Link to='/login'>Login</Link>
            </button>
          </li>
        ) : (
          <li className='nav-item'>
            <button type='button' onClick={() => {
              auth.logout();
            }}>Logout</button>
          </li>
        )
      }
      </ul>
    </div>
  )
}

export default Navbar;

