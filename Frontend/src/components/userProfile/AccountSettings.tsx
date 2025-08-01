import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Lock, LogOut, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AccountSettings = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChangePassword = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "Semua field password harus diisi.",
        variant: "destructive"
      });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "Password baru dan konfirmasi password tidak cocok.",
        variant: "destructive"
      });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password baru minimal 8 karakter.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Password berhasil diubah",
      description: "Password Anda telah diperbarui.",
    });

    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logout berhasil",
      description: "Anda telah keluar dari akun.",
    });
    navigate('/');
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Akun berhasil dihapus",
      description: "Akun Anda telah dihapus permanen.",
    });
    navigate('/');
  };

  return (
    <div className="space-y-6">
      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Ganti Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Password Lama</Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              placeholder="Masukkan password lama"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">Password Baru</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              placeholder="Masukkan password baru"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Konfirmasi password baru"
            />
          </div>

          <Button onClick={handleChangePassword} className="w-full md:w-auto">
            Ubah Password
          </Button>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Pengaturan Akun</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Logout Button */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <LogOut className="h-5 w-5 text-muted-foreground" />
              <div>
                <h4 className="font-medium">Logout</h4>
                <p className="text-sm text-muted-foreground">Keluar dari akun Anda</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>

          {/* Delete Account Button */}
          <div className="flex items-center justify-between p-4 border rounded-lg border-destructive/20">
            <div className="flex items-center space-x-3">
              <Trash2 className="h-5 w-5 text-destructive" />
              <div>
                <h4 className="font-medium text-destructive">Hapus Akun</h4>
                <p className="text-sm text-muted-foreground">
                  Hapus akun secara permanen. Tindakan ini tidak dapat dibatalkan.
                </p>
              </div>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full sm:w-auto">
                  Hapus Akun
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[95vw] max-w-md mx-auto">
                <AlertDialogHeader>
                  <AlertDialogTitle>Konfirmasi Hapus Akun</AlertDialogTitle>
                  <AlertDialogDescription>
                    Apakah Anda yakin ingin menghapus akun ini? Semua data Anda akan dihapus secara permanen 
                    dan tidak dapat dipulihkan. Tindakan ini tidak dapat dibatalkan.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                  <AlertDialogCancel className="w-full sm:w-auto">Batal</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDeleteAccount}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90 w-full sm:w-auto"
                  >
                    Ya, Hapus Akun
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSettings;