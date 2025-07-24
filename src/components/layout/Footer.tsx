import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gradient-card border-t mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="Logo SewaQ" className="h-12 w-auto" />
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                SewaQ
              </span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Platform terpercaya untuk menyewa dan menyewakan barang di sekitar Anda. 
              Mudah, aman, dan terjangkau.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Tautan Cepat</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-primary transition-colors">
                  Cara Kerja
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-primary transition-colors">
                  Kategori
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-primary transition-colors">
                  Bantuan
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Dukungan</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Kontak
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary transition-colors">
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-6 mt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 SewaQ. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;