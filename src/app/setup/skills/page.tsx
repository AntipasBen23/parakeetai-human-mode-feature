// src/app/setup/skills/page.tsx

"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, ArrowRight, CheckCircle } from "lucide-react";
import { storage, STORAGE_KEYS } from "@/lib/utils";
import type { SkillLevel, SkillSet } from "@/types";

export default function SkillsSetupPage() {
  const router = useRouter();
  const [skills, setSkills] = useState<SkillSet>({
    react: "intermediate" as SkillLevel,
    kubernetes: "intermediate" as SkillLevel,
    machineLearning: "beginner" as SkillLevel,
    systemDesign: "intermediate" as SkillLevel,
  });

  useEffect(() => {
    // Load saved skills if they exist
    const savedSkills = storage.get(STORAGE_KEYS.SKILLS);
    if (savedSkills) {
      setSkills(savedSkills);
    }
  }, []);

  const handleSkillChange = (skill: keyof SkillSet, level: SkillLevel) => {
    setSkills((prev) => ({
      ...prev,
      [skill]: level,
    }));
  };

  const handleContinue = () => {
    // Save to localStorage
    storage.set(STORAGE_KEYS.SKILLS, skills);
    router.push("/setup/context");
  };

  const skillLabels: Record<keyof SkillSet, string> = {
    react: "React / Frontend",
    kubernetes: "Kubernetes / DevOps",
    machineLearning: "Machine Learning",
    systemDesign: "System Design",
  };

  const levelDescriptions: Record<SkillLevel, { label: string; description: string; color: string }> = {
    beginner: {
      label: "Beginner",
      description: "Learning the basics, limited hands-on experience",
      color: "bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-200",
    },
    intermediate: {
      label: "Intermediate",
      description: "Practical experience, comfortable with core concepts",
      color: "bg-yellow-100 border-yellow-300 text-yellow-700 hover:bg-yellow-200",
    },
    expert: {
      label: "Expert",
      description: "Deep expertise, can architect solutions independently",
      color: "bg-green-100 border-green-300 text-green-700 hover:bg-green-200",
    },
  };

  return (
    <div className="min-h-screen gradient-bg py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Step 2 of 3</span>
            <span className="text-sm text-gray-500">Skill Calibration</span>
          </div>
          <Progress value={66} />
        </div>

        {/* Main Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary-500" />
              Confidence Calibration
            </CardTitle>
            <CardDescription>
              Rate your skill level honestly. We'll calibrate answer confidence to match your actual expertise.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Info Box */}
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <div className="flex gap-2">
                <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-primary-900 mb-1">Why This Matters</h3>
                  <p className="text-sm text-primary-800">
                    Being honest about your skill level makes answers sound authentic. Claiming expert-level 
                    knowledge when you're still learning is the #1 way to get caught using AI.
                  </p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-6">
              {(Object.keys(skills) as Array<keyof SkillSet>).map((skillKey) => (
                <div key={skillKey} className="space-y-3">
                  <h4 className="font-medium text-gray-900">{skillLabels[skillKey]}</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(["beginner", "intermediate", "expert"] as SkillLevel[]).map((level) => {
                      const isSelected = skills[skillKey] === level;
                      const config = levelDescriptions[level];
                      
                      return (
                        <button
                          key={level}
                          onClick={() => handleSkillChange(skillKey, level)}
                          className={`
                            p-4 rounded-lg border-2 transition-all text-left
                            ${isSelected 
                              ? config.color + " ring-2 ring-offset-2 ring-primary-500" 
                              : "bg-white border-gray-200 hover:border-gray-300"
                            }
                          `}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <div className={`
                              w-4 h-4 rounded-full border-2 flex items-center justify-center
                              ${isSelected ? "border-current" : "border-gray-300"}
                            `}>
                              {isSelected && (
                                <div className="w-2 h-2 rounded-full bg-current" />
                              )}
                            </div>
                            <span className="font-semibold text-sm">
                              {config.label}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 ml-6">
                            {config.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Example Preview */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <h4 className="font-semibold text-gray-900 text-sm">
                Example: How answers adapt based on your Machine Learning level
              </h4>
              
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="badge bg-blue-100 text-blue-700 border-blue-200 text-xs flex-shrink-0">
                    Beginner
                  </span>
                  <p className="text-gray-600 italic">
                    "I'm still learning ML, but my understanding is neural networks learn from mistakes..."
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <span className="badge bg-yellow-100 text-yellow-700 border-yellow-200 text-xs flex-shrink-0">
                    Intermediate
                  </span>
                  <p className="text-gray-600 italic">
                    "I've built some models with TensorFlow - like a basic image classifier..."
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <span className="badge bg-green-100 text-green-700 border-green-200 text-xs flex-shrink-0">
                    Expert
                  </span>
                  <p className="text-gray-600 italic">
                    "I've architected everything from CNNs for vision tasks to transformers for NLP..."
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Button 
                variant="outline" 
                onClick={() => router.push("/setup/voice")}
              >
                Back
              </Button>
              <Button 
                className="flex-1" 
                onClick={handleContinue}
              >
                Continue to Context
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            💡 Tip: You can always adjust these later from the settings
          </p>
        </div>
      </div>
    </div>
  );
}