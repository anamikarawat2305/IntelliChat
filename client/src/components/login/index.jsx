import { useState, useEffect } from "react";
import { usePostLoginMutation, usePostSignUpMutation } from "@/state/api";

const Login = ({ setUser, setSecret }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [triggerLogin, resultLogin] = usePostLoginMutation();
  const [triggerSignUp] = usePostSignUpMutation();

  const handleLogin = () => {
    triggerLogin({ username, password });
  };

  const handleRegister = () => {
    triggerSignUp({ username, password });
  };

  useEffect(() => {
    if (resultLogin.data?.response) {
      setUser(username);
      setSecret(password);
    }
  }, [resultLogin.data]); // eslint-disable-line
// Build the login page with the login and register actions and
// the login and register functions that will be called when the user clicks on the login or register buttons. 
//The login and register functions will call the login and register mutations respectively. 
//The login mutation will return a token that will be used to authenticate the user in the backend. 
//The register mutation will return a message that will be displayed to the user. 
//The useEffect hook will be used to set the user and secret in the local storage when the login mutation returns a token.
//The user and secret will be used to authenticate the user in the back end. 
//The user and secret will be passed to the Chat component as props. 
//The Chat component will be rendered when the user is logged in. 

//The Chat component will be created in the next section. 
//The Chat component will be rendered in the App component. 
//The App component will be created in the next section. 
//The App component will be rendered in the index.js file.
//The index.js file will be created in the next section. 
//The index.js file will be rendered in the index.html file.
// The index.html file will be created in the next section. 
//The index.html file will be rendered in the browser.

// The browser will be opened when the start script is executed.
// The start script will be created in the next section.
// The start script will be executed when the start command is executed.
// The start command will be created in the next section.
// The start command will be executed when the start script is executed.
  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="title">INTELLICHAT</h2>
        <p
          className="register-change"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Already a user?" : "Are you a new user?"}
        </p>

        <div>
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="login-actions">
          {isRegister ? (
            <button type="button" onClick={handleRegister}>
              Register
            </button>
          ) : (
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;