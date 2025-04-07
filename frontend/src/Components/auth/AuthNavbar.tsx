import { Link } from 'react-router-dom';
import { GiConsoleController } from 'react-icons/gi';

export default function AuthNavbar() {
  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-md">
            <GiConsoleController className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
            Player Review
          </span>
        </Link>
      </div>
    </header>
  );
} 