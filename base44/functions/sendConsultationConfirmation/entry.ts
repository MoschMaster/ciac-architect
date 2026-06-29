import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
  const base44 = createClientFromRequest(req);

  let body_raw;
  try {
    body_raw = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // Support both direct payload and automation entity event payload
  const request = body_raw?.data ?? body_raw;

  if (!request?.email) {
    return Response.json({ error: 'No email found in payload' }, { status: 400 });
  }

  const topicLabels = {
    strategie: 'Strategie & governance',
    landscaping: 'Business- & IT-landscaping',
    assessment: 'Architectuurassessment',
    eaaas: 'Enterprise Architecture as a Service',
    anders: 'Overig',
  };

  const topicLabel = topicLabels[request.topic] || request.topic || 'Niet opgegeven';
  const name = request.name || 'Bezoeker';

  const body = `Beste ${name},

Bedankt voor je aanvraag via de CIAC-website. We hebben je bericht goed ontvangen en nemen binnen één werkdag contact met je op om een kennismakingsgesprek in te plannen.

Jouw aanvraag:
• Organisatie: ${request.company || 'Niet opgegeven'}
• Onderwerp: ${topicLabel}
${request.message ? `• Toelichting: ${request.message}` : ''}

Heb je in de tussentijd vragen? Stuur dan een e-mail naar ciac@conclusion.nl.

Met vriendelijke groet,
Het CIAC-team
Conclusion IT Architecture Consulting
  `.trim();

  await base44.asServiceRole.integrations.Core.SendEmail({
    to: request.email,
    from_name: 'CIAC – Conclusion IT Architecture Consulting',
    subject: 'Bevestiging: je aanvraag voor een kennismakingsgesprek',
    body,
  });

  return Response.json({ success: true });
  } catch (error) {
    console.error('Error:', error.message, error.stack);
    return Response.json({ error: error.message }, { status: 500 });
  }
});