import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="bg-background fixed top-0 left-0 z-50 w-full border-b">
      <nav className="px-6 mx-auto max-w-5xl h-16 flex items-center">
        <Link className="font-bold text-lg" href="/">
          ServerActionsBlog
        </Link>
      </nav>
    </header>
  );
};
