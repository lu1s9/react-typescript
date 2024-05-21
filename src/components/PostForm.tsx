import { useForm } from "react-hook-form";
import { createPost } from "../api/posts";
import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";

import axios from "axios";

function PostForm() {
  const { dispatch } = usePostsContext();
  const { state } = useAuthContext();

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
    if (!state.user) {
      // TODO: Set error(you must be logged in)
      return;
    }

    try {
      const res = await createPost(data);
      console.log(res);
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
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("content", { required: true })}
            placeholder="What's on yout mind?"
            className="p-2.5 rounded-sm mt-10 mb-5 w-full h-20 "
          />
          {errors.content && (
            <p className="text-red-500 p-2 rounded my-5 border-2 border-rose-600 bg-rose-300">
              Content is required
            </p>
          )}
          <button
            type="submit"
            className="bg-green-600 rounded-xl p-2.5 cursor-pointer font-bold"
          >
            Post it
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
