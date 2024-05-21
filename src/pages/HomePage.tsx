import { useEffect } from "react";
import { getPosts } from "../api/posts";
import { getUsers } from "../api/users";
import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";

import axios from "axios";
import PostDetail from "../components/PostDetail";
import UserDetail from "../components/UserDetail";
import PostForm from "../components/PostForm";
import { useUsersContext } from "../hooks/useUsersContext";

function HomePage() {
  const { state, dispatch } = usePostsContext();
  const { state: usersState, dispatch: usersDispatch } = useUsersContext();
  const { state: authState } = useAuthContext();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getPosts();
        console.log(res);
        dispatch({ type: "SET_POSTS", payload: res.data });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.message);
        }
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await getUsers();
        console.log(res);
        usersDispatch({ type: "SET_USERS", payload: res.data });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.message);
        }
      }
    };

    if (authState) {
      fetchPosts();
      fetchUsers();
    }
  }, [authState, dispatch, usersDispatch]);

  return (
    <div className="grid grid-cols-3 gap-20">
      <div className="posts col-span-2">
        <PostForm />
        {state &&
          state.posts.map((post) => <PostDetail key={post._id} post={post} />)}
      </div>

      <div>
        <h2>Users List</h2>
        {usersState &&
          usersState.users.map((user) => (
            <UserDetail key={user._id} user={user} />
          ))}
      </div>
    </div>
  );
}

export default HomePage;
