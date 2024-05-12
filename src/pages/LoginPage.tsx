import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useLogin";

type Inputs = {
  email: string;
  password: string;
};

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { login, errors: LoginErrors, isLoading } = useLogin();
  const onSubmit = handleSubmit(async (data) => {
    await login(data);
  });
  return (
    <div className="">
      <form onSubmit={onSubmit} className="max-w-md my-10 mx-auto p-5">
        <h3>Log in</h3>
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
          className="block w-full p-2.5 rounded-sm mb-5"
        />
        {errors.email && <p className="text-red-500">Email is required</p>}
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Password"
          className="block w-full p-2.5 rounded-sm mb-5"
        />
        {errors.password && (
          <p className="text-red-500">Password is required</p>
        )}
        <button
          type="submit"
          className="bg-green-600 rounded p-2.5 cursor-pointer"
          disabled={isLoading}
        >
          Log in
        </button>
        {LoginErrors && (
          <div className="text-red-500 p-2 rounded my-5 border-2 border-rose-600">
            {LoginErrors}
          </div>
        )}
      </form>
    </div>
  );
}

export default LoginPage;
