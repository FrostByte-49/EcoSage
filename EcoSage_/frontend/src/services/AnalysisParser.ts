import { z } from 'zod';

export const AnalysisSchema = z.object({
  product: z.object({
    name: z.string(),
    brand: z.string(),
    category: z.string()
  }),
  score: z.object({
    total: z.number().min(0).max(10),
    description: z.string(),
    breakdown: z.object({
      packaging: z.object({ score: z.number(), reason: z.string() }),
      production: z.object({ score: z.number(), reason: z.string() }),
      ethics: z.object({ score: z.number(), reason: z.string() }),
      lifecycle: z.object({ score: z.number(), reason: z.string() })
    })
  }),
  pros: z.array(z.string()),
  cons: z.array(z.string()),
  alternatives: z.array(z.object({
    name: z.string(),
    brand: z.string(),
    reason: z.string(),
    price: z.string(),
    availability: z.string()
  })),
  tips: z.object({
    recycling: z.array(z.string()),
    reduce: z.array(z.string()),
    choices: z.array(z.string())
  }),
  verdict: z.string()
});

export type AnalysisData = z.infer<typeof AnalysisSchema>;
