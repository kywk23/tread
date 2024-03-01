"use client";
import Image from "next/image";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

//Components Import
import { useUserId } from "./GetCurrentUser";
import { AddFriend, SendMessage } from "./Buttons";

export default function ProfilePageContainer({ username }) {
  const { currentUser } = useUserId();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/user/${username}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (username) {
      fetchData();
    }
  }, []);

  return (
    <div>
      {" "}
      <Image
        src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
        alt="placeholder img"
        width={100}
        height={100}
      />
      <div>
        <strong>{"@" + userData?.username}</strong>
        <AddFriend />
      </div>
      <Container>{userData?.bio}</Container>
      <br />
      <SendMessage />
    </div>
  );
}
