import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Menu, Search, MapPin, User, Store } from 'lucide-react';
import logo from '@/assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
   
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
  
  const handleLogout = () => {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userRegistered');
    localStorage.removeItem('hasStore');
    navigate('/');
    window.location.reload(); // Refresh to update UI state
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Logo SewaQ" className="h-14 w-auto" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SewaQ
            </span>
          </Link>

          {/* Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-foreground" onClick={() => navigate('/items')}>
              <MapPin className="h-4 w-4 mr-2" />
              Jelajahi
            </Button>
            <Button variant="ghost" size="sm" className="text-foreground" onClick={() => navigate('/open-store')}>
              <Store className="h-4 w-4 mr-2" />
              Toko Saya
            </Button>
            
            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {isLoggedIn ? (
                  <>
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      Profil
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={() => navigate('/login')}>
                      Masuk
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/register')}>
                      Daftar
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start text-foreground" onClick={() => navigate('/explore')}>
              <MapPin className="h-4 w-4 mr-2" />
              Jelajahi
            </Button>
            <Button variant="ghost" className="w-full justify-start text-foreground" onClick={() => navigate('/dashboard')}>
              <Store className="h-4 w-4 mr-2" />
              Toko Saya
            </Button>
            
            {/* Mobile Profile Menu */}
            <div className="border-t pt-2 mt-2">
              {isLoggedIn ? (
                <>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/profile')}>
                    <User className="h-4 w-4 mr-2" />
                    Profil
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
                    <User className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/login')}>
                    <User className="h-4 w-4 mr-2" />
                    Masuk
                  </Button>
                  <Button variant="cta" className="w-full justify-start mt-2" onClick={() => navigate('/register')}>
                    Daftar
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;