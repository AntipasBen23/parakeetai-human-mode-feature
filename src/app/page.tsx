// src/app/page.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Mic, Brain, Target, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Human Mode AI</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-gray-600 hover:text-primary-600 transition">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-gray-600 hover:text-primary-600 transition">
              How It Works
            </a>
            <Link href="/demo">
              <Button>Try Demo</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Powered by ParakeetAI
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            AI Answers That Sound{" "}
            <span className="gradient-text">Genuinely Human</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto text-balance">
            Human Mode transforms generic AI responses into personalized answers that match your voice, 
            calibrate to your skill level, and adapt to any interview context.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/setup/voice">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                See Demo
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-primary-600">95%</div>
              <div className="text-sm text-gray-600">Undetectable</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600">3x</div>
              <div className="text-sm text-gray-600">More Natural</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600">2s</div>
              <div className="text-sm text-gray-600">Setup Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The Problem with AI Interview Help</h2>
            <p className="text-lg text-gray-600">
              Generic AI answers are easy to spot. They're too perfect, too formal, and don't match how real people actually talk.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-red-200 bg-red-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  ❌ Without Human Mode
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 italic">
                  "I would approach this by implementing a microservices architecture utilizing Kubernetes for 
                  orchestration, ensuring scalability and fault tolerance through distributed systems patterns."
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="badge bg-red-100 text-red-700 border-red-200">Too formal</span>
                  <span className="badge bg-red-100 text-red-700 border-red-200">Robotic vocabulary</span>
                  <span className="badge bg-red-100 text-red-700 border-red-200">Overconfident</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center my-6">
              <ArrowRight className="w-8 h-8 text-primary-500 rotate-90" />
            </div>

            <Card className="border-2 border-primary-200 bg-primary-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary-700">
                  ✓ With Human Mode
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 italic">
                  "Yeah, so I'd probably break it into smaller services, use Kubernetes to manage them. 
                  Makes it way easier to scale and handle failures. I've done similar stuff before but 
                  still learning the more advanced orchestration patterns."
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="badge-primary">Natural vocabulary</span>
                  <span className="badge-primary">Honest about skill level</span>
                  <span className="badge-primary">Conversational tone</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 gradient-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Three Powerful Features, One Goal</h2>
            <p className="text-lg text-gray-600">
              Human Mode uses AI to make AI undetectable
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <Card className="card-hover">
              <CardHeader>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <Mic className="w-6 h-6 text-primary-600" />
                </div>
                <CardTitle>Voice Fingerprint</CardTitle>
                <CardDescription>
                  Analyzes how you naturally speak
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Vocabulary complexity detection</li>
                  <li>• Sentence structure matching</li>
                  <li>• Filler word patterns</li>
                  <li>• Tone calibration</li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="card-hover">
              <CardHeader>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-primary-600" />
                </div>
                <CardTitle>Confidence Calibrator</CardTitle>
                <CardDescription>
                  Matches answers to your actual skill level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Beginner-friendly honesty</li>
                  <li>• Expert-level precision</li>
                  <li>• Prevents overselling</li>
                  <li>• Shows authentic curiosity</li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="card-hover">
              <CardHeader>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary-600" />
                </div>
                <CardTitle>Context Adapter</CardTitle>
                <CardDescription>
                  Reads the room and adjusts tone
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Startup vs Enterprise awareness</li>
                  <li>• Interview stage detection</li>
                  <li>• Formality adjustment</li>
                  <li>• Culture fit optimization</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Setup in 3 Simple Steps</h2>
            <p className="text-lg text-gray-600">
              Get personalized AI answers in under 2 minutes
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Step 1 */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Record Your Voice</h3>
                <p className="text-gray-600">
                  Talk naturally for 2 minutes. Our AI analyzes your vocabulary, tone, and speech patterns.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Set Your Skill Levels</h3>
                <p className="text-gray-600">
                  Rate yourself honestly in key areas. We'll calibrate answer confidence to match.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Configure Interview Context</h3>
                <p className="text-gray-600">
                  Tell us about the company and interview stage. Answers will adapt to fit the vibe.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/setup/voice">
              <Button size="lg">
                Start Setup Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Make AI Undetectable?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of candidates who've landed jobs using Human Mode AI
          </p>
          <Link href="/setup/voice">
            <Button size="lg" variant="secondary">
              Get Started Free
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">Human Mode AI</span>
            </div>
            
            <div className="text-sm text-gray-400">
              Built for ParakeetAI • Demo Prototype
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}