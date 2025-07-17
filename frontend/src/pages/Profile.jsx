// frontend/src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // or sessionStorage
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded); // decoded contains { id, email, etc. }
    }
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      {user && (
        <div>
          <p>Email: {user.email}</p>
          <p>User ID: {user.id}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
