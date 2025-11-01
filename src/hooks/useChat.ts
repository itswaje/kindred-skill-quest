import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  is_read: boolean;
  attachment_url?: string;
  created_at: string;
}

export const useChat = (userId: string | undefined) => {
  const [conversations, setConversations] = useState<ChatUser[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch conversations (mentorships)
  useEffect(() => {
    if (!userId) return;

    const fetchConversations = async () => {
      const { data, error } = await supabase
        .from('mentorships')
        .select('*')
        .or(`mentor_id.eq.${userId},learner_id.eq.${userId}`)
        .eq('status', 'active');

      if (error) {
        console.error('Error fetching conversations:', error);
        return;
      }

      // Transform mentorships into chat users
      const chatUsers: ChatUser[] = await Promise.all(
        data.map(async (mentorship) => {
          const otherUserId = mentorship.mentor_id === userId 
            ? mentorship.learner_id 
            : mentorship.mentor_id;

          // Fetch last message
          const { data: lastMsg } = await supabase
            .from('messages')
            .select('*')
            .or(`and(sender_id.eq.${userId},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${userId})`)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

          // Count unread messages
          const { count } = await supabase
            .from('messages')
            .select('*', { count: 'exact', head: true })
            .eq('sender_id', otherUserId)
            .eq('receiver_id', userId)
            .eq('is_read', false);

          return {
            id: otherUserId,
            name: mentorship.skill, // This should be replaced with actual user name
            avatar: mentorship.skill.substring(0, 2).toUpperCase(),
            lastMessage: lastMsg?.content || 'No messages yet',
            time: lastMsg ? new Date(lastMsg.created_at).toLocaleTimeString() : '',
            unread: count || 0,
          };
        })
      );

      setConversations(chatUsers);
      setLoading(false);
    };

    fetchConversations();
  }, [userId]);

  // Fetch messages for selected chat
  useEffect(() => {
    if (!userId || !selectedChat) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${userId},receiver_id.eq.${selectedChat}),and(sender_id.eq.${selectedChat},receiver_id.eq.${userId})`)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        return;
      }

      setMessages(data || []);

      // Mark messages as read
      await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('sender_id', selectedChat)
        .eq('receiver_id', userId)
        .eq('is_read', false);
    };

    fetchMessages();

    // Set up realtime subscription
    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${userId}`,
        },
        (payload) => {
          if (payload.new.sender_id === selectedChat) {
            setMessages((prev) => [...prev, payload.new as Message]);
            
            // Mark as read immediately
            supabase
              .from('messages')
              .update({ is_read: true })
              .eq('id', payload.new.id);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, selectedChat]);

  const sendMessage = async (content: string) => {
    if (!userId || !selectedChat || !content.trim()) return;

    const { error } = await supabase
      .from('messages')
      .insert({
        sender_id: userId,
        receiver_id: selectedChat,
        content: content.trim(),
      });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive',
      });
      console.error('Error sending message:', error);
    }
  };

  return {
    conversations,
    messages,
    selectedChat,
    setSelectedChat,
    sendMessage,
    loading,
  };
};
