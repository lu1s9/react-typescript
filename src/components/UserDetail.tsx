import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { addFriend } from "../api/users";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function UserDetail({ user }: any) {
  //   const { state: UsersState, dispatch } = useUsersContext();
  const { state } = useAuthContext();

  const handleClick = async () => {
    if (!state.user) {
      // TODO: Set error(you must be logged in)
      return;
    }

    try {
      const res = await addFriend(user._id, `${state.user?.id}`);
      console.log(res);
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
