import { useEffect, useState } from "react";
import { getFriends } from "../api/users";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

function FriendsListPage() {
  const [friends, setFriends] = useState([]);
  const { state } = useAuthContext();
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await getFriends();
        setFriends(res.data);
        console.log(res);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.message);
        }
      }
    };

    if (state) {
      fetchFriends();
      // console.log(friends);
    }
  }, [state]);

  const renderFriendships = () => {
    return friends.map((friendship) => {
      // Identificar el amigo (el otro usuario en la relación)
      let friend = null;
      if (friendship.user1_id._id === state.user?.id) {
        friend = friendship.user2_id;
      } else if (friendship.user2_id._id === state.user?.id) {
        friend = friendship.user1_id;
      }

      if (friend) {
        return (
          <li key={friendship._id}>
            {friend.name} - Status: {friendship.status}
          </li>
        );
      } else {
        return null;
      }
    });
  };
  return (
    <div>
      <h2>Friends</h2>
      {/* {state.email} */}
      {friends && <ul>{renderFriendships()}</ul>}
    </div>
  );
}

export default FriendsListPage;
