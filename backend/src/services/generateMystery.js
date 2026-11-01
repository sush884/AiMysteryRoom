import { z } from 'zod';

const generatedSchema = z.object({
  title: z.string(), description: z.string(), location: z.string(), incidentDate: z.string(), incidentTime: z.string(), background: z.string(),
  suspects: z.array(z.object({ id: z.string(), name: z.string(), age: z.number(), occupation: z.string(), description: z.string(), relationship: z.string(), motive: z.string(), alibi: z.string(), personality: z.string(), background: z.string() })),
  timeline: z.array(z.object({ time: z.string(), event: z.string() })),
  evidence: z.array(z.object({ type: z.string(), title: z.string(), description: z.string(), content: z.string(), timestamp: z.string(), relatedSuspects: z.array(z.string()) })),
  solution: z.object({ culpritId: z.string(), motive: z.string(), method: z.string(), opportunity: z.string(), timeline: z.array(z.object({ time: z.string(), event: z.string() })), reasoning: z.string(), importantClues: z.array(z.string()) })
});

export async function generateMystery(input) {
  if (!process.env.GEMINI_API_KEY) { const error = new Error('Mystery generation is not configured yet. Add GEMINI_API_KEY to backend/.env.'); error.status = 503; throw error; }
  const count = Number(input.suspectCount);
  const prompt = `Create a compelling, solvable, entirely fictional detective case. Return ONLY JSON matching this shape: {"title":"","description":"","location":"","incidentDate":"YYYY-MM-DD","incidentTime":"","background":"","suspects":[{"id":"suspect-1","name":"","age":30,"occupation":"","description":"","relationship":"","motive":"","alibi":"","personality":"","background":""}],"timeline":[{"time":"","event":""}],"evidence":[{"type":"WhatsApp|Witness Statement|Document|Email|CCTV|Call Log","title":"","description":"","content":"","timestamp":"","relatedSuspects":["suspect-1"]}],"solution":{"culpritId":"suspect-1","motive":"","method":"","opportunity":"","timeline":[{"time":"","event":""}],"reasoning":"","importantClues":[""]}}. Generate exactly ${count} suspects with IDs suspect-1 through suspect-${count}; exactly one culprit, in the list. Create ${input.difficulty === 'Easy' ? '6-8' : input.difficulty === 'Hard' ? '10-12' : '8-10'} substantive evidence items. The evidence must allow deduction; make the timeline consistent and include fair red herrings. Motives, alibis, clues and solution must agree. Evidence content is fictional. Category: ${input.category}. Difficulty: ${input.difficulty}. Scenario: ${input.scenario}. Setting: ${input.setting || 'choose an evocative setting'}. Additional instructions: ${input.instructions || 'none'}. Optional title: ${input.title || 'choose a fitting title'}.`;
  const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: 'application/json', temperature: 0.8 } }), signal: AbortSignal.timeout(90000) });
  if (!response.ok) { const e = new Error('The mystery generator is temporarily unavailable. Please try again.'); e.status = 502; throw e; }
  const payload = await response.json();
  const text = payload.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('');
  let parsed;
  try { parsed = JSON.parse(text); } catch { const e = new Error('The generated case was malformed. Please try again.'); e.status = 502; throw e; }
  const data = generatedSchema.parse(parsed);
  if (data.suspects.length !== count || new Set(data.suspects.map((s) => s.id)).size !== count || !data.suspects.some((s) => s.id === data.solution.culpritId)) { const e = new Error('The generated case did not meet the investigation requirements. Please try again.'); e.status = 502; throw e; }
  if (data.evidence.length < 6) { const e = new Error('The generated case did not include enough evidence. Please try again.'); e.status = 502; throw e; }
  const validIds = new Set(data.suspects.map((s) => s.id));
  if (data.evidence.some((item) => item.relatedSuspects.some((id) => !validIds.has(id)))) { const e = new Error('Evidence references an unknown suspect. Please try again.'); e.status = 502; throw e; }
  return data;
}
