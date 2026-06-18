import { NavLink } from 'react-router-dom';
import { useForm } from "react-hook-form";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const onSubmit = (data) => console.log(data);

  return (
    <div className="Login">
      <form onSubmit={handleSubmit(onSubmit)}>

        <input type="text" {...register("username", { required: true })} placeholder="Username" />
        <input type="password" {...register("password", { required: true })} placeholder="Password" />
        {errors.username && <span>This field is required</span>}
        {errors.password && <span>This field is required</span>}
        <button type="submit">Login</button>
      </form>
      <p>Dont have an account? <NavLink to="/register">Register</NavLink></p>
    </div>
  );
}

export default Login;
