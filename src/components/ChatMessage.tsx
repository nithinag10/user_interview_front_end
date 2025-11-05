import { ChatMessage as ChatMessageType } from '@/types/interview';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
  delay?: number;
}

const ChatMessage = ({ message, delay = 0 }: ChatMessageProps) => {
  const isInterviewer = message.agent === 'interviewer';

  // Convert timestamp string to Date object
  const timestamp = typeof message.timestamp === 'string'
    ? new Date(message.timestamp)
    : message.timestamp;

  return (
    <div
      className="flex gap-3 animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isInterviewer ? 'bg-primary/10' : 'bg-secondary'
      }`}>
        {isInterviewer ? (
          <Bot className="h-4 w-4 text-primary" />
        ) : (
          <User className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {isInterviewer ? 'Interviewer Agent' : 'Customer Agent'}
          </span>
          <span className="text-xs text-muted-foreground">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <p className="text-sm text-foreground leading-relaxed">{message.message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
