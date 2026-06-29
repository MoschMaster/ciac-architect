// Centrale data voor klantcases.
// Iedere case bevat een uitgebreid artikel met uitdaging, aanpak en resultaten,
// gebaseerd op de oorspronkelijke adviesrapporten en opdrachtdocumenten.

export const cases = [
  {
    slug: 'kiwa-register',
    client: 'Kiwa Register',
    sector: 'Certificering & Overheid',
    tag: 'IT-Architectuur 2030',
    website: 'https://www.kiwaregister.com',
    logo: 'https://logo.clearbit.com/kiwaregister.com',
    description:
      'Toekomstbestendige IT-architectuur en roadmap richting 2030 voor een compliant, beheersbaar en kostenefficiënt IT-landschap.',
    intro:
      'Kiwa Register voert wettelijke taken uit namens het Ministerie van Infrastructuur en Waterstaat en opereert binnen een streng gereguleerd kader — met onder meer PKIoverheid, ISO 27001 en ETSI als bepalende normen. De kernvraag: hoe realiseren we een IT-landschap dat zo compliant mogelijk is, tegen zo laag mogelijke kosten, en dat tegelijk beter aansluit op de architectuurrichting van Kiwa IT NL en Kiwa Global?',
    challenge: {
      title: 'De uitdaging',
      text: 'Het IT-landschap van Kiwa Register was versnipperd geraakt over meerdere hostingomgevingen (FMO on-premise, Azure én AWS), met verouderde componenten en een sterke afhankelijkheid van externe leveranciers en inhuur. Dat dreef de exploitatiekosten op en maakte beheer kwetsbaar. Tegelijk namen de compliance-eisen toe — rondom de Smart Tachograaf, de aankomende EDAS-verordening en certificering — terwijl de gekozen oplossingen ook nog moesten passen binnen de architectuurkaders van Kiwa IT NL en Kiwa Global. Met slechts 5 FTE beheercapaciteit moest de richting kostenefficiënt, compliant én concern-aligned zijn.',
    },
    approach: {
      title: 'Onze aanpak',
      text: 'In een pragmatisch zes-stappenplan, verdeeld over drie fasen — Inzicht, Richting en Route — werkten we in co-creatie aan een gedragen doelarchitectuur. We brachten het landschap, de compliance-eisen én de architectuurprincipes van IT NL en IT Global expliciet in kaart als toetsingskader. Vervolgens ontwikkelden we meerdere scenario\'s, consequent gewogen op drie hoofdcriteria: kostenefficiëntie (TCO), compliance-borging en concern-fit. De voorkeursrichting werd vertaald naar een onderbouwde roadmap en besluitdocument voor de directie.',
      pillars: [
        'Sturen op laagst haalbare TCO bij volledige compliance',
        'Expliciete toetsing aan architectuurkaders van IT NL en IT Global',
        'Scenario-gedreven keuzes op kosten, risico en concern-alignment',
        'Lichte governance passend bij een compacte regieorganisatie',
      ],
    },
    results: {
      title: 'Het resultaat',
      items: [
        'Doelarchitectuur die compliance borgt tegen de laagst haalbare TCO',
        'Volledige aansluiting op de architectuurrichting van IT NL en IT Global',
        'Heldere roadmap met prioritering op kosten, risico en continuïteit',
        'Gedragen besluitdocument voor directie en concern-stakeholders',
      ],
    },
    quote: {
      text: 'De architectuurrichting moet passen binnen de kaders van IT NL en IT Global, rekening houden met compliance-ketens en uitvoerbaar zijn binnen de beperkte interne capaciteit.',
      author: 'Vanuit de opdrachtformulering',
    },
  },
  {
    slug: 'schadegarant',
    client: 'Stichting Schadegarant',
    sector: 'Verzekeringen & Schadeherstel',
    tag: 'Strategie & Roadmap',
    website: 'https://www.schadegarant.nl',
    logo: 'https://logo.clearbit.com/schadegarant.nl',
    description:
      'Van uniform ketenplatform naar wendbare, data-gedreven regieorganisatie — met een onderbouwde meerjaren-roadmap.',
    intro:
      'Stichting Schadegarant is de ketenregisseur achter het Nederlandse autoschadeherstel. Voor 14 deelnemende verzekeraars handelt zij jaarlijks circa 240.000 schadegevallen af en bewaakt zij kwaliteit, proces en afspraken in een groot netwerk van herstelbedrijven. Wij hielpen Schadegarant haar IT-architectuur en operating model voor te bereiden op een fundamenteel veranderende markt.',
    challenge: {
      title: 'De uitdaging',
      text: 'De schadeherstelmarkt verandert van een hoog-volume, relatief simpele blikschade-keten naar een lager-volume maar veel complexere en duurdere herstelketen. ADAS-technologie vermindert het aantal schades, terwijl elektrische voertuigen en sensoren de schadelast juist opdrijven. Daarbij dreigen OEM\'s (autofabrikanten) de klantrelatie over te nemen en is er structurele schaarste aan vakmensen. Het ketenplatform van Schadegarant — ooit gebouwd op uniformiteit en schaal — botst met de nieuwe vraag van verzekeraars naar maatwerk per segment en polis.',
    },
    approach: {
      title: 'Onze aanpak',
      text: 'In een gestructureerd vierstappentraject van strategische verkenning naar uitvoerbare roadmap brachten we eerst de visie en marktomstandigheden samen met het Schadegarant-leiderschap in beeld. Vervolgens documenteerden we het volledige digitale landschap end-to-end en identificeerden we de gaps tussen de huidige situatie en de gewenste data-gedreven regiefunctie. Het resultaat: 2-4 strategische pijlers en een meerjaren-roadmap met concrete initiatieven, business cases en prioriteiten.',
      pillars: [
        'Visie- en strategiesessies met directie en stakeholders',
        'End-to-end As-Is analyse van het digitale landschap',
        'Gap-analyse met quick wins, lange termijndoelen en business cases',
        'Concrete 1-jaarsroadmap én meerjarenperspectief 2026-2028',
      ],
    },
    results: {
      title: 'Het resultaat',
      items: [
        'Heldere strategische pijlers: API-first, modulair platform en data-propositie',
        'Onderbouwde roadmap voor wendbaarheid en grip op schadelast',
        'Rationalisatie van integraties en duidelijker eigenaarschap',
        'Fundament voor maatwerk per verzekeraar zonder escalerend beheer',
      ],
    },
    quote: {
      text: 'Schadegarant heeft behoefte om van een uniform werkend ketenplatform door te groeien naar een wendbare, data-gedreven regieorganisatie.',
      author: 'Uit het adviesrapport',
    },
  },
  {
    slug: 'feenstra',
    client: 'Feenstra',
    sector: 'Energie & Installatietechniek',
    tag: 'Platform Verkenning',
    website: 'https://www.feenstra.com',
    logo: 'https://logo.clearbit.com/feenstra.com',
    description:
      'Verkenning van het OutSystems-platform voor MijnFeenstra en advies voor een toekomstbestendig, kostenefficiënt klantportaal.',
    intro:
      'Feenstra, de grootste installateur van Nederland en onderdeel van Vattenfall, bedient ruim 800.000 huishoudens met installatie- en onderhoudsdiensten. Het klantportaal MijnFeenstra is gebouwd op het OutSystems low-code platform. Wij voerden een onafhankelijk verkenningsonderzoek uit om te bepalen of OutSystems nog het juiste fundament is voor de toekomst.',
    challenge: {
      title: 'De uitdaging',
      text: 'Het OutSystems-contract loopt af in oktober 2026, terwijl de jaarlijkse exploitatiekosten zijn opgelopen tot circa €325.000 voor slechts vier live applicaties. Daarbij ervaart de organisatie lange doorlooptijden bij functionele wijzigingen en past de oorspronkelijke businesscase niet meer bij Feenstra\'s strategische principes — waaronder "Reuse before Buy before Build" en "SaaS boven PaaS boven Build". Het moment was aangebroken om kritisch te toetsen of OutSystems nog "fit-for-purpose" is.',
    },
    approach: {
      title: 'Onze aanpak',
      text: 'We ontwikkelden een gewogen vergelijkingsmatrix met vier hoofdcriteria (FIT, RISK, COSTS, TIME) en 18 subcriteria, getoetst aan 16 geselecteerde architectuurprincipes. Vier richtingen werden objectief vergeleken: doorgaan met OutSystems, vervangen door Oracle APEX, overstap naar Common-off-the-Shelf (COTS), en moderne web technologieën. Via 15+ expertinterviews met Feenstra-medewerkers, validatie binnen het Conclusion-ecosysteem en grondige desk research kwam een gedragen advies tot stand.',
      pillars: [
        'Objectieve vergelijkingsmatrix met gewogen criteria',
        '8 interviews met Feenstra-experts en architecten',
        'Toetsing aan 16 architectuurprincipes (KP, AP, SP)',
        'Architecture Decision Record (ADR) als onderbouwing',
      ],
    },
    results: {
      title: 'Het resultaat',
      items: [
        'Advies: hybride COTS-oplossing gecombineerd met moderne web technologieën',
        'Verwachte besparing van 30% tot 50% op de jaarlijkse exploitatiekosten',
        'Twee parallelle vervolgtrajecten: kostenoptimalisatie en transitie',
        'Heldere roadmap richting 2026-2028 voor het toekomstige klantportaal',
      ],
    },
    quote: {
      text: 'Common of the Shelf gecombineerd met moderne web technologieën biedt de hoogste FIT en de laagste risico\'s tegen de laagste kosten.',
      author: 'Uit het adviesrapport',
    },
  },
  {
    slug: 'st-anna-zorggroep',
    client: 'St. Anna Zorggroep',
    sector: 'Zorg',
    tag: 'ERP Assessment',
    website: 'https://www.st-anna.nl',
    logo: 'https://logo.clearbit.com/st-anna.nl',
    description:
      'Top-down/bottom-up ERP-architectuurassessment ter ondersteuning van de migratie van SAP naar AFAS.',
    intro:
      'St. Anna Zorggroep — met onder meer het Anna Ziekenhuis in Geldrop — staat midden in een complexe ERP-migratie van SAP naar AFAS. Wij voerden een end-to-end architectuurassessment uit om het IT-landschap in samenhang in kaart te brengen en functionele, technische en data-gerelateerde risico\'s tijdig zichtbaar te maken.',
    challenge: {
      title: 'De uitdaging',
      text: 'De bestaande overzichten van het ERP-landschap waren versnipperd en onvolledig gedocumenteerd, met te weinig detail om de migratie en toekomstige koppelingen veilig te kunnen sturen. Door uiteenlopende systemen — van CGM en Intramed tot Cloverleaf, X-care en Planon — was er onvoldoende centraal zicht op applicaties, integraties, datastromen en infrastructuur. Tegelijk moest rekening worden gehouden met compliance-raamwerken als ISO, NEN, WGBO en GDPR.',
    },
    approach: {
      title: 'Onze aanpak',
      text: 'Via een gecombineerde top-down/bottom-up aanpak brachten we het ERP-landschap in kaart op vier architectuurlagen: applicatie, integratie, data en infrastructuur. We gebruikten het Conclusion Architecture Reference Framework (CARF) en een gestructureerde questionnaire om informatie van zowel functionele applicatie-eigenaren als technische specialisten op te halen. Door beide perspectieven continu te valideren ontstond een samenhangend As-Is en To-Be beeld.',
      pillars: [
        'Top-down (functioneel) en bottom-up (technisch) gecombineerd',
        'Toepassing van Conclusion Architecture Reference Framework (CARF)',
        'Continue validatie tussen functionaliteit en technologie',
        'Aansluiting op bestaande projectgovernance Nieuw ERP-Systeem',
      ],
    },
    results: {
      title: 'Het resultaat',
      items: [
        'Samenhangende As-Is en To-Be architectuurplaten van het ERP-landschap',
        'Identificatie van GAPs, single points of failure en migratierisico\'s',
        'Integratie- en rationalisatievoordelen: 3 modules samen in AFAS Profit',
        'Onderhoudbare repository voor continue verbeteringen na go-live',
      ],
    },
    quote: {
      text: 'Onze ambitie is om nu en in de toekomst een onderhoudbare repository achter te laten voor continue verbeteringen.',
      author: 'Uit het assessmentrapport',
    },
  },
];

export function getCaseBySlug(slug) {
  return cases.find((c) => c.slug === slug);
}