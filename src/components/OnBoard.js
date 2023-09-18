import React, { useState } from "react";
import Login from "./Login";

function OnBoard() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  return (
    <div className="loginpage center">
      {!userLoggedIn ? <Login setUserLoggedIn={setUserLoggedIn} /> : ""}
    </div>
  );
}

export default OnBoard;
