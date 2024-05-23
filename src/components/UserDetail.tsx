import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { addFriend } from "../api/users";
import { useUsersContext } from "../hooks/useUsersContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function UserDetail({ user }: any) {
  const { state } = useAuthContext();
  const { dispatch } = useUsersContext();

  const handleClick = async () => {
    if (!state.user) {
      // TODO: Set error(you must be logged in)
      return;
    }

    try {
      const res = await addFriend(`${state.user?.id}`, user._id);
      console.log(res);
      dispatch({ type: "DELETE_USER", payload: res.data });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  return (
    <div className="bg-white rounded-md p-5 my-2">
      <p>{user.name}</p>
      <span onClick={handleClick} className="bg-green-500 rounded-sm p-1 mt-2">
        Agregar
      </span>
    </div>
  );
}

export default UserDetail;
