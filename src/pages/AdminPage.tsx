
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoleManagement from "@/components/admin/RoleManagement";
import SuperMentorCredits from "@/components/admin/SuperMentorCredits";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const AdminPage = () => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Only allow access to admins or supermentors
  if (!user || (!profile?.is_admin && !profile?.roles?.includes('supermentor'))) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs defaultValue="roles">
        <TabsList className="mb-4">
          <TabsTrigger value="roles">Role Management</TabsTrigger>
          <TabsTrigger value="credits">Credit Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="roles">
          <RoleManagement />
        </TabsContent>
        
        <TabsContent value="credits">
          <SuperMentorCredits />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
