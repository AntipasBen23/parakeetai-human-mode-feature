// src/app/setup/context/page.tsx

"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, ArrowRight, CheckCircle, Building2, Users, Briefcase } from "lucide-react";
import { storage, STORAGE_KEYS } from "@/lib/utils";
import type { CompanyType, InterviewStage, ToneType, InterviewContext } from "@/types";

export default function ContextSetupPage() {
  const router = useRouter();
  const [context, setContext] = useState<InterviewContext>({
    companyType: "startup",
    interviewStage: "technical",
    desiredVibe: "professional",
  });

  useEffect(() => {
    // Load saved context if it exists
    const savedContext = storage.get(STORAGE_KEYS.INTERVIEW_CONTEXT);
    if (savedContext) {
      setContext(savedContext);
    }
  }, []);

  const handleChange = <K extends keyof InterviewContext>(
    key: K,
    value: InterviewContext[K]
  ) => {
    setContext((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFinish = () => {
    // Save to localStorage
    storage.set(STORAGE_KEYS.INTERVIEW_CONTEXT, context);
    
    // Mark setup as complete
    storage.set(STORAGE_KEYS.USER_PROFILE, {
      voiceAnalyzed: true,
      skills: storage.get(STORAGE_KEYS.SKILLS),
      interviewContext: context,
    });

    // Navigate to demo
    router.push("/demo");
  };

  const companyTypes: Array<{
    value: CompanyType;
    label: string;
    description: string;
    icon: React.ReactNode;
  }> = [
    {
      value: "startup",
      label: "Startup",
      description: "Fast-paced, casual culture, move fast and break things",
      icon: <Users className="w-5 h-5" />,
    },
    {
      value: "midsize",
      label: "Mid-Size",
      description: "Established processes, balanced innovation and stability",
      icon: <Building2 className="w-5 h-5" />,
    },
    {
      value: "enterprise",
      label: "Enterprise",
      description: "Fortune 500, formal processes, emphasis on scale and reliability",
      icon: <Briefcase className="w-5 h-5" />,
    },
  ];

  const interviewStages: Array<{
    value: InterviewStage;
    label: string;
    description: string;
  }> = [
    {
      value: "phone_screen",
      label: "Phone Screen",
      description: "Initial recruiter call, high-level discussion",
    },
    {
      value: "technical",
      label: "Technical Round",
      description: "Deep-dive into skills, coding, architecture",
    },
    {
      value: "final_round",
      label: "Final Round",
      description: "Leadership interview, culture fit, offer discussion",
    },
  ];

  const vibeOptions: Array<{
    value: ToneType;
    label: string;
    description: string;
  }> = [
    {
      value: "casual",
      label: "Casual",
      description: "Relaxed, conversational, friendly",
    },
    {
      value: "professional",
      label: "Professional",
      description: "Balanced, clear, respectful",
    },
    {
      value: "formal",
      label: "Formal",
      description: "Structured, precise, corporate",
    },
  ];

  return (
    <div className="min-h-screen gradient-bg py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Step 3 of 3</span>
            <span className="text-sm text-gray-500">Interview Context</span>
          </div>
          <Progress value={100} />
        </div>

        {/* Main Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-6 h-6 text-primary-500" />
              Interview Context
            </CardTitle>
            <CardDescription>
              Tell us about the company and interview. Answers will adapt to fit the room.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Info Box */}
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <div className="flex gap-2">
                <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-primary-900 mb-1">Context Matters</h3>
                  <p className="text-sm text-primary-800">
                    The same technical answer sounds different at a startup vs a bank. We'll adjust 
                    formality, energy, and word choice to match the company culture.
                  </p>
                </div>
              </div>
            </div>

            {/* Company Type */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Company Type</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {companyTypes.map((type) => {
                  const isSelected = context.companyType === type.value;
                  return (
                    <button
                      key={type.value}
                      onClick={() => handleChange("companyType", type.value)}
                      className={`
                        p-4 rounded-lg border-2 transition-all text-left
                        ${isSelected
                          ? "bg-primary-100 border-primary-300 ring-2 ring-offset-2 ring-primary-500"
                          : "bg-white border-gray-200 hover:border-gray-300"
                        }
                      `}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`${isSelected ? "text-primary-600" : "text-gray-400"}`}>
                          {type.icon}
                        </div>
                        <span className="font-semibold text-sm">
                          {type.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">
                        {type.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interview Stage */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Interview Stage</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {interviewStages.map((stage) => {
                  const isSelected = context.interviewStage === stage.value;
                  return (
                    <button
                      key={stage.value}
                      onClick={() => handleChange("interviewStage", stage.value)}
                      className={`
                        p-4 rounded-lg border-2 transition-all text-left
                        ${isSelected
                          ? "bg-primary-100 border-primary-300 ring-2 ring-offset-2 ring-primary-500"
                          : "bg-white border-gray-200 hover:border-gray-300"
                        }
                      `}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`
                          w-4 h-4 rounded-full border-2 flex items-center justify-center
                          ${isSelected ? "border-primary-600" : "border-gray-300"}
                        `}>
                          {isSelected && (
                            <div className="w-2 h-2 rounded-full bg-primary-600" />
                          )}
                        </div>
                        <span className="font-semibold text-sm">
                          {stage.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 ml-6">
                        {stage.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Desired Vibe */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Desired Vibe</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {vibeOptions.map((vibe) => {
                  const isSelected = context.desiredVibe === vibe.value;
                  return (
                    <button
                      key={vibe.value}
                      onClick={() => handleChange("desiredVibe", vibe.value)}
                      className={`
                        p-4 rounded-lg border-2 transition-all text-left
                        ${isSelected
                          ? "bg-primary-100 border-primary-300 ring-2 ring-offset-2 ring-primary-500"
                          : "bg-white border-gray-200 hover:border-gray-300"
                        }
                      `}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`
                          w-4 h-4 rounded-full border-2 flex items-center justify-center
                          ${isSelected ? "border-primary-600" : "border-gray-300"}
                        `}>
                          {isSelected && (
                            <div className="w-2 h-2 rounded-full bg-primary-600" />
                          )}
                        </div>
                        <span className="font-semibold text-sm">
                          {vibe.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 ml-6">
                        {vibe.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Example Preview */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <h4 className="font-semibold text-gray-900 text-sm">
                Example: Same question, different contexts
              </h4>
              
              <div className="space-y-3 text-sm">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-900">Startup + Casual</span>
                  </div>
                  <p className="text-gray-600 italic ml-6">
                    "Honestly? I'd start with vertical scaling - throw more RAM at it. Most startups over-engineer too early."
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Briefcase className="w-4 h-4 text-purple-600" />
                    <span className="font-medium text-purple-900">Enterprise + Formal</span>
                  </div>
                  <p className="text-gray-600 italic ml-6">
                    "I would recommend a phased approach. Initial assessment of current load patterns, followed by implementing read replicas..."
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Button 
                variant="outline" 
                onClick={() => router.push("/setup/skills")}
              >
                Back
              </Button>
              <Button 
                className="flex-1 gradient-primary" 
                onClick={handleFinish}
              >
                Finish Setup & See Demo
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Completion Message */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            🎉 You're almost done! Next you'll see Human Mode in action
          </p>
        </div>
      </div>
    </div>
  );
}