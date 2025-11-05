import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeInsight } from '@/types/interview';
import { Quote } from 'lucide-react';

interface ThemeBreakdownProps {
  themes: ThemeInsight[];
}

const ThemeBreakdown = ({ themes }: ThemeBreakdownProps) => {
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Theme Breakdown</h2>
        <p className="text-sm text-muted-foreground">
          Key topics and patterns discovered in the conversation
        </p>
      </div>

      {themes.map((theme, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              <span>{theme.theme}</span>
              <span className="text-sm font-normal text-muted-foreground">
                {theme.emotionalTone}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Quote className="h-4 w-4 text-primary" />
                What They Said
              </h4>
              <div className="space-y-2">
                {theme.quotes.map((quote, qIndex) => (
                  <p key={qIndex} className="text-sm text-muted-foreground italic pl-4 border-l-2 border-primary/30">
                    "{quote}"
                  </p>
                ))}
              </div>
            </div>
            <div className="pt-2 border-t">
              <span className="text-sm font-medium text-foreground">Underlying Need: </span>
              <span className="text-sm text-primary font-medium">{theme.underlyingNeed}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ThemeBreakdown;
