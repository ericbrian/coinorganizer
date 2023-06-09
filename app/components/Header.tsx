import Link from "next/link";
import SignInButton from "../context-component/SignInButton";

const Header = () => {
  return (
    <header className="noprint flex h-16 max-h-16 flex-col justify-center bg-stone-100">
      <nav className="container">
        <ul className="flex items-center justify-between gap-8 font-medium tracking-wider text-stone-500">
          <li className="text-sm">
            <Link href="/">Home</Link>
          </li>
          <li className="text-sm">
            <Link href="/protected/server">Protected (server)</Link>
          </li>
          <li className="text-sm">
            <Link href="/protected/client">Protected (client)</Link>
          </li>
          <li className="text-sm">
            <Link href="/admin">Admin</Link>
          </li>
          <li>
            <SignInButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
