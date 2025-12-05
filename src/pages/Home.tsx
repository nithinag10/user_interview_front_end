import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Megaphone, Calendar, Flame, AlertTriangle, Zap } from 'lucide-react';
import Header from '@/components/Header';
import { AnimatedTerminal } from '@/components/AnimatedTerminal';

const Home = () => {
  return (
    <div className="min-h-screen bg-charcoal text-gray-100">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-divider">
        <div className="container mx-auto px-6 md:px-8 py-24 lg:py-40">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center max-w-7xl mx-auto">
            {/* Left: Text Content */}
            <div className="space-y-10 animate-fade-in">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] font-sans">
                  Stop believing your own hype.{' '}
                  <span className="text-cyan">Validate your startup idea with brutal honesty.</span>
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-400 leading-relaxed font-sans">
                  Don't ask friends who lie to be polite. We simulate a "Mom Test" interview between a ruthless AI investigator and a skeptical AI customer persona representing your market.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 items-start pt-2">
                <Link to="/new-interview" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto gap-3 bg-cyan hover:bg-cyan-600 text-charcoal font-bold text-lg px-10 py-7 shadow-xl shadow-cyan/30 hover:shadow-cyan/50 transition-all border-0 rounded-md"
                  >
                    Test My Idea Now
                    <ArrowRight className="h-6 w-6" />
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-gray-500 font-mono pt-1">
                No credit card required. Get results in 2 minutes.
              </p>
            </div>

            {/* Right: Animated Terminal */}
            <div className="animate-slide-up lg:pl-8">
              <AnimatedTerminal />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Agitation Section */}
      <section className="py-20 md:py-24 lg:py-28 bg-slate/50 border-b border-divider">
        <div className="container mx-auto px-6 md:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-16 font-sans">
            The <span className="text-burnt-orange">"Happy Ears"</span> Problem
          </h2>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {/* False Positives */}
            <div className="space-y-5 p-7 lg:p-8 bg-charcoal border-2 border-divider rounded-xl hover:border-burnt-orange/60 transition-all duration-300 hover:shadow-lg hover:shadow-burnt-orange/10">
              <div className="w-16 h-16 rounded-xl bg-burnt-orange/10 flex items-center justify-center border-2 border-burnt-orange/30">
                <Megaphone className="h-8 w-8 text-burnt-orange" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white font-sans">False Positives</h3>
              <p className="text-gray-400 leading-relaxed text-base font-sans">
                You pitch your solution. People say "That sounds neat!" just to end the conversation. You build it. Nobody buys.
              </p>
            </div>

            {/* The Scheduling Void */}
            <div className="space-y-5 p-7 lg:p-8 bg-charcoal border-2 border-divider rounded-xl hover:border-burnt-orange/60 transition-all duration-300 hover:shadow-lg hover:shadow-burnt-orange/10">
              <div className="w-16 h-16 rounded-xl bg-burnt-orange/10 flex items-center justify-center border-2 border-burnt-orange/30">
                <Calendar className="h-8 w-8 text-burnt-orange" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white font-sans">The Scheduling Void</h3>
              <p className="text-gray-400 leading-relaxed text-base font-sans">
                Trying to book 20 qualified prospects for Zoom calls takes weeks of painful outreach.
              </p>
            </div>

            {/* Building in the Dark */}
            <div className="space-y-5 p-7 lg:p-8 bg-charcoal border-2 border-divider rounded-xl hover:border-burnt-orange/60 transition-all duration-300 hover:shadow-lg hover:shadow-burnt-orange/10">
              <div className="w-16 h-16 rounded-xl bg-burnt-orange/10 flex items-center justify-center border-2 border-burnt-orange/30">
                <Flame className="h-8 w-8 text-burnt-orange" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white font-sans">Building in the Dark</h3>
              <p className="text-gray-400 leading-relaxed text-base font-sans">
                Writing code before knowing if anyone cares is the most expensive hobby in the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Schematic Section */}
      <section className="py-24 md:py-28 lg:py-32 border-b border-divider">
        <div className="container mx-auto px-6 md:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-6 font-sans">
            The <span className="text-cyan">First-Principles</span> Validation Engine
          </h2>
          <p className="text-center text-gray-400 text-lg md:text-xl mb-20 max-w-3xl mx-auto leading-relaxed">
            No fluff. No marketing speak. Just adversarial simulation based on behavioral economics.
          </p>

          <div className="max-w-6xl mx-auto space-y-16">
            {/* Step 1 */}
            <div className="grid md:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-start">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-cyan/10 flex items-center justify-center border-2 border-cyan/40 font-mono text-cyan font-bold text-xl shadow-lg shadow-cyan/10">
                  01
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 font-sans">The Intake</h3>
                  <p className="text-xs text-gray-500 font-mono tracking-widest">YOU DEFINE THE CONSTRAINTS</p>
                </div>
              </div>
              <div className="bg-slate border-2 border-divider rounded-xl p-7 lg:p-8 hover:border-cyan/30 transition-colors">
                <p className="text-gray-300 leading-relaxed text-base md:text-lg font-sans">
                  Don't pitch. Tell us the specific persona, their current alternative, and their budget reality. We need constraints, not dreams.
                </p>
              </div>
            </div>

            {/* Connector Line */}
            <div className="flex justify-center">
              <div className="w-px h-12 bg-gradient-to-b from-divider via-divider to-transparent" />
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-start">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-cyan/10 flex items-center justify-center border-2 border-cyan/40 font-mono text-cyan font-bold text-xl shadow-lg shadow-cyan/10">
                  02
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 font-sans">The Adversarial Simulation</h3>
                  <p className="text-xs text-gray-500 font-mono tracking-widest">THE MOM TEST PROTOCOL</p>
                </div>
              </div>
              <div className="bg-slate border-2 border-divider rounded-xl p-7 lg:p-8 hover:border-cyan/30 transition-colors space-y-5">
                <p className="text-gray-300 leading-relaxed text-base md:text-lg font-sans">
                  Our Interviewer Agent grills the Customer Agent based on behavioral economics, not flattery.
                </p>
                <div className="flex items-center gap-4 text-sm pt-2">
                  <div className="flex items-center gap-2 px-3 py-2 bg-cyan/10 rounded-lg border border-cyan/20">
                    <Zap className="h-5 w-5 text-cyan" />
                    <span className="text-cyan font-mono font-semibold">Interviewer</span>
                  </div>
                  <span className="text-gray-500 font-bold">VS</span>
                  <div className="flex items-center gap-2 px-3 py-2 bg-burnt-orange/10 rounded-lg border border-burnt-orange/20">
                    <AlertTriangle className="h-5 w-5 text-burnt-orange" />
                    <span className="text-burnt-orange font-mono font-semibold">Customer</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Connector Line */}
            <div className="flex justify-center">
              <div className="w-px h-12 bg-gradient-to-b from-divider via-divider to-transparent" />
            </div>

            {/* Step 3 */}
            <div className="grid md:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-start">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-cyan/10 flex items-center justify-center border-2 border-cyan/40 font-mono text-cyan font-bold text-xl shadow-lg shadow-cyan/10">
                  03
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 font-sans">The Autopsy</h3>
                  <p className="text-xs text-gray-500 font-mono tracking-widest">BUSINESS EXPERT SYNTHESIS</p>
                </div>
              </div>
              <div className="bg-slate border-2 border-divider rounded-xl p-7 lg:p-8 hover:border-cyan/30 transition-colors">
                <p className="text-gray-300 leading-relaxed text-base md:text-lg font-sans">
                  A third agent reviews the transcript to identify friction points, lack of budget, and flawed assumptions. This is where delusions die.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 md:py-28 lg:py-32 bg-slate/30">
        <div className="container mx-auto px-6 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-sans max-w-4xl mx-auto leading-tight">
            Ready for the <span className="text-burnt-orange">harsh truth</span>?
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            It's better to know now than 6 months from now.
          </p>
          <Link to="/new-interview">
            <Button
              size="lg"
              className="gap-3 bg-cyan hover:bg-cyan-600 text-charcoal font-bold text-lg md:text-xl px-12 py-8 shadow-2xl shadow-cyan/30 hover:shadow-cyan/50 transition-all border-0 rounded-lg"
            >
              Run Your First Simulation Free
              <ArrowRight className="h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
