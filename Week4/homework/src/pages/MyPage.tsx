import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import instance from "../api/axios";

function MyPage() {
  const [name, setName] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchName = async () => {
      try {
        const res = await instance.get(`/users/${userId}`);
        setName(res.data.data.name);
      } catch {
        setName("");
      }
    };
    fetchName();
  }, [userId]);

  return (
    <>
      <Header name={name} />
      <Outlet />
    </>
  );
}

export default MyPage;
