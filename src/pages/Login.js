import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';

function Login() {
  const history = useHistory();
  const [password, setPassword] = useState('');
  const { email, setEmail } = useContext(LoginContext);

  function validateEmail() {
    const min = 6;
    const validationEmail = /\S+@\S+\.\S+/;
    return !(validationEmail.test(email) && password.length > min);
  }

  function saveEmail(emailUser) {
    localStorage.setItem('user', JSON.stringify({ email: emailUser }));
  }

  return (
    <form
      onSubmit={ (e) => {
        e.preventDefault();
        saveEmail(email);
        history.push('/meals');
      } }
    >
      <div>
        <input
          data-testid="email-input"
          type="email"
          placeholder="E-mail"
          name="email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
        <input
          data-testid="password-input"
          type="password"
          placeholder="Password"
          name="password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
      </div>

      <button
        disabled={ validateEmail() }
        data-testid="login-submit-btn"
        type="submit"
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
