import { useForm } from "react-hook-form";
import { useSignup } from "../hooks/useSignup";

type Inputs = {
  email: string;
  name: string;
  password: string;
};

function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { errors: SignupErrors, isLoading, signup } = useSignup();
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const res = await signup(data);
    console.log(res);
  });
  return (
    <div className="">
      <form onSubmit={onSubmit} className="max-w-md my-10 mx-auto p-5">
        <h3>Sign up</h3>
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
        <input
          type="text"
          {...register("name", { required: true })}
          placeholder="Name"
          className="block w-full p-2.5 rounded-sm mb-5"
        />
        {errors.name && <p className="text-red-500">Name is required</p>}
        <button
          type="submit"
          className="bg-green-600 rounded p-2.5 cursor-pointer"
          disabled={isLoading}
        >
          Sign up
        </button>

        {SignupErrors && (
          <div className="text-red-500 p-2 rounded my-5 border-2 border-rose-600">
            {SignupErrors}
          </div>
        )}
      </form>
    </div>
  );
}

export default SignupPage;
