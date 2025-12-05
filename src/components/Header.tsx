import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="border-b border-divider bg-charcoal/95 backdrop-blur-md sticky top-0 z-50 shadow-lg shadow-black/20">
      <div className="container mx-auto px-6 md:px-8 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
          <div className="w-7 h-7 border-2 border-cyan rotate-45 flex items-center justify-center group-hover:border-cyan-600 transition-colors">
            <div className="w-2.5 h-2.5 bg-cyan rounded-sm rotate-45 group-hover:bg-cyan-600 transition-colors"></div>
          </div>
          <span className="font-mono text-xl text-white font-bold tracking-tight">Valid.ai</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          <Link
            to="/"
            className="text-sm font-medium text-gray-400 hover:text-cyan transition-colors font-sans"
          >
            How it Works
          </Link>
          <Link
            to="/insights"
            className="text-sm font-medium text-gray-400 hover:text-cyan transition-colors font-sans"
          >
            Pricing
          </Link>
          <Link
            to="/new-interview"
            className="text-sm font-medium text-gray-400 hover:text-cyan transition-colors font-sans"
          >
            Sign In
          </Link>
          <Link to="/new-interview">
            <Button
              variant="outline"
              size="sm"
              className="border-2 border-cyan text-cyan hover:bg-cyan hover:text-charcoal transition-all font-sans font-semibold px-6 py-2"
            >
              Run Simulation
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <Link to="/new-interview" className="md:hidden">
          <Button
            size="sm"
            className="bg-cyan hover:bg-cyan-600 text-charcoal font-bold border-0"
          >
            Start
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
