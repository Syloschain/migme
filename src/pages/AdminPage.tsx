
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoleManagement from "@/components/admin/RoleManagement";
import SuperMentorCredits from "@/components/admin/SuperMentorCredits";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const AdminPage = () => {
  const { user, profile, loading, isSuperMentor } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Allow access to supermentors for credit management or admins for role management
  if (!user || (!profile?.is_admin && !isSuperMentor())) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs defaultValue="roles">
        <TabsList className="mb-4">
          <TabsTrigger value="roles" disabled={!profile?.is_admin}>Role Management</TabsTrigger>
          <TabsTrigger value="credits" disabled={!isSuperMentor()}>Credit Management</TabsTrigger>
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
