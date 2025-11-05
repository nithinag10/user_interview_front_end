import { Card, CardContent } from '@/components/ui/card';

interface InsightsSummaryProps {
  summary: string;
  overallMood: string;
  moodEmoji: string;
  topicCloud: string[];
}

const InsightsSummary = ({ summary, overallMood, moodEmoji, topicCloud }: InsightsSummaryProps) => {
  return (
    <Card className="mb-6 border-2">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Conversation Summary
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {summary}
            </p>
          </div>
          
          <div className="flex items-center gap-3 pt-2">
            <span className="text-sm font-medium text-foreground">Overall Mood:</span>
            <span className="text-2xl">{moodEmoji}</span>
            <span className="text-sm text-muted-foreground">{overallMood}</span>
          </div>

          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Key Topics Discussed</h3>
            <div className="flex flex-wrap gap-2">
              {topicCloud.map((topic, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                  style={{
                    fontSize: `${0.75 + Math.random() * 0.25}rem`,
                    opacity: 0.7 + Math.random() * 0.3
                  }}
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightsSummary;
