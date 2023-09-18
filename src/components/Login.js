import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useDebounce from "../Utils/Debounce";
import Modal from "./Modal";

function Login({ setUserLoggedIn }) {
  const userName = "test@luxpmsoft.com";
  const userPassword = "test1234!";
  const [inputPassword, setInputPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordMatched, setIsPasswordMatched] = useState(true);
  const debouncedPassword = useDebounce(inputPassword, 700);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (debouncedPassword) {
      const pattern =
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])[a-zA-Z0-9!@#$%^&*_]+$/;
      setIsPasswordMatched(pattern.test(debouncedPassword));
    } else {
      setIsPasswordMatched(true);
    }
  }, [debouncedPassword]);

  //   Checking password character rule on change in input
  function handlePasswordChange(e) {
    const passwordValue = e.target.value;
    setInputPassword(passwordValue);
  }

  //   After clicking on the Login button handling submit
  const onSubmit = (data) => {
    if (data.userName === userName && data.password === userPassword) {
      setUserLoggedIn(true);
    } else if (data.password !== userPassword) {
      setIsModalOpen(true);
    } else if (data.userName !== userName) {
      setError("userName", {
        type: "manual",
        message: "The provided user name is wrong",
      });
    }
  };

  return (
    <div className="loginForm">
      {/* Pop up window */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message="The provided password is wrong"
      />

      <img src="/cart.svg" alt="cart" className="cartImage" />

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* input for user name */}
        <div className="input-wrapper">
          <input
            type="text"
            {...register("userName", { required: true })}
            className="inputBox"
            placeholder="Username"
            id="login-input"
          />
          <img src="/user.svg" alt="icon" class="input-icon" />
          {errors.userName && (
            <span className="block errorMessage">
              {errors.userName.message || "*This field is required"}
            </span>
          )}
        </div>
        {/* input for password */}
        <div className="input-wrapper">
          <input
            type="text"
            {...register("password", { required: true })}
            className="inputBox"
            placeholder="password"
            onChange={(e) => handlePasswordChange(e)}
            onFocus={() => setIsModalOpen(false)}
            id="login-input"
          />
          <img src="/lock.svg" alt="icon" class="input-icon" />
          {!inputPassword && errors.password && (
            <span className="block errorMessage">*This field is required</span>
          )}
          {!isPasswordMatched && (
            <span className="block errorMessage">
              Password pattern not matched
            </span>
          )}
        </div>
        {/* login button */}
        <button type="submit" className="loginButton">
          login
        </button>
        <p className="forgotPassword">Forgot password?</p>
      </form>
    </div>
  );
}

export default Login;
