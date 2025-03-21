export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      badges: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
        }
        Relationships: []
      }
      banned_users: {
        Row: {
          banned_by: string | null
          created_at: string | null
          id: string
          room_id: string
          user_id: string
        }
        Insert: {
          banned_by?: string | null
          created_at?: string | null
          id?: string
          room_id: string
          user_id: string
        }
        Update: {
          banned_by?: string | null
          created_at?: string | null
          id?: string
          room_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "banned_users_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_locked: boolean | null
          message_type: string | null
          room_id: string | null
          sender_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_locked?: boolean | null
          message_type?: string | null
          room_id?: string | null
          sender_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_locked?: boolean | null
          message_type?: string | null
          room_id?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_rooms: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          name: string
          online_count: number | null
          owner_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name: string
          online_count?: number | null
          owner_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
          online_count?: number | null
          owner_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_rooms_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      credit_transactions: {
        Row: {
          amount: number
          created_at: string | null
          description: string | null
          id: string
          profile_id: string | null
          reference_id: string | null
          transaction_type: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          description?: string | null
          id?: string
          profile_id?: string | null
          reference_id?: string | null
          transaction_type: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string | null
          id?: string
          profile_id?: string | null
          reference_id?: string | null
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "credit_transactions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      friends: {
        Row: {
          created_at: string | null
          friend_id: string
          status: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          friend_id: string
          status?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          friend_id?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "friends_friend_id_fkey"
            columns: ["friend_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "friends_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      game_participants: {
        Row: {
          joined_at: string | null
          profile_id: string
          score: number | null
          session_id: string
          status: string | null
        }
        Insert: {
          joined_at?: string | null
          profile_id: string
          score?: number | null
          session_id: string
          status?: string | null
        }
        Update: {
          joined_at?: string | null
          profile_id?: string
          score?: number | null
          session_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "game_participants_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_participants_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "game_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      game_sessions: {
        Row: {
          created_at: string | null
          ended_at: string | null
          game_id: string | null
          id: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          ended_at?: string | null
          game_id?: string | null
          id?: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          ended_at?: string | null
          game_id?: string | null
          id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "game_sessions_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      games: {
        Row: {
          created_at: string | null
          description: string | null
          game_type: string
          id: string
          image_url: string | null
          min_credits: number | null
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          game_type: string
          id?: string
          image_url?: string | null
          min_credits?: number | null
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          game_type?: string
          id?: string
          image_url?: string | null
          min_credits?: number | null
          name?: string
        }
        Relationships: []
      }
      gift_transactions: {
        Row: {
          created_at: string | null
          gift_id: string | null
          id: string
          is_public: boolean | null
          message: string | null
          receiver_id: string | null
          sender_id: string | null
        }
        Insert: {
          created_at?: string | null
          gift_id?: string | null
          id?: string
          is_public?: boolean | null
          message?: string | null
          receiver_id?: string | null
          sender_id?: string | null
        }
        Update: {
          created_at?: string | null
          gift_id?: string | null
          id?: string
          is_public?: boolean | null
          message?: string | null
          receiver_id?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gift_transactions_gift_id_fkey"
            columns: ["gift_id"]
            isOneToOne: false
            referencedRelation: "gifts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gift_transactions_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gift_transactions_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      gifts: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          is_premium: boolean | null
          name: string
          price: number
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_premium?: boolean | null
          name: string
          price: number
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_premium?: boolean | null
          name?: string
          price?: number
        }
        Relationships: []
      }
      kicked_users: {
        Row: {
          created_at: string | null
          id: string
          kicked_by: string | null
          room_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          kicked_by?: string | null
          room_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          kicked_by?: string | null
          room_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "kicked_users_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      merchant_transactions: {
        Row: {
          amount: number
          commission: number
          created_at: string | null
          customer_id: string | null
          id: string
          merchant_id: string | null
          status: string | null
        }
        Insert: {
          amount: number
          commission: number
          created_at?: string | null
          customer_id?: string | null
          id?: string
          merchant_id?: string | null
          status?: string | null
        }
        Update: {
          amount?: number
          commission?: number
          created_at?: string | null
          customer_id?: string | null
          id?: string
          merchant_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "merchant_transactions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "merchant_transactions_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      migcredit_wallets: {
        Row: {
          balance: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          balance?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          balance?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      muted_users: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          muted_by: string | null
          room_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          muted_by?: string | null
          room_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          muted_by?: string | null
          room_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "muted_users_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      private_chat_participants: {
        Row: {
          chat_id: string
          profile_id: string
        }
        Insert: {
          chat_id: string
          profile_id: string
        }
        Update: {
          chat_id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "private_chat_participants_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "private_chats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "private_chat_participants_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      private_chats: {
        Row: {
          created_at: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      private_messages: {
        Row: {
          chat_id: string | null
          content: string
          created_at: string | null
          id: string
          is_locked: boolean | null
          is_read: boolean | null
          message_type: string | null
          sender_id: string | null
        }
        Insert: {
          chat_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          is_locked?: boolean | null
          is_read?: boolean | null
          message_type?: string | null
          sender_id?: string | null
        }
        Update: {
          chat_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          is_locked?: boolean | null
          is_read?: boolean | null
          message_type?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "private_messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "private_chats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "private_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          credit_balance: number | null
          id: string
          is_admin: boolean | null
          is_mentor: boolean | null
          is_merchant: boolean | null
          is_moderator: boolean | null
          is_owner: boolean | null
          is_vip: boolean | null
          level: number | null
          merchant_credits: number | null
          roles: Database["public"]["Enums"]["user_role"][] | null
          status: string | null
          total_xp: number | null
          updated_at: string | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          credit_balance?: number | null
          id: string
          is_admin?: boolean | null
          is_mentor?: boolean | null
          is_merchant?: boolean | null
          is_moderator?: boolean | null
          is_owner?: boolean | null
          is_vip?: boolean | null
          level?: number | null
          merchant_credits?: number | null
          roles?: Database["public"]["Enums"]["user_role"][] | null
          status?: string | null
          total_xp?: number | null
          updated_at?: string | null
          username: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          credit_balance?: number | null
          id?: string
          is_admin?: boolean | null
          is_mentor?: boolean | null
          is_merchant?: boolean | null
          is_moderator?: boolean | null
          is_owner?: boolean | null
          is_vip?: boolean | null
          level?: number | null
          merchant_credits?: number | null
          roles?: Database["public"]["Enums"]["user_role"][] | null
          status?: string | null
          total_xp?: number | null
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      room_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          room_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["user_role"]
          room_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          room_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "room_roles_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      user_badges: {
        Row: {
          acquired_at: string | null
          badge_id: string
          profile_id: string
        }
        Insert: {
          acquired_at?: string | null
          badge_id: string
          profile_id: string
        }
        Update: {
          acquired_at?: string | null
          badge_id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_badges_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      virtual_gifts: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          is_limited: boolean | null
          is_premium: boolean | null
          name: string
          price: number
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_limited?: boolean | null
          is_premium?: boolean | null
          name: string
          price: number
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_limited?: boolean | null
          is_premium?: boolean | null
          name?: string
          price?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      assign_room_role: {
        Args: {
          room_id: string
          target_user: string
          role: Database["public"]["Enums"]["user_role"]
        }
        Returns: undefined
      }
      generate_credits: {
        Args: {
          admin_id: string
          target_user_id: string
          amount: number
        }
        Returns: undefined
      }
      send_gift: {
        Args: {
          sender_id: string
          receiver_id: string
          gift_id: string
          message?: string
          is_public?: boolean
        }
        Returns: string
      }
      update_user_role: {
        Args: {
          target_user: string
          role: Database["public"]["Enums"]["user_role"]
          add_role: boolean
        }
        Returns: undefined
      }
    }
    Enums: {
      user_role:
        | "admin"
        | "owner"
        | "moderator"
        | "mentor"
        | "merchant"
        | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
