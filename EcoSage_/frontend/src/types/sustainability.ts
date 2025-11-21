
export interface ScannedProduct {
  id: string;
  name: string;
  score: number;
  timestamp: string;
  image?: string;
}

export interface SustainabilityTip {
  id: string;
  title: string;
  description: string;
  category: string;
}

export interface EcoFact {
  id: string;
  fact: string;
  source?: string;
}