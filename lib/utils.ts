import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(hours: number): string {
  return hours === 1 ? '1 hour' : `${hours} hours`;
}

export function formatMinutes(min: number): string {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export function getContentTypeIcon(type: string): string {
  switch (type) {
    case 'video': return 'Play';
    case 'reading': return 'BookOpen';
    case 'exercise': return 'Dumbbell';
    case 'quiz': return 'HelpCircle';
    default: return 'FileText';
  }
}

export function getContentTypeLabel(type: string): string {
  switch (type) {
    case 'video': return 'Video Lesson';
    case 'reading': return 'Reading';
    case 'exercise': return 'Interactive Exercise';
    case 'quiz': return 'Quiz & Assessment';
    default: return 'Lesson';
  }
}

export function getDifficultyColor(level: string): string {
  switch (level) {
    case 'beginner': return 'text-green-400 bg-green-400/10 border-green-400/20';
    case 'intermediate': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
    case 'advanced': return 'text-red-400 bg-red-400/10 border-red-400/20';
    default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
  }
}

export function getCategoryColor(category: string): string {
  switch (category) {
    case 'Leadership': return 'text-sky-400 bg-sky-400/10 border-sky-400/20';
    case 'Communication': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    case 'Conflict Resolution': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
    case 'Emotional Intelligence': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    case 'Team Building': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
    default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
  }
}

export function getPlanTierColor(tier: string): string {
  switch (tier) {
    case 'premium': return 'text-sky-400 bg-sky-400/10 border-sky-400/20';
    case 'standard': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    case 'starter': return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
  }
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateLong(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return formatDate(dateString);
}
