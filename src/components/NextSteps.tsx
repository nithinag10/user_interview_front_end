import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Plus, GitCompare, FileText, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const NextSteps = () => {
  return (
    <Card className="border-2 bg-primary/5">
      <CardHeader>
        <CardTitle className="text-lg">What's Next?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-3">
          <Link to="/new-interview" className="block">
            <Button variant="outline" className="w-full justify-start gap-2 h-auto py-3">
              <Plus className="h-4 w-4" />
              <div className="text-left">
                <div className="font-semibold">New Interview</div>
                <div className="text-xs text-muted-foreground font-normal">
                  Interview another persona
                </div>
              </div>
            </Button>
          </Link>

          <Button variant="outline" className="w-full justify-start gap-2 h-auto py-3" disabled>
            <GitCompare className="h-4 w-4" />
            <div className="text-left">
              <div className="font-semibold">Compare Insights</div>
              <div className="text-xs text-muted-foreground font-normal">
                Across multiple interviews
              </div>
            </div>
          </Button>

          <Button variant="outline" className="w-full justify-start gap-2 h-auto py-3" disabled>
            <FileText className="h-4 w-4" />
            <div className="text-left">
              <div className="font-semibold">Generate Questions</div>
              <div className="text-xs text-muted-foreground font-normal">
                Based on uncovered gaps
              </div>
            </div>
          </Button>

          <Button variant="outline" className="w-full justify-start gap-2 h-auto py-3" disabled>
            <Download className="h-4 w-4" />
            <div className="text-left">
              <div className="font-semibold">Export Insights</div>
              <div className="text-xs text-muted-foreground font-normal">
                Download as PDF or CSV
              </div>
            </div>
          </Button>
        </div>

        <div className="mt-4 pt-4 border-t text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Ready to conduct another deep interview?
          </p>
          <Link to="/new-interview">
            <Button size="lg" className="gap-2">
              Start Another Interview
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default NextSteps;
