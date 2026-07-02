import { defineField, defineType } from 'sanity';

export const SERVICE_OPTIONS = [
  { title: 'Pipeline (CRM)',   value: 'pipeline'  },
  { title: 'Autopilot',        value: 'autopilot' },
  { title: 'The Agent',        value: 'agent'     },
  { title: 'The Voice',        value: 'voice'     },
  { title: 'Funnels',          value: 'funnels'   },
  { title: 'Sites',            value: 'sites'     },
  { title: 'Apps',             value: 'apps'      },
  { title: 'Visibility (SEO)', value: 'visibility'},
];

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project title',
      type: 'string',
      validation: (r) => r.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'summary',
      title: 'One-line summary',
      description: 'Used in the portfolio grid. Keep it short and outcome-led.',
      type: 'text',
      rows: 2,
      validation: (r) => r.required().max(180),
    }),
    defineField({
      name: 'services',
      title: 'Services used',
      description: 'Used for the filter on the portfolio grid.',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: SERVICE_OPTIONS,
        layout: 'tags',
      },
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'cover',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (r) => r.min(2000).max(2100),
    }),
    defineField({
      name: 'url',
      title: 'Live URL',
      type: 'url',
    }),
    defineField({
      name: 'order',
      title: 'Sort order',
      description: 'Lower numbers appear first.',
      type: 'number',
    }),
    defineField({
      name: 'body',
      title: 'Case study body (optional)',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'client', media: 'cover' },
  },
});
