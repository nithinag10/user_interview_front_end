import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ContextualInsight } from '@/types/interview';
import { Clock, Zap, Shield } from 'lucide-react';

interface ContextualInsightsProps {
  insights: ContextualInsight;
}

const ContextualInsights = ({ insights }: ContextualInsightsProps) => {
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Contextual Insights</h2>
        <p className="text-sm text-muted-foreground">
          Situations, triggers, and barriers that shape their experience
        </p>
      </div>

      <div className="space-y-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              When do they feel the problem most?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {insights.whenProblemFelt.map((item, index) => (
                <li key={index} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                  <span className="text-primary flex-shrink-0 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              What triggers action or change?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {insights.triggersMoments.map((item, index) => (
                <li key={index} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                  <span className="text-primary flex-shrink-0 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              What prevents them from solving it?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {insights.preventionBarriers.map((item, index) => (
                <li key={index} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                  <span className="text-primary flex-shrink-0 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContextualInsights;
