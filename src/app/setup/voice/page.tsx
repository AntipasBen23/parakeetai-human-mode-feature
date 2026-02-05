// src/app/setup/voice/page.tsx

"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import { Mic, CheckCircle, ArrowRight } from "lucide-react";
import { delay, generateMockVoiceAnalysis, storage, STORAGE_KEYS } from "@/lib/utils";

export default function VoiceSetupPage() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisMessage, setAnalysisMessage] = useState("");
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [voicePatterns, setVoicePatterns] = useState<any>(null);

  const startRecording = async () => {
    setIsRecording(true);
    setRecordingTime(0);

    // Simulate 2-minute recording
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
  };

  const handleStopRecording = async () => {
    setIsRecording(false);
    setIsAnalyzing(true);

    // Simulate AI analysis with progress updates
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

    // Generate mock analysis results
    const patterns = generateMockVoiceAnalysis();
    setVoicePatterns(patterns);

    // Save to localStorage
    storage.set(STORAGE_KEYS.VOICE_PATTERNS, patterns);

    setIsAnalyzing(false);
    setAnalysisComplete(true);
  };

  const handleContinue = () => {
    router.push("/setup/skills");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen gradient-bg py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Step 1 of 3</span>
            <span className="text-sm text-gray-500">Voice Fingerprint</span>
          </div>
          <Progress value={33} />
        </div>

        {/* Main Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="w-6 h-6 text-primary-500" />
              Voice Fingerprint Analysis
            </CardTitle>
            <CardDescription>
              Record a 2-minute voice sample so we can match your natural speaking style
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Instructions */}
            {!isRecording && !isAnalyzing && !analysisComplete && (
              <div className="space-y-4">
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                  <h3 className="font-semibold text-primary-900 mb-2">Recording Tips:</h3>
                  <ul className="space-y-1 text-sm text-primary-800">
                    <li>• Find a quiet space with minimal background noise</li>
                    <li>• Speak naturally about any topic (work, hobbies, recent experiences)</li>
                    <li>• Don't overthink it - just have a casual conversation</li>
                    <li>• The more natural you sound, the better we can match your style</li>
                  </ul>
                </div>

                <div className="text-center py-8">
                  <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mic className="w-12 h-12 text-primary-600" />
                  </div>
                  <p className="text-gray-600 mb-6">Ready to record your voice sample?</p>
                  <Button size="lg" onClick={startRecording}>
                    Start Recording
                    <Mic className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Recording in Progress */}
            {isRecording && (
              <div className="space-y-6">
                <div className="text-center py-8">
                  <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 recording-pulse">
                    <Mic className="w-16 h-16 text-red-600" />
                  </div>
                  
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {formatTime(recordingTime)}
                  </div>
                  <p className="text-gray-600 mb-6">Recording in progress...</p>

                  {/* Waveform Animation */}
                  <div className="flex items-center justify-center gap-1 h-16 mb-6">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-primary-500 waveform-bar"
                        style={{
                          animationDelay: `${i * 0.05}s`,
                          height: "20%",
                        }}
                      />
                    ))}
                  </div>

                  <Progress value={(recordingTime / 120) * 100} className="mb-4" />
                  
                  {recordingTime < 120 && (
                    <Button variant="outline" onClick={handleStopRecording}>
                      Stop Early
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Analyzing */}
            {isAnalyzing && (
              <div className="space-y-6">
                <div className="text-center py-8">
                  <Spinner size="lg" className="mx-auto mb-6" />
                  <h3 className="text-xl font-semibold mb-2">Analyzing Your Voice...</h3>
                  <p className="text-gray-600 mb-6">{analysisMessage}</p>
                  <Progress value={analysisProgress} className="mb-2" />
                  <p className="text-sm text-gray-500">{analysisProgress}% complete</p>
                </div>
              </div>
            )}

            {/* Analysis Complete */}
            {analysisComplete && voicePatterns && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-900 mb-2">
                    Voice Analysis Complete!
                  </h3>
                  <p className="text-gray-600">
                    We've identified your unique speaking patterns
                  </p>
                </div>

                {/* Results */}
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Detected Patterns:
                  </h4>

                  <div className="grid gap-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Vocabulary Level</span>
                      <span className="font-medium text-gray-900">
                        {voicePatterns.vocabularyLevel}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Sentence Length</span>
                      <span className="font-medium text-gray-900">
                        {voicePatterns.sentenceLength}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Tone</span>
                      <span className="font-medium text-gray-900">
                        {voicePatterns.tone}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Speaking Pace</span>
                      <span className="font-medium text-gray-900">
                        {voicePatterns.speakingPace}
                      </span>
                    </div>

                    <div className="py-2">
                      <span className="text-sm text-gray-600 block mb-2">Common Phrases:</span>
                      <div className="flex flex-wrap gap-2">
                        {voicePatterns.commonPhrases.map((phrase: string, idx: number) => (
                          <span key={idx} className="badge-primary text-xs">
                            "{phrase}"
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="py-2">
                      <span className="text-sm text-gray-600 block mb-2">Filler Words:</span>
                      <div className="flex flex-wrap gap-2">
                        {voicePatterns.fillerWords.map((word: string, idx: number) => (
                          <span key={idx} className="badge bg-gray-200 text-gray-700 text-xs">
                            "{word}"
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => {
                    setAnalysisComplete(false);
                    setRecordingTime(0);
                  }}>
                    Record Again
                  </Button>
                  <Button className="flex-1" onClick={handleContinue}>
                    Continue to Skills
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}