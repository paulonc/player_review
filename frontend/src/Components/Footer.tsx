import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaTwitch } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-16">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-xl mb-4 text-white">Navigation</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-secondary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/games" className="hover:text-secondary transition-colors">
                Games
              </Link>
            </li>
            <li>
              <Link to="/publishers" className="hover:text-secondary transition-colors">
                Publishers
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-secondary transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-secondary transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-4 text-white">Community</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/forum" className="hover:text-secondary transition-colors">
                Forum
              </Link>
            </li>
            <li>
              <Link to="/guides" className="hover:text-secondary transition-colors">
                Game Guides
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-secondary transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/events" className="hover:text-secondary transition-colors">
                Gaming Events
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-4 text-white">Contact</h3>
          <ul className="space-y-2">
            <li>
              Email:{' '}
              <a
                href="mailto:player_review@gmail.com"
                className="hover:text-secondary transition-colors"
              >
                player_review@gmail.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-4 text-white">
            PlayerReview Newsletter
          </h3>
          <p className="text-sm mb-4">
            Receive reviews, tips, and the latest gaming news.
          </p>
          <form>
            <Input
              type="email"
              placeholder="Your email"
              className="w-full p-2 mb-4 rounded-full bg-muted text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300">
              Subscribe
            </Button>
          </form>
          <div className="mt-6 flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-secondary transition-colors"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-secondary transition-colors"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-secondary transition-colors"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://twitch.tv"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-secondary transition-colors"
            >
              <FaTwitch size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
        <p>
          Developed by <strong>@paulovictornc</strong>. All rights reserved © {new Date().getFullYear()}.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
