
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { ApiClient } from "@/services/ApiClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import UserRoleBadge from "@/components/profile/UserRoleBadge";
import { UserRole } from "@/utils/roleUtils";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface UserWithRoles {
  id: string;
  username: string;
  roles: UserRole[];
  is_admin: boolean;
  is_mentor: boolean;
  is_merchant: boolean;
  is_moderator: boolean;
  is_owner: boolean;
}

const RoleManagement = () => {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isAdmin()) {
      fetchUsers();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, roles, is_admin, is_mentor, is_merchant, is_moderator, is_owner')
        .order('username');
      
      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (userId: string, role: UserRole, checked: boolean) => {
    try {
      await ApiClient.updateUserRole(userId, role, checked);
      
      // Update local state
      setUsers(prevUsers => 
        prevUsers.map(user => {
          if (user.id === userId) {
            const roleProperty = `is_${role}` as keyof UserWithRoles;
            const newRoles = checked 
              ? [...user.roles, role].filter((v, i, a) => a.indexOf(v) === i) // Add unique
              : user.roles.filter(r => r !== role); // Remove
              
            return {
              ...user,
              [roleProperty]: checked,
              roles: newRoles
            };
          }
          return user;
        })
      );
      
      toast({
        title: "Role Updated",
        description: `User role has been ${checked ? 'granted' : 'revoked'} successfully`,
      });
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive"
      });
    }
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAdmin()) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            You don't have permission to access this page.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Role Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="search">Search Users</Label>
            <Input
              id="search"
              placeholder="Search by username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="text-center py-4">Loading users...</div>
          ) : (
            <div className="space-y-4">
              {filteredUsers.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  No users found
                </div>
              ) : (
                filteredUsers.map(user => (
                  <div key={user.id} className="border p-4 rounded-md">
                    <div className="flex items-center justify-between mb-4">
                      <UserRoleBadge 
                        username={user.username} 
                        roles={user.roles}
                      />
                      <div className="text-xs text-muted-foreground">
                        ID: {user.id}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                      {['admin', 'mentor', 'merchant', 'moderator', 'owner'].map((role) => {
                        const roleKey = `is_${role}` as keyof UserWithRoles;
                        return (
                          <div key={role} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`${user.id}-${role}`}
                              checked={user[roleKey] as boolean}
                              onCheckedChange={(checked) => 
                                updateRole(user.id, role as UserRole, checked === true)
                              }
                            />
                            <Label htmlFor={`${user.id}-${role}`}>
                              {role.charAt(0).toUpperCase() + role.slice(1)}
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
          
          <Button onClick={fetchUsers} disabled={loading}>
            Refresh Users
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoleManagement;
