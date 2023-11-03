import { Link } from "react-router-dom";
import loginImg from "../../assets/login.jpeg";
const Login = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className='hidden sm:block'>
        <img className="w-full h-full object-cover" src={loginImg} alt="" />
      </div>

      <div className="bg-gray-500 flex flex-col justify-center">
        <form className="max-w-[550px] w-full mx-auto bg-gray-600 p-8 px-8 rounded-lg">
          <h2 className="text-4x1 text-3xl dark:text-white font-bold text-center">SIGN IN</h2>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Email</label>
            <input className="rounded-lg bg-gray-700 mt-2 p-2 focus-within:border-blue-500 focus:bg-gray-800 focus:outline-none" type="email" />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Password</label>
            <input className="rounded-lg bg-gray-700 mt-2 p-2 focus-within:border-blue-500 focus:bg-gray-800 focus:outline-none" type="password" />
          </div>
          <div className="flex justify-between text-gray-400 py-2">
            <p className="flex items-center">
              <input className="mr-2" type="checkbox" /> Remember Me
            </p>
            <p>Forgot Password</p>
          </div>
          <button className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">SIGN IN</button>
          <p className="text-gray-400 py-2 flex justify-center">Don&#39;t have an account? <Link className="ml-1 hover:animate-pulse mix-blend-color-dodge" to='/Signup'>Sign Up</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;