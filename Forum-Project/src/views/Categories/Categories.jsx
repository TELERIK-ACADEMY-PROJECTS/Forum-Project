import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    });

    return (
        <div
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
        >
            <button
                type="button"
                className={`block mt-5`}
                id="menu-button"
                aria-expanded={showDropdown}
                aria-haspopup="true"
            >
                Categories
                <svg
                    className={`-mr-1 h-5 w-5 ${showDropdown ? 'text-gray-900' : 'text-gray-400'}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {showDropdown && (
                <div
                className="absolute z-10 mt-0 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                >
                    <div className="py-1" role="none">
                        <Link to="/iphone" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">
                            iPhone
                        </Link>
                        <Link to="/mac" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">
                            Mac
                        </Link>
                        <Link to="/watch" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2">
                            Watch
                        </Link>
                        <Link to="/ViewAll" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">
                            View all
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Categories;