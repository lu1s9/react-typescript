import axios from "axios";
import { acceptFriend, deleteFriend } from "../api/users";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFriendsContext } from "../hooks/useFriendsContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FriendshipDetail({ friendship }: any) {
  const { state } = useAuthContext();
  const { dispatch } = useFriendsContext();

  const handleDeleteClick = async () => {
    if (!state.user) {
      // TODO: Set error(you must be logged in)
      return;
    }
    try {
      const res = await deleteFriend(friendship._id);
      console.log(res);
      dispatch({ type: "REMOVE_FRIEND", payload: res.data });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  const handleAcceptClick = async () => {
    if (!state.user) {
      // TODO: Set error(you must be logged in)
      return;
    }
    try {
      const res = await acceptFriend(friendship._id);
      console.log(res);
      dispatch({ type: "ADD_FRIEND", payload: res.data });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  let friend = null;
  if (friendship.user1_id._id === state.user?.id) {
    friend = friendship.user2_id;
  } else if (friendship.user2_id._id === state.user?.id) {
    friend = friendship.user1_id;
  }
  const accepted = friendship.status === "Accepted";
  const requested = state.user?.id !== friendship.user1_id._id;
  return (
    <div className="bg-white rounded-md mx-auto my-10 p-10 relative shadow-md">
      <p>
        {friend.name} - {friendship.status}{" "}
        {!accepted && requested && (
          <span
            onClick={handleAcceptClick}
            className="absolute top-5 right-24 cursor-pointer rounded bg-slate-300 p-1"
          >
            Accept
          </span>
        )}
        <span
          onClick={handleDeleteClick}
          className="absolute top-5 right-5 cursor-pointer rounded bg-slate-300 p-1"
        >
          Delete
        </span>
      </p>
    </div>
  );
}

export default FriendshipDetail;
