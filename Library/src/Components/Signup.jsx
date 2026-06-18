import { NavLink } from 'react-router-dom';
import { useForm } from "react-hook-form";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="Signup">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("firstName", { required: true })} placeholder="First Name" />
        <input type="text" {...register("lastName", { required: true })} placeholder="Last Name" />
        <input type="number" {...register("ID", { required: true })} placeholder="Student ID" />
        <input type="text" {...register("username", { required: true })} placeholder="Username" />
        <input type="password" {...register("password", { required: true })} placeholder="Password" />
        {errors.firstName && <span>This field is required</span>}
        {errors.lastName && <span>This field is required</span>}
        {errors.ID && <span>This field is required</span>}
        {errors.username && <span>This field is required</span>}
        {errors.password && <span>This field is required</span>}
        <button type="submit">Signup</button>
      </form>
      <p>Already have an account? <NavLink to="/login">Login</NavLink></p>
    </div>
  );
}

export default Signup;
