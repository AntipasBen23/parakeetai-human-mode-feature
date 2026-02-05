// src/lib/utils.ts

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Tailwind class merger (for shadcn) - default export
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Simulate API delay for realistic feel
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simulate progress updates
export async function simulateProgress(
  callback: (progress: number, message: string) => void,
  steps: { progress: number; message: string; duration: number }[]
) {
  for (const step of steps) {
    callback(step.progress, step.message);
    await delay(step.duration);
  }
}

// Format skill level for display
export function formatSkillLevel(level: string): string {
  return level.charAt(0).toUpperCase() + level.slice(1);
}

// Get random filler words for voice analysis
export function getRandomFillerWords(): string[] {
  const fillerWordOptions = [
    ["like", "you know", "um"],
    ["basically", "actually", "kind of"],
    ["sort of", "I mean", "you see"],
    ["well", "so", "right"],
    ["honestly", "literally", "pretty much"]
  ];
  
  return fillerWordOptions[Math.floor(Math.random() * fillerWordOptions.length)];
}

// Get random common phrases
export function getRandomCommonPhrases(): string[] {
  const phraseOptions = [
    ["I think", "in my experience", "from what I've seen"],
    ["I believe", "it seems like", "I'd say"],
    ["personally", "to be honest", "the way I see it"],
    ["generally", "typically", "usually"],
    ["I tend to", "I usually", "I prefer to"]
  ];
  
  return phraseOptions[Math.floor(Math.random() * phraseOptions.length)];
}

// Generate mock voice analysis results
export function generateMockVoiceAnalysis() {
  const vocabularyLevels = [
    "Conversational (6.5/10)",
    "Professional (7.2/10)", 
    "Technical (8.1/10)",
    "Academic (7.8/10)"
  ];
  
  const sentenceLengths = [
    "Short (8-12 words avg)",
    "Medium (12-16 words avg)",
    "Long (16-22 words avg)"
  ];
  
  const tones = [
    "Casual and friendly",
    "Professional yet approachable",
    "Formal and measured",
    "Enthusiastic and energetic"
  ];
  
  const speakingPaces = [
    "125 words/minute (Relaxed)",
    "145 words/minute (Normal)",
    "165 words/minute (Energetic)",
    "135 words/minute (Thoughtful)"
  ];
  
  return {
    vocabularyLevel: vocabularyLevels[Math.floor(Math.random() * vocabularyLevels.length)],
    sentenceLength: sentenceLengths[Math.floor(Math.random() * sentenceLengths.length)],
    tone: tones[Math.floor(Math.random() * tones.length)],
    fillerWords: getRandomFillerWords(),
    commonPhrases: getRandomCommonPhrases(),
    speakingPace: speakingPaces[Math.floor(Math.random() * speakingPaces.length)]
  };
}

// LocalStorage helpers
export const storage = {
  get: (key: string) => {
    if (typeof window === 'undefined') return null;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  
  set: (key: string, value: any) => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },
  
  remove: (key: string) => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
  
  clear: () => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};

// Storage keys
export const STORAGE_KEYS = {
  USER_PROFILE: 'humanmode_user_profile',
  VOICE_PATTERNS: 'humanmode_voice_patterns',
  SKILLS: 'humanmode_skills',
  INTERVIEW_CONTEXT: 'humanmode_interview_context'
};