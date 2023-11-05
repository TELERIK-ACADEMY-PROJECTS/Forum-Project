import { Link } from "react-router-dom"
import SignUpImg from "../../assets/SignUp.jpeg";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router";
import { getUserByHandle, createUserHandle } from '../../services/users.services'
import { registerUser } from "../../services/auth.services";

const SignUp = () => {

  const [form, setForm] = useState({
    email: '',
    handle: '',
    password: '',
  });

  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const updateForm = (field) => (e) => {
    setForm({
      ...form,
      [field]: e.target.value,
    });
  }

  const onRegister = (event) => {
    event.preventDefault();

    if (!form.email) {
      alert('Email is required');
      return;
    }
    if (!form.handle) {
      alert('Handle is required');
      return;
    }
    if (!form.password && form.password.length < 6) {

      alert('Password is required and must be at least 6 characters long');
      return;
    }
    // console.log(form)
    getUserByHandle(form.handle)
      .then(snapshot => {
        if (snapshot.exists()) {
          alert('Handle already exists');
          return;
        }

        return registerUser(form.email, form.password);
      })
      .then(credential => {
        return createUserHandle(form.handle, credential.user.uid, credential.user.email)
          .then(() => {
            setUser({
              user: credential.user
            })
          })
      })
      .then(() => {
        navigate('/home');
      })
      .catch(e => console.log(e));
  }
  return (
    <>
      <div className='signup-wrapper'>
        <div className='form'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' id='email' value={form.email} onChange={updateForm('email')} />
          <label htmlFor='handle'>Handle</label>
          <input type='text' name='handle' id='handle' value={form.handle} onChange={updateForm('handle')} />
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password' value={form.password} onChange={updateForm('password')} />
          <button onClick={onRegister}> Register </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
        <div className='hidden sm:block'>
          <img className="w-full  object-cover max-w-3xl" src={SignUpImg} alt="" />
        </div>
        <div className="bg-gray-500 flex flex-col justify-center">
          <form className="max-w-[550px] w-full mx-auto bg-gray-600 p-8 px-8 rounded-lg">
            <h2 className="text-4x1 dark:text-white font-bold text-center">SIGN UP</h2>
            <div className="flex flex-col text-gray-400 py-2">
              <label>First Name</label>
              <input className="rounded-lg bg-gray-700 mt-2 p-2 focus-within:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="text"
                placeholder="" />
            </div>
            <div className="flex flex-col text-gray-400 py-2">
              <label>Last Name</label>
              <input className="rounded-lg bg-gray-700 mt-2 p-2 focus-within:border-blue-500 focus:bg-gray-800 focus:outline-none" type="text" />
            </div>
            <div className="flex flex-col text-gray-400 py-2">
              <label>Username</label>
              <input className="rounded-lg bg-gray-700 mt-2 p-2 focus-within:border-blue-500 focus:bg-gray-800 focus:outline-none" type="text" />
            </div>
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
            <button className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">SIGN UP</button>
            <p className="text-gray-400 py-2 flex justify-center">Already have an account? <Link className="ml-1 hover:animate-pulse mix-blend-color-dodge" to='/Login'>Sign In</Link></p>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp


{/*} <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
    <div className='hidden sm:block'>
      <img className="w-full  object-cover max-w-3xl" src={SignUpImg} alt="" />
    </div>
    <div className="bg-gray-500 flex flex-col justify-center">
      <form className="max-w-[550px] w-full mx-auto bg-gray-600 p-8 px-8 rounded-lg">
        <h2 className="text-4x1 dark:text-white font-bold text-center">SIGN UP</h2>
        <div className="flex flex-col text-gray-400 py-2">
          <label>First Name</label>
            <input className="rounded-lg bg-gray-700 mt-2 p-2 focus-within:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="text"
            placeholder=""/>
        </div>
        <div className="flex flex-col text-gray-400 py-2">
          <label>Last Name</label>
          <input className="rounded-lg bg-gray-700 mt-2 p-2 focus-within:border-blue-500 focus:bg-gray-800 focus:outline-none" type="text" />
                  </div>
                  <div className="flex flex-col text-gray-400 py-2">
          <label>Username</label>
          <input className="rounded-lg bg-gray-700 mt-2 p-2 focus-within:border-blue-500 focus:bg-gray-800 focus:outline-none" type="text" />
                  </div>
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
        <button className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">SIGN UP</button>
        <p className="text-gray-400 py-2 flex justify-center">Already have an account? <Link className="ml-1 hover:animate-pulse mix-blend-color-dodge" to='/Login'>Sign In</Link></p>
      </form>
    </div>
</div>*/}