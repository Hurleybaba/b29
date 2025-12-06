import { templates, Template } from './templates';

export function getRecommendedTemplates(
  industry?: string,
  goal?: string,
  style?: string
): Template[] {
  let filtered = [...templates];
  
  // Filter by industry (simplified matching)
  if (industry) {
    const industryLower = industry.toLowerCase();
    filtered = filtered.filter(template => 
      template.tags.industries.some(ind => 
        industryLower.includes(ind.toLowerCase()) || 
        ind.toLowerCase().includes(industryLower)
      )
    );
  }
  
  // If we have too few results, relax filters
  if (filtered.length < 3) {
    filtered = [...templates];
  }
  
  // Score templates based on preferences
  const scored = filtered.map(template => ({
    template,
    score: calculateScore(template, goal, style)
  }));
  
  // Sort by score and return top 6
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(item => item.template);
}

function calculateScore(template: Template, goal?: string, style?: string): number {
  let score = 0;
  
  if (goal && template.tags.goals.includes(goal)) {
    score += 10;
  }
  
  if (style && template.style === style) {
    score += 8;
  }
  
  // Bonus for featured or popular templates
  if (template.id.includes('modern') || template.id.includes('professional')) {
    score += 2;
  }
  
  return score;
}