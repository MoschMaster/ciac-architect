// Centrale data voor blogartikelen.

export const articles = [
  {
    slug: 'design-for-digital',
    title: 'Design for Digital: de vijf bouwblokken voor een wendbare organisatie',
    excerpt:
      'Hoe MIT-onderzoekers Ross, Beath en Mocker laten zien dat blijvende digitale wendbaarheid niet draait om losse projecten, maar om vijf onderling versterkende bouwblokken.',
    category: 'Architectuurmodellen',
    readingTime: '8 min',
    publishedOn: '2026-04-22',
    author: 'Mischa van Ek',
    type: 'design-for-digital',
  },
  {
    slug: 'it-savvy',
    title: 'How IT Savvy is your enterprise? Vijf praktijken die elke IT-euro laten renderen',
    excerpt:
      'MIT-onderzoek van Peter Weill en Sinan Aral toont aan dat organisaties met hoge IT Savvy gemiddeld $250 verdienen per dollar geïnvesteerd in IT-infrastructuur — terwijl lage IT Savvy juist $900 per dollar kost.',
    category: 'Onderzoek & benchmarks',
    readingTime: '7 min',
    publishedOn: '2026-05-08',
    author: 'Mischa van Ek',
    type: 'it-savvy',
  },
];

export function getArticleBySlug(slug) {
  return articles.find((a) => a.slug === slug);
}