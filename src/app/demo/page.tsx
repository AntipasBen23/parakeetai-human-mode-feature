// src/app/demo/page.tsx

"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Sparkles, AlertCircle, Settings } from "lucide-react";
import { storage, STORAGE_KEYS, delay } from "@/lib/utils";
import { interviewQuestions, getResponse, getGenericResponse } from "@/lib/mock-responses";
import type { SkillLevel, ToneType, SkillSet, InterviewContext } from "@/types";

export default function DemoPage() {
  const router = useRouter();
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [userSkills, setUserSkills] = useState<SkillSet | null>(null);
  const [userContext, setUserContext] = useState<InterviewContext | null>(null);

  useEffect(() => {
    // Load user profile
    const skills = storage.get(STORAGE_KEYS.SKILLS);
    const context = storage.get(STORAGE_KEYS.INTERVIEW_CONTEXT);
    
    setUserSkills(skills);
    setUserContext(context);

    // Check if setup is complete
    if (!skills || !context) {
      // Redirect to setup if not complete
      router.push("/setup/voice");
    }
  }, [router]);

  const handleQuestionSelect = async (questionKey: string) => {
    setSelectedQuestion(questionKey);
    setShowComparison(false);
    setIsGenerating(true);

    // Simulate AI generation delay
    await delay(1500);

    setIsGenerating(false);
    setShowComparison(true);
  };

  const getSkillLevelForQuestion = (questionKey: string): SkillLevel => {
    if (!userSkills) return "intermediate";

    // Map question categories to skill keys
    const categoryToSkill: Record<string, keyof SkillSet> = {
      "Machine Learning": "machineLearning",
      "System Design": "systemDesign",
      "Frontend Development": "react",
      "Backend Development": "systemDesign",
    };

    const question = interviewQuestions[questionKey as keyof typeof interviewQuestions];
    const skillKey = categoryToSkill[question.category];

    return userSkills[skillKey] || "intermediate";
  };

  const questions = Object.keys(interviewQuestions).map((key) => ({
    key,
    ...interviewQuestions[key as keyof typeof interviewQuestions],
  }));

  if (!userSkills || !userContext) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-yellow-500" />
              Setup Required
            </CardTitle>
            <CardDescription>
              Please complete the setup process first
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/setup/voice")} className="w-full">
              Go to Setup
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Button variant="outline" onClick={() => router.push("/")}>
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
          
          <Button variant="outline" onClick={() => router.push("/setup/voice")}>
            <Settings className="mr-2 w-4 h-4" />
            Adjust Settings
          </Button>
        </div>

        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Human Mode AI Demo
          </div>
          <h1 className="text-4xl font-bold mb-4">
            See Your <span className="gradient-text">Personalized Answers</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select any interview question below to see how Human Mode adapts answers to match 
            your voice, skills, and interview context.
          </p>
        </div>

        {/* Current Settings Display */}
        <Card className="mb-8 bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-lg">Your Current Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Company:</span>
                <p className="font-medium capitalize">{userContext.companyType}</p>
              </div>
              <div>
                <span className="text-gray-600">Stage:</span>
                <p className="font-medium capitalize">{userContext.interviewStage.replace("_", " ")}</p>
              </div>
              <div>
                <span className="text-gray-600">Vibe:</span>
                <p className="font-medium capitalize">{userContext.desiredVibe}</p>
              </div>
              <div>
                <span className="text-gray-600">ML Level:</span>
                <p className="font-medium capitalize">{userSkills.machineLearning}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Select an Interview Question</CardTitle>
            <CardDescription>
              Click any question to see the before/after comparison
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {questions.map((q) => (
                <button
                  key={q.key}
                  onClick={() => handleQuestionSelect(q.key)}
                  className={`
                    p-4 rounded-lg border-2 text-left transition-all
                    ${selectedQuestion === q.key
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                    }
                  `}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-primary-600 bg-primary-100 px-2 py-1 rounded">
                          {q.category}
                        </span>
                      </div>
                      <p className="font-medium text-gray-900">{q.question}</p>
                    </div>
                    {selectedQuestion === q.key && (
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Comparison Display */}
        {selectedQuestion && (
          <div className="space-y-6">
            {isGenerating ? (
              <Card className="border-2 border-primary-200">
                <CardContent className="py-12">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Generating personalized answer...</p>
                  </div>
                </CardContent>
              </Card>
            ) : showComparison && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Without Human Mode */}
                <Card className="border-2 border-red-200 bg-red-50/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-700">
                      ❌ Without Human Mode
                    </CardTitle>
                    <CardDescription className="text-red-600">
                      Generic AI response - sounds robotic
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-white rounded-lg p-4 mb-4">
                      <p className="text-gray-700 leading-relaxed">
                        {getGenericResponse(selectedQuestion as keyof typeof interviewQuestions)}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-red-900">Issues:</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="badge bg-red-100 text-red-700 border-red-200 text-xs">
                          Too formal
                        </span>
                        <span className="badge bg-red-100 text-red-700 border-red-200 text-xs">
                          Robotic vocabulary
                        </span>
                        <span className="badge bg-red-100 text-red-700 border-red-200 text-xs">
                          Overconfident
                        </span>
                        <span className="badge bg-red-100 text-red-700 border-red-200 text-xs">
                          Generic structure
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* With Human Mode */}
                <Card className="border-2 border-primary-300 bg-primary-50/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    HUMAN MODE
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary-700">
                      ✓ With Human Mode
                    </CardTitle>
                    <CardDescription className="text-primary-600">
                      Personalized to your voice, skills, and context
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-white rounded-lg p-4 mb-4">
                      <p className="text-gray-700 leading-relaxed">
                        {getResponse(
                          selectedQuestion as keyof typeof interviewQuestions,
                          getSkillLevelForQuestion(selectedQuestion),
                          userContext.desiredVibe
                        )}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-primary-900">Improvements:</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="badge-primary text-xs">
                          Natural vocabulary
                        </span>
                        <span className="badge-primary text-xs">
                          Matched to {getSkillLevelForQuestion(selectedQuestion)} level
                        </span>
                        <span className="badge-primary text-xs">
                          {userContext.desiredVibe} tone
                        </span>
                        <span className="badge-primary text-xs">
                          {userContext.companyType} context
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Analysis Section */}
            {showComparison && !isGenerating && (
              <Card className="bg-gradient-to-br from-primary-50 to-white border-2 border-primary-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary-600" />
                    How Human Mode Adapted This Answer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-sm text-primary-900 mb-2">
                        🎤 Voice Matching
                      </h4>
                      <p className="text-sm text-gray-700">
                        Adjusted vocabulary and sentence structure to match your natural speaking style
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm text-primary-900 mb-2">
                        🎯 Skill Calibration
                      </h4>
                      <p className="text-sm text-gray-700">
                        Calibrated confidence to your <strong>{getSkillLevelForQuestion(selectedQuestion)}</strong> level 
                        in this area - honest about what you know
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm text-primary-900 mb-2">
                        💼 Context Awareness
                      </h4>
                      <p className="text-sm text-gray-700">
                        Adapted formality for <strong>{userContext.companyType}</strong> company 
                        with <strong>{userContext.desiredVibe}</strong> vibe
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* CTA Section */}
        {showComparison && (
          <Card className="mt-8 gradient-primary text-white">
            <CardContent className="py-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Ready to Use Human Mode?</h3>
              <p className="text-white/90 mb-6">
                Integrate this into ParakeetAI and never sound like AI again
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={() => handleQuestionSelect(questions[Math.floor(Math.random() * questions.length)].key)}
                >
                  Try Another Question
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                  onClick={() => router.push("/setup/voice")}
                >
                  Adjust Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}