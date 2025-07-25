import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileInfo from '@/components/userProfile/ProfileInfo';
import ReviewHistory from '@/components/userProfile/ReviewHistory';
import Penyewaan from '@/components/userProfile/Penyewaan';
import AccountSettings from '@/components/userProfile/AccountSettings';
import { User, MessageSquare, Package, Settings } from 'lucide-react';

const ProfilePage = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-8">Profil Pengguna</h1>
            
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Informasi Pribadi
                </TabsTrigger>
                <TabsTrigger value="reviews" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Review
                </TabsTrigger>
                <TabsTrigger value="rentals" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Penyewaan
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Pengaturan Akun
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <ProfileInfo />
              </TabsContent>

              <TabsContent value="reviews">
                <ReviewHistory />
              </TabsContent>

              <TabsContent value="rentals">
                <Penyewaan />
              </TabsContent>

              <TabsContent value="settings">
                <AccountSettings />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;