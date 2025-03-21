import { supabase } from "@/integrations/supabase/client";

// Function to sign in a user
const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      throw error;
    }

    return { session: data.session, user: data.user };
  } catch (error) {
    console.error("Error signing in:", error.message);
    throw error;
  }
};

// Function to sign up a user
const signUp = async (email, password, username) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username,
        },
      },
    });

    if (error) {
      throw error;
    }

    if (data?.user?.id) {
      await ApiClient.createProfile(data.user.id, username);
    }

    return { user: data.user };
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw error;
  }
};

// Function to sign out a user
const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Error signing out:", error.message);
    throw error;
  }
};

// Function to listen for authentication state changes
const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
};

// Function to get the current session
const getSession = async () => {
  return await supabase.auth.getSession();
};

// Function to create a user profile
const createProfile = async (userId, username) => {
  try {
    const { data, error } = await supabase.from("profiles").insert([
      {
        id: userId,
        username: username,
      },
    ]);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error creating profile:", error.message);
    throw error;
  }
};

// Function to get a user profile
const getProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    throw error;
  }
};

// Function to update a user profile
const updateProfile = async (userId, updates) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error updating profile:", error.message);
    throw error;
  }
};

export const ApiClient = {
  signIn,
  signUp,
  signOut,
  onAuthStateChange,
  getSession,
  createProfile,
  getProfile,
  updateProfile,

  // Update user role function
  updateUserRole: async (userId, role, addRole) => {
    try {
      const { data, error } = await supabase.rpc('update_user_role', {
        target_user: userId,
        role: role,
        add_role: addRole
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating user role:', error);
      throw error;
    }
  },

  // Check if user is a room moderator
  checkRoomRole: async (userId, roomId) => {
    try {
      const { data, error } = await supabase
        .from('room_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('room_id', roomId);
      
      if (error) throw error;
      
      const isOwner = data.some(r => r.role === 'owner');
      const isModerator = data.some(r => r.role === 'moderator');
      
      return {
        is_owner: isOwner,
        is_moderator: isModerator
      };
    } catch (error) {
      console.error('Error checking room role:', error);
      return {
        is_owner: false,
        is_moderator: false
      };
    }
  }
};
