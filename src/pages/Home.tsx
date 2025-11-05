import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare, Brain, BarChart3 } from 'lucide-react';
import Header from '@/components/Header';
import heroImage from '@/assets/hero-bg.jpg';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Understand your customers{' '}
              <span className="text-primary">deeply</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Run AI-powered interviews that uncover real pain points, motivations, and insights. 
              Watch your ideal AI customers getting interviewed.
            </p>
            <div className="pt-4">
              <Link to="/new-interview">

              
                <Button size="lg" className="gap-2 shadow-lg hover:shadow-xl transition-all">
                  Start Your First Interview
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-3 animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">AI-Powered Conversations</h3>
              <p className="text-sm text-muted-foreground">
                Two intelligent agents conduct natural, in-depth interviews that feel authentic and insightful.
              </p>
            </div>

            <div className="text-center space-y-3 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Deep Insights</h3>
              <p className="text-sm text-muted-foreground">
                Uncover pain points, goals, and emotional triggers that drive your customers' decisions.
              </p>
            </div>

            <div className="text-center space-y-3 animate-slide-up" style={{ animationDelay: '300ms' }}>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Actionable Results</h3>
              <p className="text-sm text-muted-foreground">
                Get structured summaries with clear product recommendations based on real user needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
