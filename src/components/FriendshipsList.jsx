"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { PeopleFill, PersonFillExclamation } from "react-bootstrap-icons";
//Components Import
import PageHeaderWithBackBtn from "./PageHeaderWithBackBtn";
import { useUserId } from "./GetCurrentUser";

export default function FriendshipsList({ username }) {
  const [userId, setUserId] = useState();
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const { currentUser } = useUserId();
  const currUserId = currentUser?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await axios.get(`/api/user/${username}`);
        const userId = userData.data.id;
        setUserId(userId);
        const responseFriends = await axios.get(`/api/friendships/${userId}`);
        const friendsData = responseFriends.data.filter((friend) => friend.status === "friends");
        const pendingData = responseFriends.data.filter((friend) => friend.status === "pending");
        console.log(pendingData);
        setFriends(friendsData);
        setPendingRequests(pendingData);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const renderPending = () => {
    // if requestor = curr user, return : PENDING
    // if receiver =/= curr user, return ACCEPT DECLINE
    return pendingRequests.map((request) => {
      if (request.Requestor.id === currUserId) {
        return <div key={request.id}>{request.Receiver.username} - Friend Request Sent</div>;
      } else if (request.Requestor.id !== currUserId) {
        return (
          <div key={request.id}>
            <button>ACCEPT</button>
            <button>DECLINE</button>
          </div>
        );
      }
    });
  };

  return (
    <div>
      <PageHeaderWithBackBtn />
      <h3>{username}</h3>
      <ul className="nav nav-pills mb-3 nav-justified" id="pills-tab" role="tablist">
        {/* MY FRIENDS PILL  */}
        <li className=" nav-item" role="presentation">
          <button
            className="nav-link active"
            id="pills-friends-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-friends"
            type="button"
            role="tab"
            aria-controls="pills-friends"
            aria-selected="true"
          >
            Friends <PeopleFill />
          </button>
        </li>
        {/* PENDING FRIENDS REQUEST PILL  */}
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="pills-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-profile"
            type="button"
            role="tab"
            aria-controls="pills-profile"
            aria-selected="false"
          >
            Pending request <PersonFillExclamation />
          </button>
        </li>
      </ul>
      {/* CONTENT OF PILLS  */}
      <div className="tab-content" id="pills-tabContent">
        {/* MY FRIENDS CONTENT  */}
        <div
          className="tab-pane fade show active"
          id="pills-friends"
          role="tabpanel"
          aria-labelledby="pills-friends-tab"
        >
          <ul>
            {friends.map((friend) =>
              friend.Requestor.id === userId ? (
                <li key={friend.id}>
                  <a href={`/user/${friend.Receiver.username}`}>@{friend.Receiver.username}</a>
                </li>
              ) : (
                <li key={friend.id}>
                  <a href={`/user/${friend.Requestor.username}`}>@{friend.Requestor.username}</a>
                </li>
              )
            )}
          </ul>
        </div>
        {/* PENDING FRIENDS REQUEST  CONTENT  */}
        <div
          className="tab-pane fade"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
          {renderPending()}
        </div>
      </div>
    </div>
  );
}
