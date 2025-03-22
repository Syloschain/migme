
-- Enable Realtime for game_participants table
ALTER TABLE public.game_participants REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.game_participants;

-- Enable Realtime for virtual_gifts table
ALTER TABLE public.virtual_gifts REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.virtual_gifts;

-- Enable Realtime for chat_messages table
ALTER TABLE public.chat_messages REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;

-- Enable Realtime for private_messages table
ALTER TABLE public.private_messages REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.private_messages;

-- Enable Realtime for profiles table
ALTER TABLE public.profiles REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
