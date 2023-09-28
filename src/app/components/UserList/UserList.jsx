"use client";
import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { API_BASE_URL } from "@/app/services/api";
import "./UserList.css";

const UserDetails = ({ user }) => {
  return (
    <div>
      <h2>User Details:</h2>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      <div>
        <strong>Phone:</strong> {user.phone}
      </div>
    </div>
  );
};

const UserRow = ({ user, onSelectUser, selectedUserId }) => (
  <div
    key={user.userId}
    onClick={() => onSelectUser(user.userId)}
    className={`UserRow ${user.userId === selectedUserId ? "selected" : ""}`}
  >
    {user.firstName} {user.lastName}
    {user.userId === selectedUserId && <UserDetails user={user} />}
  </div>
);

const UsersList = ({ onSelectUser, selectedUserId }) => {
  const { data, isLoading, isError, error } = useQuery("users", async () => {
    const response = await axios.get(`${API_BASE_URL}/api/Users/Users`);
    return response.data.data;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="UserList">
      {data.map((user) => (
        <UserRow
          key={user.userId}
          user={user}
          onSelectUser={onSelectUser}
          selectedUserId={selectedUserId}
        />
      ))}
    </div>
  );
};

const UserComponent = () => {
  const [selectedUserId, setSelectedUserId] = React.useState(null);

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <div>
      <UsersList
        onSelectUser={handleSelectUser}
        selectedUserId={selectedUserId}
      />
    </div>
  );
};

export default UserComponent;
