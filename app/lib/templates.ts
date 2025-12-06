export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string; // URL or component name
  category: 'restaurant' | 'retail' | 'consulting' | 'creative' | 'personal';
  style: 'modern' | 'professional' | 'bold' | 'minimal' | 'playful';
  tags: {
    industries: string[];
    goals: string[]; // 'bookings', 'ecommerce', 'portfolio', 'lead-gen'
    features: string[]; // 'gallery', 'booking', 'menu', 'shop'
  };
  previewComponent: string; // Component to render for preview
}

export const templates: Template[] = [
  {
    id: 'restaurant-modern',
    name: 'Modern Bistro',
    description: 'Clean layout for restaurants with online reservations',
    thumbnail: '/templates/restaurant-modern.jpg',
    category: 'restaurant',
    style: 'modern',
    tags: {
      industries: ['restaurant', 'cafe', 'food'],
      goals: ['bookings', 'menu'],
      features: ['menu', 'reservations', 'gallery']
    },
    previewComponent: 'RestaurantModern'
  },
  {
    id: 'consulting-professional',
    name: 'Executive Consulting',
    description: 'Professional template for consultants and agencies',
    thumbnail: '/templates/consulting-pro.jpg',
    category: 'consulting',
    style: 'professional',
    tags: {
      industries: ['consulting', 'legal', 'finance'],
      goals: ['lead-gen', 'portfolio'],
      features: ['testimonials', 'services', 'contact']
    },
    previewComponent: 'ConsultingProfessional'
  },
  // Add 8-10 more templates
];

export const industries = [
  'Restaurant & Food',
  'Retail & E-commerce',
  'Consulting & Services',
  'Creative & Design',
  'Health & Wellness',
  'Technology',
  'Education',
  'Real Estate'
];

export const goals = [
  { id: 'bookings', label: 'Take bookings/reservations' },
  { id: 'ecommerce', label: 'Sell products online' },
  { id: 'portfolio', label: 'Showcase my work' },
  { id: 'lead-gen', label: 'Generate leads' },
  { id: 'info', label: 'Share information' }
];

export const styles = [
  { id: 'modern', label: 'Modern & Clean', color: 'bg-blue-100' },
  { id: 'professional', label: 'Professional', color: 'bg-gray-100' },
  { id: 'bold', label: 'Bold & Energetic', color: 'bg-red-100' },
  { id: 'minimal', label: 'Minimalist', color: 'bg-white border' },
  { id: 'playful', label: 'Playful & Fun', color: 'bg-yellow-100' }
];