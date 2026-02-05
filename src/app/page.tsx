// src/app/page.tsx

"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import { 
  Mic, Brain, Target, CheckCircle, Sparkles, 
  ArrowRight, Users, Building2, Briefcase, StopCircle 
} from "lucide-react";
import { 
  delay, generateMockVoiceAnalysis, storage, 
  STORAGE_KEYS, formatSkillLevel 
} from "@/lib/utils";
import { interviewQuestions, getResponse, getGenericResponse } from "@/lib/mock-responses";
import type { SkillLevel, ToneType, CompanyType, InterviewStage, SkillSet, InterviewContext, VoicePatterns } from "@/types";

type SetupStep = "voice" | "skills" | "context" | "demo";

export default function HumanModePage() {
  const [currentStep, setCurrentStep] = useState<SetupStep>("voice");
  
  // Voice setup state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisMessage, setAnalysisMessage] = useState("");
  const [voicePatterns, setVoicePatterns] = useState<VoicePatterns | null>(null);
  const [recordingTimer, setRecordingTimer] = useState<NodeJS.Timeout | null>(null);

  // Skills setup state
  const [skills, setSkills] = useState<SkillSet>({
    react: "intermediate",
    kubernetes: "intermediate",
    machineLearning: "beginner",
    systemDesign: "intermediate",
  });

  // Context setup state
  const [context, setContext] = useState<InterviewContext>({
    companyType: "startup",
    interviewStage: "technical",
    desiredVibe: "professional",
  });

  // Demo state
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  // Check if returning user
  useEffect(() => {
    const savedSkills = storage.get(STORAGE_KEYS.SKILLS);
    const savedContext = storage.get(STORAGE_KEYS.INTERVIEW_CONTEXT);
    const savedVoice = storage.get(STORAGE_KEYS.VOICE_PATTERNS);

    if (savedSkills && savedContext && savedVoice) {
      setSkills(savedSkills);
      setContext(savedContext);
      setVoicePatterns(savedVoice);
      setCurrentStep("demo");
    }
  }, []);

  // ========== VOICE RECORDING ==========
  const startRecording = async () => {
    setIsRecording(true);
    setRecordingTime(0);

    const timer = setInterval(() => {
      setRecordingTime((prev) => {
        if (prev >= 120) {
          clearInterval(timer);
          handleStopRecording();
          return 120;
        }
        return prev + 1;
      });
    }, 1000);

    setRecordingTimer(timer);
  };

  const handleStopRecording = async () => {
    if (recordingTimer) {
      clearInterval(recordingTimer);
      setRecordingTimer(null);
    }
    
    setIsRecording(false);
    setIsAnalyzing(true);

    const steps = [
      { progress: 15, message: "Processing audio...", duration: 500 },
      { progress: 35, message: "Analyzing speech patterns...", duration: 800 },
      { progress: 55, message: "Detecting vocabulary style...", duration: 700 },
      { progress: 75, message: "Identifying tone and pace...", duration: 600 },
      { progress: 90, message: "Calibrating voice fingerprint...", duration: 500 },
      { progress: 100, message: "Analysis complete!", duration: 400 },
    ];

    for (const step of steps) {
      setAnalysisProgress(step.progress);
      setAnalysisMessage(step.message);
      await delay(step.duration);
    }

    const patterns = generateMockVoiceAnalysis();
    setVoicePatterns(patterns);
    storage.set(STORAGE_KEYS.VOICE_PATTERNS, patterns);

    setIsAnalyzing(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // ========== SKILLS SETUP ==========
  const handleSkillChange = (skill: keyof SkillSet, level: SkillLevel) => {
    setSkills((prev) => ({ ...prev, [skill]: level }));
  };

  // ========== CONTEXT SETUP ==========
  const handleContextChange = <K extends keyof InterviewContext>(
    key: K,
    value: InterviewContext[K]
  ) => {
    setContext((prev) => ({ ...prev, [key]: value }));
  };

  // ========== DEMO ==========
  const handleQuestionSelect = async (questionKey: string) => {
    setSelectedQuestion(questionKey);
    setShowComparison(false);
    setIsGenerating(true);

    await delay(1500);

    setIsGenerating(false);
    setShowComparison(true);
  };

  const getSkillLevelForQuestion = (questionKey: string): SkillLevel => {
    const categoryToSkill: Record<string, keyof SkillSet> = {
      "Machine Learning": "machineLearning",
      "System Design": "systemDesign",
      "Frontend Development": "react",
      "Backend Development": "systemDesign",
    };

    const question = interviewQuestions[questionKey as keyof typeof interviewQuestions];
    const skillKey = categoryToSkill[question.category];
    return skills[skillKey] || "intermediate";
  };

  const questions = Object.keys(interviewQuestions).map((key) => ({
    key,
    ...interviewQuestions[key as keyof typeof interviewQuestions],
  }));

  // ========== NAVIGATION ==========
  const goToNextStep = () => {
    if (currentStep === "voice") {
      storage.set(STORAGE_KEYS.VOICE_PATTERNS, voicePatterns);
      setCurrentStep("skills");
    } else if (currentStep === "skills") {
      storage.set(STORAGE_KEYS.SKILLS, skills);
      setCurrentStep("context");
    } else if (currentStep === "context") {
      storage.set(STORAGE_KEYS.INTERVIEW_CONTEXT, context);
      setCurrentStep("demo");
    }
  };

  const getStepProgress = () => {
    const steps = { voice: 33, skills: 66, context: 100, demo: 100 };
    return steps[currentStep];
  };

  // ========== RENDER ==========
  return (
    <div className="min-h-screen gradient-bg py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Parakeetai Human Mode AI</h1>
          <p className="text-gray-600">
            AI answers with <strong>Voice Matching</strong> + <strong>Skill Calibration</strong> + <strong>Context Awareness</strong>
          </p>
        </div>

        {/* Progress Bar (only show during setup) */}
        {currentStep !== "demo" && (
          <div className="mb-8">
            <Progress value={getStepProgress()} className="mb-2" />
            <p className="text-sm text-center text-gray-500">
              Step {currentStep === "voice" ? "1" : currentStep === "skills" ? "2" : "3"} of 3
            </p>
          </div>
        )}

        {/* ========== STEP 1: VOICE ========== */}
        {currentStep === "voice" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="w-6 h-6 text-primary-500" />
                1. Voice Fingerprint
              </CardTitle>
              <CardDescription>
                Record a 2-minute sample so we can match your speaking style
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isRecording && !isAnalyzing && !voicePatterns && (
                <>
                  <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                    <p className="text-sm text-primary-800">
                      <strong>What we analyze:</strong> Vocabulary level, sentence length, filler words, tone, and speaking pace.
                    </p>
                  </div>
                  <div className="text-center py-8">
                    <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mic className="w-12 h-12 text-primary-600" />
                    </div>
                    <Button size="lg" onClick={startRecording} className="bg-gray-900 hover:bg-gray-800 text-white">
                      Start Recording
                      <Mic className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </>
              )}

              {isRecording && (
                <div className="text-center py-8">
                  <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 recording-pulse">
                    <Mic className="w-16 h-16 text-red-600" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{formatTime(recordingTime)}</div>
                  <p className="text-gray-600 mb-6">Recording in progress...</p>
                  
                  {/* Waveform */}
                  <div className="flex items-center justify-center gap-1 h-16 mb-6">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-primary-500 waveform-bar"
                        style={{ animationDelay: `${i * 0.05}s` }}
                      />
                    ))}
                  </div>
                  
                  <Progress value={(recordingTime / 120) * 100} className="mb-6" />
                  
                  <Button 
                    size="lg" 
                    variant="destructive" 
                    onClick={handleStopRecording}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <StopCircle className="mr-2 w-5 h-5" />
                    Stop Recording
                  </Button>
                </div>
              )}

              {isAnalyzing && (
                <div className="text-center py-8">
                  <Spinner size="lg" className="mx-auto mb-6" />
                  <h3 className="text-xl font-semibold mb-2">Analyzing Your Voice...</h3>
                  <p className="text-gray-600 mb-6">{analysisMessage}</p>
                  <Progress value={analysisProgress} />
                </div>
              )}

              {voicePatterns && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-900">Voice Analysis Complete!</h3>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                    <h4 className="font-semibold mb-3">Detected Patterns:</h4>
                    <div className="grid gap-2 text-sm">
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Vocabulary Level</span>
                        <span className="font-medium text-gray-900">{voicePatterns.vocabularyLevel}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Sentence Length</span>
                        <span className="font-medium text-gray-900">{voicePatterns.sentenceLength}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Tone</span>
                        <span className="font-medium text-gray-900">{voicePatterns.tone}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Speaking Pace</span>
                        <span className="font-medium text-gray-900">{voicePatterns.speakingPace}</span>
                      </div>
                      <div className="py-2">
                        <span className="text-gray-600 block mb-2">Common Phrases:</span>
                        <div className="flex flex-wrap gap-2">
                          {voicePatterns.commonPhrases.map((phrase: string, idx: number) => (
                            <span key={idx} className="badge-primary text-xs">"{phrase}"</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-gray-900 hover:bg-gray-800" onClick={goToNextStep}>
                    Continue to Skills
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* ========== STEP 2: SKILLS ========== */}
        {currentStep === "skills" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-primary-500" />
                2. Confidence Calibration
              </CardTitle>
              <CardDescription>
                Rate your skills honestly. We'll match answer confidence to your level.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <p className="text-sm text-primary-800">
                  <strong>Why this matters:</strong> Claiming expert knowledge when you're intermediate gets you caught. 
                  Honest calibration makes answers sound authentic.
                </p>
              </div>

              {Object.keys(skills).map((skillKey) => (
                <div key={skillKey} className="space-y-2">
                  <h4 className="font-medium capitalize text-gray-900">
                    {skillKey.replace(/([A-Z])/g, " $1").trim()}
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {(["beginner", "intermediate", "expert"] as SkillLevel[]).map((level) => {
                      const isSelected = skills[skillKey as keyof SkillSet] === level;
                      return (
                        <button
                          key={level}
                          onClick={() => handleSkillChange(skillKey as keyof SkillSet, level)}
                          className={`
                            p-3 rounded-lg border-2 text-sm font-medium transition-all
                            ${isSelected
                              ? "bg-primary-500 text-white border-primary-600 ring-2 ring-primary-300"
                              : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                            }
                          `}
                        >
                          <span className="capitalize">{level}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <Button className="w-full bg-gray-900 hover:bg-gray-800" onClick={goToNextStep}>
                Continue to Context
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* ========== STEP 3: CONTEXT ========== */}
        {currentStep === "context" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6 text-primary-500" />
                3. Context Adaptation
              </CardTitle>
              <CardDescription>
                Tell us about the interview. Answers will adapt to fit the room.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <p className="text-sm text-primary-800">
                  <strong>Context matters:</strong> The same answer sounds different at a startup vs a bank. 
                  We adjust formality, energy, and word choice.
                </p>
              </div>

              {/* Company Type */}
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Company Type</h4>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "startup" as CompanyType, label: "Startup", icon: <Users className="w-4 h-4" /> },
                    { value: "midsize" as CompanyType, label: "Mid-Size", icon: <Building2 className="w-4 h-4" /> },
                    { value: "enterprise" as CompanyType, label: "Enterprise", icon: <Briefcase className="w-4 h-4" /> },
                  ].map((type) => {
                    const isSelected = context.companyType === type.value;
                    return (
                      <button
                        key={type.value}
                        onClick={() => handleContextChange("companyType", type.value)}
                        className={`
                          p-3 rounded-lg border-2 text-sm font-medium transition-all
                          ${isSelected
                            ? "bg-primary-500 text-white border-primary-600"
                            : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                          }
                        `}
                      >
                        <div className="flex items-center justify-center gap-2">
                          {type.icon}
                          <span>{type.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Interview Stage */}
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Interview Stage</h4>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "phone_screen" as InterviewStage, label: "Phone Screen" },
                    { value: "technical" as InterviewStage, label: "Technical" },
                    { value: "final_round" as InterviewStage, label: "Final Round" },
                  ].map((stage) => {
                    const isSelected = context.interviewStage === stage.value;
                    return (
                      <button
                        key={stage.value}
                        onClick={() => handleContextChange("interviewStage", stage.value)}
                        className={`
                          p-3 rounded-lg border-2 text-sm font-medium transition-all
                          ${isSelected
                            ? "bg-primary-500 text-white border-primary-600"
                            : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                          }
                        `}
                      >
                        <span>{stage.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Vibe */}
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Desired Vibe</h4>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "casual" as ToneType, label: "Casual" },
                    { value: "professional" as ToneType, label: "Professional" },
                    { value: "formal" as ToneType, label: "Formal" },
                  ].map((vibe) => {
                    const isSelected = context.desiredVibe === vibe.value;
                    return (
                      <button
                        key={vibe.value}
                        onClick={() => handleContextChange("desiredVibe", vibe.value)}
                        className={`
                          p-3 rounded-lg border-2 text-sm font-medium transition-all
                          ${isSelected
                            ? "bg-primary-500 text-white border-primary-600"
                            : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                          }
                        `}
                      >
                        <span>{vibe.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <Button className="w-full bg-gray-900 hover:bg-gray-800" onClick={goToNextStep}>
                See Demo
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* ========== STEP 4: DEMO ========== */}
        {currentStep === "demo" && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                Human Mode Demo
              </div>
              <h2 className="text-3xl font-bold mb-2">
                See Your <span className="gradient-text">Personalized Answers</span>
              </h2>
              <p className="text-gray-600">
                All 3 features working together: Voice + Skills + Context
              </p>
            </div>

            {/* Question Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select an Interview Question</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {questions.map((q) => (
                  <button
                    key={q.key}
                    onClick={() => handleQuestionSelect(q.key)}
                    className={`
                      w-full p-4 rounded-lg border-2 text-left transition-all
                      ${selectedQuestion === q.key
                        ? "border-primary-500 bg-primary-50"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                      }
                    `}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <span className="text-xs font-medium text-primary-600 bg-primary-100 px-2 py-1 rounded">
                          {q.category}
                        </span>
                        <p className="font-medium mt-2 text-gray-900">{q.question}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Comparison */}
            {selectedQuestion && (
              <>
                {isGenerating ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Spinner size="lg" className="mx-auto mb-4" />
                      <p className="text-gray-600">Generating personalized answer...</p>
                    </CardContent>
                  </Card>
                ) : showComparison && (
                  <>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Without */}
                      <Card className="border-2 border-red-200 bg-red-50/30">
                        <CardHeader>
                          <CardTitle className="text-red-700">❌ Without Human Mode</CardTitle>
                          <CardDescription className="text-red-600">Generic AI - sounds robotic</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-white rounded p-4 mb-4">
                            <p className="text-sm leading-relaxed text-gray-700">
                              {getGenericResponse(selectedQuestion as keyof typeof interviewQuestions)}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <span className="badge bg-red-100 text-red-700 text-xs">Too formal</span>
                            <span className="badge bg-red-100 text-red-700 text-xs">Robotic</span>
                            <span className="badge bg-red-100 text-red-700 text-xs">Generic</span>
                          </div>
                        </CardContent>
                      </Card>

                      {/* With */}
                      <Card className="border-2 border-primary-300 bg-primary-50/50">
                        <CardHeader>
                          <CardTitle className="text-primary-700">✓ With Human Mode</CardTitle>
                          <CardDescription className="text-primary-600">Personalized to YOU</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-white rounded p-4 mb-4">
                            <p className="text-sm leading-relaxed text-gray-700">
                              {getResponse(
                                selectedQuestion as keyof typeof interviewQuestions,
                                getSkillLevelForQuestion(selectedQuestion),
                                context.desiredVibe
                              )}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <span className="badge-primary text-xs">Natural vocabulary</span>
                            <span className="badge-primary text-xs">{getSkillLevelForQuestion(selectedQuestion)} level</span>
                            <span className="badge-primary text-xs">{context.desiredVibe} tone</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* What Changed */}
                    <Card className="bg-gradient-to-br from-primary-50 to-white border-2 border-primary-200">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-primary-600" />
                          All 3 Features Working Together
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-3 gap-6">
                          <div>
                            <h4 className="font-semibold text-sm text-primary-900 mb-2 flex items-center gap-2">
                              <Mic className="w-4 h-4" />
                              Voice Matching
                            </h4>
                            <p className="text-sm text-gray-700">
                              Adjusted vocabulary and sentence structure to match your natural speaking style
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-sm text-primary-900 mb-2 flex items-center gap-2">
                              <Brain className="w-4 h-4" />
                              Skill Calibration
                            </h4>
                            <p className="text-sm text-gray-700">
                              Calibrated to your <strong>{getSkillLevelForQuestion(selectedQuestion)}</strong> level - 
                              honest about what you know
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-sm text-primary-900 mb-2 flex items-center gap-2">
                              <Target className="w-4 h-4" />
                              Context Awareness
                            </h4>
                            <p className="text-sm text-gray-700">
                              Adapted for <strong>{context.companyType}</strong> company 
                              with <strong>{context.desiredVibe}</strong> vibe
                            </p>
                          </div>
                        </div>
                      </CardContent>
</Card>

                    <Card className="border-2 border-gray-300 bg-white">
                      <CardContent className="py-6 text-center">
                        <h3 className="text-xl font-semibold mb-2">Want to Try Different Settings?</h3>
                        <p className="text-gray-600 mb-4">
                          Reset and experiment with different voice patterns, skill levels, or contexts
                        </p>
                        <Button 
                          variant="outline"
                          size="lg"
                          onClick={() => {
                            storage.clear();
                            setCurrentStep("voice");
                            setVoicePatterns(null);
                            setSelectedQuestion(null);
                            setShowComparison(false);
                            setRecordingTime(0);
                          }}
                          className="bg-white border-gray-300 hover:bg-gray-50"
                        >
                          <ArrowRight className="mr-2 w-4 h-4 rotate-180" />
                          Start Over From Beginning
                        </Button>
                      </CardContent>
                    </Card>
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}