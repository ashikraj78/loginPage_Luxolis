import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
function Logins({ setUserLoggedIn }) {
  const [inputPassword, setInputPassword] = useState("");
  const [isPasswordMatched, setIsPasswordMatched] = useState(true);
  const debouncedPassword = useDebounce(inputPassword, 700);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (
      data.userName === "test@luxpmsoft.com" &&
      data.password === "test1234!"
    ) {
      setUserLoggedIn(true);
    } else if (data.password !== "test1234!") {
      setIsModalOpen(true);
    } else if (data.userName !== "test@luxpmsoft.com") {
      setError("userName", {
        type: "manual",
        message: "The provided user name is wrong",
      });
    }
  };

  useEffect(() => {
    if (debouncedPassword) {
      const pattern =
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])[a-zA-Z0-9!@#$%^&*_]+$/;
      setIsPasswordMatched(pattern.test(debouncedPassword));
    } else {
      setIsPasswordMatched(true);
    }
  }, [debouncedPassword]);

  function handlePasswordChange(e) {
    const passwordValue = e.target.value;
    setInputPassword(passwordValue);
  }

  return (
    <div className="loginForm ">
      {isModalOpen && (
        <div class="modal">
          <div class="modal-content">
            <span class="close-btn" onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <p className="wrongPassword">The provided password is wrong</p>
          </div>
        </div>
      )}

      <img src="/cart.svg" alt="cart" className="cartImage" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">
          <input
            type="text"
            {...register("userName", { required: true })}
            className="inputBox"
            placeholder="Username"
            id="login-input"
            autocomplete="on"
          />
          <img src="/user.svg" alt="icon" class="input-icon" />
          {errors.userName && (
            <span className="block errorMessage">
              {errors.userName.message || "*This field is required"}
            </span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            {...register("password", { required: true })}
            className="inputBox"
            placeholder="password"
            onChange={(e) => handlePasswordChange(e)}
            id="login-input"
          />
          <img src="/lock.svg" alt="icon" class="input-icon" />
          {errors.password && (
            <span className="block errorMessage">
              {errors.password.message || "*This field is required"}
            </span>
          )}
          {!isPasswordMatched && (
            <span className="block errorMessage">
              Password pattern not matched
            </span>
          )}
        </div>
        <button type="submit" className="loginButton">
          login
        </button>
        <p className="forgotPassword">Forgot password?</p>
      </form>
    </div>
  );
}

export default Logins;
