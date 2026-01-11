import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/fsLogoCut.png';

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center p-2 bg-background shadow-md">
            <div className="flex justify-center items-center">
                <img
                    src={logo}
                    alt="FoodShare Logo"
                    className="w-auto h-28 mix-blend-multiply mask-cover"
                />
                <p className="font-bold text-2xl">FoodShare</p>
            </div>
            <ul className="flex gap-2 pr-4 text-l font-bold">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? 'bg-hover text-accent rounded-md p-4 shadow-md'
                                : 'bg-primary text-white rounded-md p-4 shadow-md'
                        }
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/recipes"
                        className={({ isActive }) =>
                            isActive
                                ? 'bg-hover text-accent rounded-md p-4 shadow-md'
                                : 'bg-primary text-white rounded-md p-4 shadow-md'
                        }
                    >
                        Recipes
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/search"
                        className={({ isActive }) =>
                            isActive
                                ? 'bg-hover text-accent rounded-md p-4 shadow-md'
                                : 'bg-primary text-white rounded-md p-4 shadow-md'
                        }
                    >
                        Search
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
