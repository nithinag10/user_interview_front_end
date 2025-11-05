import { Link, useLocation } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <MessageSquare className="h-6 w-6 text-primary" />
          <span className="font-semibold text-xl text-foreground">DeepTalk AI</span>
        </Link>
        
        {!isHome && (
          <nav className="flex items-center gap-6">
            <Link 
              to="/" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/new-interview" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              New Interview
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
