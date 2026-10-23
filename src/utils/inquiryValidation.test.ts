import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateInquiry,
  estimateProjectBudget,
  filterProjects,
  formatInquiryEmail,
  buildMailtoUrl,
  buildGmailWebUrl,
  VALID_PROJECT_TYPES,
  type ProjectItem
} from './inquiryValidation.ts';

test('validates correct inquiry payload', () => {
  const result = validateInquiry({
    name: 'Maria Santos',
    email: 'maria.santos@megaworld.com.ph',
    phone: '+63 917 123 4567',
    project_type: 'Custom Exhibits',
    budget_range: 'To be discussed',
    message: 'We are planning a 72 sqm pavilion for WorldBex 2026.'
  });

  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('catches missing required fields and short message', () => {
  const result = validateInquiry({
    name: '',
    email: 'not-an-email',
    project_type: '',
    message: 'Too short'
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.email);
  assert.ok(result.errors.project_type);
  assert.ok(result.errors.message);
});

test('estimates project budget accurately based on sqm and tier', () => {
  const standardEstimate = estimateProjectBudget({
    projectType: 'Custom Exhibits',
    areaSqm: 50,
    tier: 'standard'
  });

  const flagshipEstimate = estimateProjectBudget({
    projectType: 'Custom Exhibits',
    areaSqm: 50,
    tier: 'flagship'
  });

  assert.ok(standardEstimate.minPhp > 0);
  assert.ok(standardEstimate.maxPhp > standardEstimate.minPhp);
  assert.ok(flagshipEstimate.minPhp > standardEstimate.minPhp);
  assert.match(standardEstimate.formattedRange, /PHP/);
});

test('filters projects by category and text search query', () => {
  const sampleProjects: ProjectItem[] = [
    {
      id: 'p1',
      title: 'SM Aura Flagship Booth',
      category: 'Custom Exhibits',
      client: 'Samsung Philippines',
      location: 'SMX Convention Center, Pasay',
      year: '2025',
      description: 'Futuristic exhibition display pavilion.',
      services: ['Fabrication', 'Design'],
      images: ['/img1.jpg']
    },
    {
      id: 'p2',
      title: 'Ayala Malls Roadshow Hub',
      category: 'Promotional Events and Roadshows',
      client: 'Globe Telecom',
      location: 'Glorietta Activity Center, Makati',
      year: '2025',
      description: 'Experiential brand roadshow.',
      services: ['Event Production', 'Construction'],
      images: ['/img2.jpg']
    }
  ];

  const exhibitResults = filterProjects(sampleProjects, 'Custom Exhibits', '');
  assert.equal(exhibitResults.length, 1);
  assert.equal(exhibitResults[0].id, 'p1');

  const searchResults = filterProjects(sampleProjects, 'all', 'Glorietta');
  assert.equal(searchResults.length, 1);
  assert.equal(searchResults[0].id, 'p2');
});

test('formats inquiry email with subject and body correctly', () => {
  const emailDraft = formatInquiryEmail({
    name: 'Juan dela Cruz',
    email: 'juan@acme.ph',
    phone: '09171234567',
    company: 'Acme PH',
    project_type: 'Custom Exhibits',
    venue: 'SMX Convention Center',
    target_date: 'October 2026',
    budget_range: 'PHP 800,000 - PHP 1,200,000',
    message: 'Need a customized 54sqm booth pavilion with LED wall.'
  });

  assert.ok(emailDraft.subject.includes('[Project Inquiry]'));
  assert.ok(emailDraft.subject.includes('Custom Exhibits'));
  assert.ok(emailDraft.subject.includes('Juan dela Cruz'));
  assert.ok(emailDraft.subject.includes('Acme PH'));
  assert.ok(emailDraft.body.includes('SMX Convention Center'));
  assert.ok(emailDraft.body.includes('idisplay_ph@yahoo.com') === false); // recipient is in mailto
  assert.ok(emailDraft.body.includes('54sqm booth pavilion'));
});

test('builds mailto and Gmail web compose links with proper encoding', () => {
  const mailto = buildMailtoUrl('idisplay_ph@yahoo.com', 'Test Subject', 'Line 1\nLine 2');
  assert.ok(mailto.startsWith('mailto:idisplay_ph@yahoo.com?subject=Test%20Subject'));
  assert.ok(mailto.includes('Line%201%0ALine%202'));

  const gmailWeb = buildGmailWebUrl('idisplay_ph@yahoo.com', 'Test Subject', 'Line 1\nLine 2');
  assert.ok(gmailWeb.startsWith('https://mail.google.com/mail/?view=cm&fs=1&to=idisplay_ph%40yahoo.com'));
  assert.ok(gmailWeb.includes('&su=Test%20Subject'));
});

