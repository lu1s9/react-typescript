import { useEffect } from "react";
import { getFriends } from "../api/users";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import { useFriendsContext } from "../hooks/useFriendsContext";
import FriendshipDetail from "../components/FriendshipDetail";

function FriendsListPage() {
  const { state } = useAuthContext();
  const { state: friendsState, dispatch } = useFriendsContext();
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await getFriends();
        console.log(res);
        dispatch({ type: "SET_FRIENDS", payload: res.data });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.message);
        }
      }
    };

    if (state) {
      fetchFriends();
    }
  }, [dispatch, state]);

  return (
    <div>
      <h2>Friends</h2>
      {friendsState &&
        friendsState.friends.map((friendship) => (
          <FriendshipDetail key={friendship._id} friendship={friendship} />
        ))}
    </div>
  );
}

export default FriendsListPage;
