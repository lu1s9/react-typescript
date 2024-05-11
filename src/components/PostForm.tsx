import { useForm } from "react-hook-form";
import { createPost } from "../api/posts";
import { usePostsContext } from "../hooks/usePostsContext";

import axios from "axios";

function PostForm() {
  const { dispatch } = usePostsContext();

  type Inputs = {
    content: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await createPost(data);
      setValue("content", "");
      dispatch({ type: "CREATE_POST", payload: res.data });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response);
      }
    }
  });
  return (
    <div>
      <h3>Add a new post</h3>
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("content", { required: true })}
            placeholder="Post"
            className="p-2.5 rounded-sm mt-2 mb-5"
          />
          {errors.content && (
            <p className="text-red-500 p-2 rounded my-5 border-2 border-rose-600 bg-rose-300">
              Content is required
            </p>
          )}
          <button
            type="submit"
            className="bg-green-600 rounded p-2.5 cursor-pointer"
          >
            Post it
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
