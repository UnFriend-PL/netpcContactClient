"use client";
import React from "react";
import { useState } from "react";
import { useLoginUser, useUserData, removeUserData } from "../../services/api";
import "./UserPanel.css";
export default function UserPanel() {
  const [userLoginDto, setUserLoginDto] = useState({ password: "", email: "" });
  const { mutate } = useLoginUser();
  const { data: userData, refetch } = useUserData(); // Add refetch method

  const handleLogin = () => {
    mutate(userLoginDto);
  };

  const handleLogout = () => {
    removeUserData();
    refetch(); // Refetch user data after logout
  };

  return (
    <>
      {userData ? (
        <div className="User-Form">
          <h1>Welcome, {userData.firstName}</h1>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <div className="User-Form">
          <h1>Login</h1>
          <input
            type="text"
            placeholder="Email"
            value={userLoginDto.email}
            onChange={(e) =>
              setUserLoginDto({ ...userLoginDto, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={userLoginDto.password}
            onChange={(e) =>
              setUserLoginDto({ ...userLoginDto, password: e.target.value })
            }
          />
          <button onClick={handleLogin}>Log In</button>
        </div>
      )}
    </>
  );
}
