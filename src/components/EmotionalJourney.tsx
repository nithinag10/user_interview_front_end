import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmotionalPhase } from '@/types/interview';
import { TrendingUp } from 'lucide-react';

interface EmotionalJourneyProps {
  journey: EmotionalPhase[];
}

const EmotionalJourney = ({ journey }: EmotionalJourneyProps) => {
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Emotional Journey</h2>
        <p className="text-sm text-muted-foreground">
          How their emotional state evolved throughout the conversation
        </p>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Emotional Flow Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/20" />
            
            <div className="space-y-6">
              {journey.map((phase, index) => (
                <div key={index} className="relative flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl z-10">
                    {phase.emoji}
                  </div>
                  <div className="flex-1 pt-2">
                    <h4 className="font-semibold text-foreground mb-1">{phase.phase}</h4>
                    <p className="text-sm text-muted-foreground">{phase.emotion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmotionalJourney;
