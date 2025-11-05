import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HumanInsight } from '@/types/interview';
import { Heart, AlertCircle, Sparkles } from 'lucide-react';

interface HumanInsightsProps {
  insights: HumanInsight;
}

const HumanInsights = ({ insights }: HumanInsightsProps) => {
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Human Insight Layer</h2>
        <p className="text-sm text-muted-foreground">
          The psychological motivations and drivers behind their words
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Core Desires
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {insights.coreDesires.map((desire, index) => (
                <li key={index} className="text-sm text-muted-foreground leading-relaxed">
                  {desire}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Fears & Frustrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {insights.fearsOrFrustrations.map((fear, index) => (
                <li key={index} className="text-sm text-muted-foreground leading-relaxed">
                  {fear}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Aspirations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {insights.aspirations.map((aspiration, index) => (
                <li key={index} className="text-sm text-muted-foreground leading-relaxed">
                  {aspiration}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HumanInsights;
