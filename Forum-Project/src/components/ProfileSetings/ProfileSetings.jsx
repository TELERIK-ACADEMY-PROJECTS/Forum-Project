
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../services/auth.services';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

const ProfileSettings = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { setUser } = useContext(AuthContext);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const hideDropdown = () => {
    setShowDropdown(false);
  };

  const onLogout = () => {
    logoutUser()
      .then(() => {
        setUser({
          user: null
        })
      })
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className={`inline-flex w-full justify-center px-3 py-2 text-white text-xl duration-500 mx-4 my-6 md:my-0 focus:outline-none`}
          id="menu-button"
          aria-expanded={showDropdown}
          aria-haspopup="true"
          onClick={() => {
            if (showDropdown) {
              hideDropdown();
            } else {
              toggleDropdown();
            }
          }}
        >
          UserProfile
          <svg
            className={`-mr-1 h-5 w-5 ${showDropdown ? 'text-gray-900' : 'text-gray-400'}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {showDropdown && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
          onClick={() => {
            if (showDropdown) {
              hideDropdown();
            } else {
              toggleDropdown();
            }
          }}
        >
          <div className="py-1" role="none">
            <Link to="/newPost" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">
              New Post
            </Link>
            <Link to="/settings" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">
              Settings
            </Link>
            <Link to="/" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-3"
              onClick={onLogout} >
              log Out
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;
