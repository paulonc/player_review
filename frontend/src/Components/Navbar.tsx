import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GiConsoleController } from 'react-icons/gi';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, Search } from 'lucide-react';
import { Input } from './ui/input';
import { FaHome, FaGamepad, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';
import { MdOutlineRateReview } from "react-icons/md";
import { useAuth } from '@/contexts/AuthContext';

const NAV_ITEMS = [
  { label: 'Home', path: '/', icon: <FaHome /> },
  { label: 'Games', path: '/games', icon: <FaGamepad /> },
  { label: 'Reviews', path: '/reviews', icon: <MdOutlineRateReview /> },
  { label: 'Contact', path: '/contact', icon: <FaEnvelope /> },
] as const;

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
        isScrolled ? 'shadow-md backdrop-blur-md' : 'backdrop-blur-none'
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-md">
            <GiConsoleController className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
            Player Review
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search games..."
              className="w-[200px] pl-8 md:w-[300px] rounded-full bg-muted/50 border-muted focus-visible:ring-primary"
            />
          </div>

          <Button
            onClick={logout}
            className="flex items-center gap-2 text-sm font-medium text-white bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-500 rounded-lg py-2 px-4 transition-all duration-300 transform hover:scale-105"
          >
            <FaSignOutAlt className="h-5 w-5" />
            <span>Logout</span>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-6">
                {NAV_ITEMS.map(({ label, path, icon }) => (
                  <Link
                    key={label}
                    to={path}
                    className="flex items-center gap-2 text-lg font-medium text-muted-foreground hover:text-primary"
                  >
                    {icon}
                    <span>{label}</span>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
