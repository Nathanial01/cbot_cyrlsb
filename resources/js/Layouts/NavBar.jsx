import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState, useRef, useEffect } from "react";
import DarkModeToggle from "../Components/DarkModeToggle";
import NotificationBar from "@/Components/NotificationBar";
import Chatbot from "@/Components/Chatbot";
import Footer from "../components/Footer";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

    const accountDropdownRef = useRef(null);

    const toggleAccountDropdown = () =>
        setIsAccountDropdownOpen((prev) => !prev);

    const closeDropdowns = () => setIsAccountDropdownOpen(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!accountDropdownRef.current?.contains(event.target)) {
                closeDropdowns();
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const navItems = [
        { href: "/dashboard", label: "Home", icon: "bi-house-door" },
    ];

    const userActions = user
        ? [
              {
                  href: route("logout"),
                  label: "Uitloggen",
                  icon: "bi-box-arrow-right",
                  method: "post",
              },
          ]
        : [
              { href: "/login", label: "Login", icon: "bi-box-arrow-in-right" },
              { href: "/register", label: "Register", icon: "bi-person-plus" },
          ];

    const NavItem = ({ href, label, icon }) => (
        <NavLink
            href={href}
            className="flex items-center gap-x-4 px-4 py-3 text-gray-800 dark:text-gray-200 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700"
        >
            <i className={`bi ${icon} text-xl`}></i>
            <span className="flex-1">{label}</span>
        </NavLink>
    );

    return (
        <div className="min-h-screen bg-gray-200 dark:bg-gray-900">
            <NotificationBar />
            {/* Sticky Navigation */}
            <nav className="sticky top-0 py-12 backdrop-blur bg-gray-200 dark:bg-gray-900 z-50 ">
                <div className="container mx-auto flex justify-between items-center px-6">
                    {/* Start: Logo and Name */}
                    <div className="flex items-center -space-x-4">
                        <Link href="/dashboard">
                            <ApplicationLogo className="h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                        </Link>
                    </div>
                    <div className="lg:flex lg:items-center justify-center lg:space-x-1 hidden">
                        <NavLink
                            href="#"
                            className="text-sm font-medium antialiased hover:text-blue-500 dark:hover:text-blue-400"
                        >
                            Dashboard
                        </NavLink>
                        <NavLink
                            href="/voor-wie"
                            className="text-sm font-medium antialiased hover:text-blue-500 dark:hover:text-blue-400"
                        >
                            Apis
                        </NavLink>
                        <NavLink
                            href="/prijzen"
                            className="text-sm font-medium antialiased hover:text-blue-500 dark:hover:text-blue-400"
                        >
                            Prijzen
                        </NavLink>
                        <NavLink
                            href="/toepassing"
                            className="text-sm font-medium antialiased hover:text-blue-500 dark:hover:text-blue-400"
                        >
                            Aan de slag
                        </NavLink>
                        <NavLink
                            href="/demo"
                            className="text-sm font-medium antialiased hover:text-blue-500 dark:hover:text-blue-400"
                        >
                            Demo
                        </NavLink>
                        <NavLink
                            href="/contact"
                            className="text-sm font-medium antialiased hover:text-blue-500 dark:hover:text-blue-400"
                        >
                            Contact
                        </NavLink>
                    </div>
                    {/* Navigation Items */}
                    <div className="lg:flex lg:items-center justify-center lg:space-x-4 hidden"></div>

                    {/* User Dropdown */}
                    <div className="relative z-50" ref={accountDropdownRef}>
                        {user ? (
                            <button
                                onClick={toggleAccountDropdown}
                                className="flex ml-12 items-center justify-center h-10 w-10 bg-gray-900 dark:bg-gray-800 rounded-full shadow-md hover:scale-110 focus:outline-none"
                            >
                                {user?.profile_picture ? (
                                    <img
                                        src={user.profile_picture}
                                        alt={`${user.first_name}'s profile`}
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <svg
                                        className="h-6 w-6 text-gray-100 dark:text-gray-100"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 11c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4zm0 2c-4.418 0-8 3.582-8 8 0 .553.447 1 1 1h14c.553 0 1-.447 1-1 0-4.418-3.582-8-8-8z"
                                        />
                                    </svg>
                                )}
                            </button>
                        ) : (
                            <div className="ml-12 flex space-x-4">
                                <NavLink
                                    href="/login"
                                    className="text-sm font-medium  hover:text-blue-500 dark:hover:text-blue-400"
                                >
                                    Inlogen
                                </NavLink>
                                <NavLink
                                    href="/register"
                                    className="text-base font-semibol text-blue-50 dark:text-gray-900   bg-indigo-600 dark:bg-indigo-400  dark:hover:text-blue-900"
                                >
                                    Account aan maken
                                </NavLink>
                                     {/* Dark Mode Toggle */}
                                     <div className="block px-2 py-2 bg-none  ">
                                            <DarkModeToggle className="tranfla" />
                                        </div>
                            </div>

                        )}

                        {isAccountDropdownOpen && user && (
                            <div className="absolute left-1/2 transform -translate-x-1/2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-800 px-8 py-4 w-72">
                                <NavLink href="/profile">
                                    {user?.profile_picture ? (
                                        <img
                                            src={user.profile_picture}
                                            alt={`${user.first_name}'s profile`}
                                            className="h-14 w-14 rounded-full object-cover"
                                        />
                                    ) : (
                                        <img
                                            src="/img/cover.png"
                                            alt="default"
                                            className="h-300 w-100 rounded-lg object-cover"
                                        />
                                    )}
                                </NavLink>
                                <p className="text-lg font-bold text-gray-100 dark:text-gray-400">
                                    {user?.first_name || "Guest"}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                    {user?.email || "No email provided"}
                                </p>
                                <>
                                    <NavLink
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className="block px-4 py-2 text-center bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600"
                                    >
                                        <i className="bi bi-box-arrow-right mr-2"></i>{" "}
                                        Log Out
                                    </NavLink>
                                </>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
           <section>     <Footer /></section>
        </div>
    );
}
