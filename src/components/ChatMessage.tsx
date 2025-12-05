import { ChatMessage as ChatMessageType } from '@/types/interview';
import { Zap, AlertTriangle } from 'lucide-react';

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
      className="flex gap-4 animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center border-2 ${
        isInterviewer
          ? 'bg-cyan/10 border-cyan/30'
          : 'bg-burnt-orange/10 border-burnt-orange/30'
      }`}>
        {isInterviewer ? (
          <Zap className="h-5 w-5 text-cyan" />
        ) : (
          <AlertTriangle className="h-5 w-5 text-burnt-orange" />
        )}
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-3">
          <span className={`text-sm font-bold font-mono ${
            isInterviewer ? 'text-cyan' : 'text-burnt-orange'
          }`}>
            {isInterviewer ? 'INTERVIEWER' : 'CUSTOMER'}
          </span>
          <span className="text-xs text-gray-500 font-mono">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed font-sans">{message.message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
