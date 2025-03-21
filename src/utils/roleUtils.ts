
export type UserRole = 'admin' | 'owner' | 'moderator' | 'mentor' | 'merchant' | 'user';

// Role colors based on the Migme specifications
export const roleColors: Record<UserRole, string> = {
  mentor: '#FF0000',     // Red
  merchant: '#800080',   // Purple
  admin: '#FFD700',      // Yellow
  owner: '#FFD700',      // Yellow
  moderator: '#FFD700',  // Yellow
  user: '#0000FF',       // Blue
};

// Get color based on role priority: 
// mentor > merchant > admin/owner/moderator > user
export const getUserRoleColor = (roles: UserRole[] = ['user'], isSelf: boolean = false): string => {
  // If viewing self, return black (not in the roleColors map)
  if (isSelf) return '#000000';
  
  if (roles.includes('mentor')) return roleColors.mentor;
  if (roles.includes('merchant')) return roleColors.merchant;
  if (roles.some(role => ['admin', 'owner', 'moderator'].includes(role))) return roleColors.admin;
  return roleColors.user;
};

// Get primary role based on priority
export const getPrimaryRole = (roles: UserRole[] = ['user']): UserRole => {
  if (roles.includes('mentor')) return 'mentor';
  if (roles.includes('merchant')) return 'merchant';
  if (roles.includes('admin')) return 'admin';
  if (roles.includes('owner')) return 'owner';
  if (roles.includes('moderator')) return 'moderator';
  return 'user';
};

// Format role name for display
export const formatRoleName = (role: UserRole): string => {
  return role.charAt(0).toUpperCase() + role.slice(1);
};
