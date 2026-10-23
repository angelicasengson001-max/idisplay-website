export interface InquiryPayload {
  name: string;
  email: string;
  phone?: string;
  project_type: string;
  budget_range?: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const VALID_PROJECT_TYPES = [
  'Custom Exhibits',
  'Promotional Events and Roadshows',
  'Permanent Displays and Shop-fittings',
  'Commercial Interior Design and Architecture',
  'Innovative Marketing Ideas and Concepts',
  'Point-of-Sale Setups',
  'Larger-than-Life Graphic Displays',
  'Corporate Giveaways',
  'Large-Format Printing for indoor and outdoor tarpaulins and stickers'
] as const;

export type ProjectType = (typeof VALID_PROJECT_TYPES)[number];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateInquiry(payload: InquiryPayload): ValidationResult {
  const errors: Record<string, string> = {};

  const name = payload.name?.trim() ?? '';
  if (!name) {
    errors.name = 'Name is required.';
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters long.';
  }

  const email = payload.email?.trim() ?? '';
  if (!email) {
    errors.email = 'Email address is required.';
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Please provide a valid email address.';
  }

  if (payload.phone) {
    const cleanPhone = payload.phone.replace(/[\s()-]/g, '');
    if (cleanPhone && cleanPhone.length < 7) {
      errors.phone = 'Please enter a valid phone number (at least 7 digits).';
    }
  }

  const projectType = payload.project_type?.trim();
  if (!projectType) {
    errors.project_type = 'Please select a project type.';
  } else if (!VALID_PROJECT_TYPES.includes(projectType as ProjectType)) {
    errors.project_type = 'Selected project type is not recognized.';
  }

  const message = payload.message?.trim() ?? '';
  if (!message) {
    errors.message = 'Please provide details about your project.';
  } else if (message.length < 10) {
    errors.message = 'Project message must be at least 10 characters long.';
  } else if (message.length > 3000) {
    errors.message = 'Project message must not exceed 3,000 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export interface InquiryEmailData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  project_type: string;
  budget_range?: string;
  message: string;
  target_date?: string;
  venue?: string;
}

export function formatInquiryEmail(data: InquiryEmailData): {
  subject: string;
  body: string;
} {
  const subject = `[Project Inquiry] ${data.project_type || 'Exhibits & Displays'} — ${data.name || 'New Client'}${
    data.company ? ` (${data.company})` : ''
  }`;

  const lines = [
    `Dear iDisplay Inc. Team,`,
    ``,
    `I would like to inquire about a project for my company/brand:`,
    ``,
    `PROJECT DETAILS:`,
    `• Service/Offering: ${data.project_type || 'Custom Exhibits & Displays'}`,
    data.target_date ? `• Target Date / Timeline: ${data.target_date}` : null,
    data.venue ? `• Target Venue / Location: ${data.venue}` : null,
    data.budget_range ? `• Estimated Budget: ${data.budget_range}` : null,
    ``,
    `PROJECT BRIEF & REQUIREMENTS:`,
    data.message?.trim() || 'Please reach out to discuss our upcoming exhibition/display project requirements.',
    ``,
    `CONTACT DETAILS:`,
    `• Contact Person: ${data.name || 'Not provided'}`,
    `• Email: ${data.email || 'Not provided'}`,
    data.phone ? `• Phone/Mobile: ${data.phone}` : null,
    data.company ? `• Company/Organization: ${data.company}` : null,
    ``,
    `Best regards,`,
    data.name || 'Valued Client'
  ].filter((line): line is string => line !== null);

  return {
    subject,
    body: lines.join('\n')
  };
}

export function buildMailtoUrl(
  to: string,
  subject: string,
  body: string
): string {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  return `mailto:${to}?subject=${encodedSubject}&body=${encodedBody}`;
}

export function buildGmailWebUrl(
  to: string,
  subject: string,
  body: string
): string {
  const encodedTo = encodeURIComponent(to);
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedTo}&su=${encodedSubject}&body=${encodedBody}`;
}

export interface EstimateOptions {
  projectType: string;
  areaSqm: number;
  tier: 'standard' | 'premium' | 'flagship';
}

export function estimateProjectBudget(options: EstimateOptions): {
  minPhp: number;
  maxPhp: number;
  formattedRange: string;
} {
  const baseRatePerSqm: Record<string, number> = {
    'Custom Exhibits': 18000,
    'Promotional Events and Roadshows': 14000,
    'Permanent Displays and Shop-fittings': 22000,
    'Commercial Interior Design and Architecture': 25000,
    'Innovative Marketing Ideas and Concepts': 12000,
    'Point-of-Sale Setups': 9500,
    'Larger-than-Life Graphic Displays': 6500,
    'Corporate Giveaways': 2500,
    'Large-Format Printing for indoor and outdoor tarpaulins and stickers': 1800
  };

  const rate = baseRatePerSqm[options.projectType] || 15000;
  const area = Math.max(1, options.areaSqm);

  const multiplier =
    options.tier === 'flagship' ? 1.6 : options.tier === 'premium' ? 1.25 : 1.0;

  const base = rate * area * multiplier;
  const minPhp = Math.round(base * 0.9);
  const maxPhp = Math.round(base * 1.25);

  const minStr = minPhp.toLocaleString('en-US');
  const maxStr = maxPhp.toLocaleString('en-US');

  return {
    minPhp,
    maxPhp,
    formattedRange: `PHP ${minStr} - PHP ${maxStr}`
  };
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  client: string;
  location: string;
  year: string;
  description: string;
  services: string[];
  images: string[];
}

export function filterProjects(
  projects: ProjectItem[],
  categoryFilter: string,
  searchQuery: string
): ProjectItem[] {
  const q = searchQuery.trim().toLowerCase();
  return projects.filter((project) => {
    const matchesCategory =
      !categoryFilter ||
      categoryFilter === 'all' ||
      project.category.toLowerCase() === categoryFilter.toLowerCase();

    if (!matchesCategory) return false;
    if (!q) return true;

    return (
      project.title.toLowerCase().includes(q) ||
      project.client.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      project.services.some((s) => s.toLowerCase().includes(q)) ||
      project.location.toLowerCase().includes(q)
    );
  });
}
