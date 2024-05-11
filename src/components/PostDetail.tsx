import { deletePost } from "../api/posts";
import { usePostsContext } from "../hooks/usePostsContext";
import axios from "axios";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PostDetail({ post }: any) {
  const { dispatch } = usePostsContext();

  const handleClick = async () => {
    try {
      const { data } = await deletePost(post._id);
      dispatch({ type: "DELETE_POST", payload: data });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  return (
    <div className="bg-white rounded-md mx-auto my-10 p-10 relative shadow-md">
      <p>{post.content}</p>
      <p>
        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
      </p>
      <span onClick={handleClick}>Delete</span>
    </div>
  );
}

export default PostDetail;
