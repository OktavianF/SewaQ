import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-8">
            <div className="text-8xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              404
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Halaman Tidak Ditemukan
            </h1>
            <p className="text-muted-foreground">
              Maaf, halaman yang Anda cari tidak dapat ditemukan atau mungkin telah dipindahkan.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="cta" size="lg">
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Kembali ke Beranda
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" onClick={() => window.history.back()}>
              <span className="cursor-pointer">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Halaman Sebelumnya
              </span>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
