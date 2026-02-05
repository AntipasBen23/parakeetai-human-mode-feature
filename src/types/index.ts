// src/types/index.ts

export type SkillLevel = 'beginner' | 'intermediate' | 'expert';
export type ToneType = 'casual' | 'professional' | 'formal';
export type CompanyType = 'startup' | 'midsize' | 'enterprise';
export type InterviewStage = 'phone_screen' | 'technical' | 'final_round';

export interface UserProfile {
  name?: string;
  voiceAnalyzed: boolean;
  voicePatterns?: VoicePatterns;
  skills: SkillSet;
  interviewContext?: InterviewContext;
}

export interface VoicePatterns {
  vocabularyLevel: string;
  sentenceLength: string;
  tone: string;
  fillerWords: string[];
  commonPhrases: string[];
  speakingPace: string;
}

export interface SkillSet {
  react: SkillLevel;
  kubernetes: SkillLevel;
  machineLearning: SkillLevel;
  systemDesign: SkillLevel;
  [key: string]: SkillLevel;
}

export interface InterviewContext {
  companyType: CompanyType;
  interviewStage: InterviewStage;
  desiredVibe: ToneType;
}

export interface QuestionResponse {
  question: string;
  category: string;
  withoutHumanMode: string;
  withHumanMode: string;
  highlights: string[];
}