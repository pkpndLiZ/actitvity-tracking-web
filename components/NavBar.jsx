import { useEffect, useState } from "react";
import Link from "next/link";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../src/firebase.js"; // Path to your firebase config file
import { useRouter } from "next/router";
import { BsFillPersonFill } from "react-icons/bs";
import defaultImg from "../public/images/mock/astronaut.png";
import Image from "next/image.js";

export function NavBar({ userData }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check user's login status initially
    const auth = getAuth(app);
    const initialUser = auth.currentUser;
    setIsLoggedIn(!!initialUser); // Set isLoggedIn based on the initial user

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    // Clean up the subscription when component unmounts
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      const auth = getAuth(app);
      await signOut(auth);
      setIsLoggedIn(false);
      router.push("/");
      window.location.reload();
    } catch (e) {
      console.log(e.message);
    }
  };

  const renderProfileIcon = () => {
    if (userData && userData.userImage) {
      return (
        <img
          src={userData.userImage}
          alt="User Profile"
          className="profile-image"
        />
      );
    } else {
      return <Image src={defaultImg} />;
    }
  };

  return (
    <nav className="navbar-container">
      <div className="left-navbar-container">
        <Link href="/">
          <span>Gym</span>
          <span>mini</span>
        </Link>
      </div>
      {isLoggedIn ? (
        <div className="right-navbar-container">
          {/* Render user-specific content */}
          <button
            className="border border-purple-400 text-purple-400 p-1 px-4 rounded-lg mr-2 hover:bg-purple-400 hover:text-gray-900 duration-500"
            onClick={handleLogout}
          >
            Logout
          </button>
          <div className="w-[40px] h-[40px]">
            <Link href="/profile">{renderProfileIcon()}</Link>
          </div>
        </div>
      ) : (
        <div className="right-navbar-container">
          {/* Render login and register links */}
          <span>Have an account?</span>
          <Link href="/login">Login</Link>
          <span>or</span>
          <Link href="/register">Register</Link>
        </div>
      )}
    </nav>
  );
}
