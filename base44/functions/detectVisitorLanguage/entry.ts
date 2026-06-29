Deno.serve(async (req) => {
  try {
    const countryHeaders = [
      'cf-ipcountry',
      'x-vercel-ip-country',
      'x-country-code',
      'cloudfront-viewer-country',
      'x-appengine-country',
    ];

    let country = '';
    for (const header of countryHeaders) {
      const value = req.headers.get(header);
      if (value) {
        country = value.toUpperCase();
        break;
      }
    }

    const acceptLanguage = req.headers.get('accept-language') || '';
    const language = country
      ? country === 'NL' ? 'nl' : 'en'
      : acceptLanguage.toLowerCase().startsWith('nl') ? 'nl' : 'en';

    return Response.json({ language, country: country || null });
  } catch (error) {
    return Response.json({ error: error.message, language: 'en' }, { status: 500 });
  }
});