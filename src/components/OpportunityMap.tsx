import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Compass } from 'lucide-react';

interface OpportunityMapProps {
  opportunities: string[];
}

const OpportunityMap = ({ opportunities }: OpportunityMapProps) => {
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Opportunity Map</h2>
        <p className="text-sm text-muted-foreground">
          Areas to explore and research further based on this conversation
        </p>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Compass className="h-5 w-5 text-primary" />
            Exploration Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {opportunities.map((opportunity, index) => (
              <li key={index} className="text-sm text-muted-foreground leading-relaxed flex gap-3 pb-4 border-b last:border-b-0 last:pb-0">
                <span className="text-primary font-bold flex-shrink-0 mt-0.5">{index + 1}.</span>
                <span>{opportunity}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default OpportunityMap;
