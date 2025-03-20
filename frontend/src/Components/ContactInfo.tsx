import { Mail } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export function ContactInfo() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Contact Information</h2>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Mail className="w-5 h-5 text-primary" />
          <span>player_review@gmail.com</span>
        </div>
        <div className="mt-6">
          <p className="text-sm text-gray-600">
            Follow us on social media to stay up to date with the latest
            reviews and news in the world of games.
          </p>
          <div className="mt-4 flex space-x-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook
                className="text-blue-600 hover:text-blue-700 transition-colors"
                size={24}
              />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram
                className="text-pink-500 hover:text-pink-600 transition-colors"
                size={24}
              />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter
                className="text-blue-400 hover:text-blue-500 transition-colors"
                size={24}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}