import { Link } from "react-router-dom";
import getButtonClassName from "@/utils/getButtonClassName";

export default function Navbar({ children }: { children: React.ReactNode }) {
  return (
    <nav className="mt-6 flex flex-row justify-center gap-3 align-middle">
      {children}
      <Link
        to={process.env.NODE_ENV === "production" ? "/react-arcade" : "/"}
        className={getButtonClassName()}
      >
        Home
      </Link>
    </nav>
  );
}
