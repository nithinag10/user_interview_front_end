import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface InsightCardProps {
  title: string;
  items: string[];
  icon: LucideIcon;
  delay?: number;
}

const InsightCard = ({ title, items, icon: Icon, delay = 0 }: InsightCardProps) => {
  return (
    <Card 
      className="animate-scale-in hover:shadow-lg transition-shadow"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={index} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
              <span className="text-primary flex-shrink-0 mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default InsightCard;
