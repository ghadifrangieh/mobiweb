/* ============================================================
   MOBIWEB — AI Business Assistant Chatbot
   Menu-driven advisor: business type → goal → recommendation
   ============================================================ */

(function () {
  'use strict';

  /* ── Stage constants ───────────────────────────────────────── */
  var STAGE = { PICK_BUSINESS: 'PICK_BUSINESS', PICK_GOAL: 'PICK_GOAL', DONE: 'DONE' };

  /* ── 20 Business types ─────────────────────────────────────── */
  var BUSINESSES = [
    { id: 1,  emoji: '🍽️',  label: 'Restaurant / Café' },
    { id: 2,  emoji: '🛍️',  label: 'Retail Store' },
    { id: 3,  emoji: '💇',  label: 'Salon / Spa' },
    { id: 4,  emoji: '🏥',  label: 'Healthcare Clinic' },
    { id: 5,  emoji: '🏠',  label: 'Real Estate Agency' },
    { id: 6,  emoji: '⚖️',  label: 'Law Firm' },
    { id: 7,  emoji: '🎓',  label: 'Educational Institution' },
    { id: 8,  emoji: '🏨',  label: 'Hotel / Hospitality' },
    { id: 9,  emoji: '🛒',  label: 'E-commerce Store' },
    { id: 10, emoji: '💪',  label: 'Fitness / Gym' },
    { id: 11, emoji: '📊',  label: 'Consulting Business' },
    { id: 12, emoji: '🏗️',  label: 'Construction / Contracting' },
    { id: 13, emoji: '🚗',  label: 'Automotive Business' },
    { id: 14, emoji: '🌱',  label: 'Non-Profit Organization' },
    { id: 15, emoji: '👗',  label: 'Fashion Brand' },
    { id: 16, emoji: '📸',  label: 'Photography / Creative Studio' },
    { id: 17, emoji: '🚚',  label: 'Food Delivery / Catering' },
    { id: 18, emoji: '🚀',  label: 'Tech Startup' },
    { id: 19, emoji: '✈️',  label: 'Travel Agency' },
    { id: 20, emoji: '💼',  label: 'Other Business' }
  ];

  /* ── Goals per business ────────────────────────────────────── */
  var GOALS = {
    1:  ['Attract more diners & online visibility',   'Accept online orders & reservations',          'Build a menu website with photos',              'Create loyalty & promotions system'],
    2:  ['Launch an online store',                    'Attract local customers via search',           'Manage inventory & POS digitally',              'Build a loyalty rewards program'],
    3:  ['Allow online booking & appointments',       'Showcase services & build credibility',        'Sell products / gift cards online',             'Grow Instagram & social presence'],
    4:  ['Enable online appointment booking',         'Build a trusted, professional web presence',   'Offer telemedicine / virtual consultations',    'Manage patient records digitally'],
    5:  ['Showcase property listings online',         'Generate qualified buyer/seller leads',        'Build agent credibility & personal brand',      'Automate follow-ups & CRM'],
    6:  ['Build a credible professional website',     'Generate leads from potential clients',        'Offer secure client portal / document sharing', 'Educate audience with legal content'],
    7:  ['Launch an e-learning platform',             'Accept online course registrations',           'Build a branded student portal',                'Promote courses & grow enrollment'],
    8:  ['Accept online room bookings',               'Showcase rooms, amenities & experiences',      'Increase direct bookings (cut OTA fees)',        'Automate guest communication'],
    9:  ['Improve website speed & conversion rate',   'Expand product catalogue & categories',        'Reduce cart abandonment',                        'Integrate payment & shipping systems'],
    10: ['Allow online class & membership sign-ups', 'Showcase trainers, classes & schedules',       'Sell workout plans or nutrition guides online',  'Build a fitness community & app'],
    11: ['Build authority & attract high-end clients','Automate lead generation & intake forms',     'Showcase case studies & testimonials',           'Launch a thought leadership blog'],
    12: ['Showcase projects & build portfolio site',  'Generate local leads from Google search',      'Manage quotes, jobs & clients digitally',        'Build a branded professional presence'],
    13: ['List inventory & services online',          'Allow service booking & appointments',         'Grow local visibility on Google',               'Build customer reviews & loyalty'],
    14: ['Build a donation & fundraising platform',   'Grow volunteer sign-ups & engagement',        'Tell your story & raise awareness online',       'Manage events & programs digitally'],
    15: ['Launch a fashion e-commerce store',         'Build brand identity & lookbook website',      'Reach customers via Instagram & social',         'Manage wholesale / B2B orders'],
    16: ['Build a stunning portfolio website',        'Allow online bookings & quote requests',       'Sell prints, presets or digital products',       'Grow social media following & reach'],
    17: ['Launch an online ordering platform',        'Build a catering request & quote system',      'Showcase menus, packages & past events',         'Grow via local SEO & Google Maps'],
    18: ['Build an MVP / product landing page',       'Attract investors with a pitch-ready website', 'Launch a SaaS or web app',                       'Scale with a mobile app'],
    19: ['Showcase tour packages & destinations',     'Accept online bookings & payments',            'Build SEO presence for travel searches',         'Automate quotes & client follow-ups'],
    20: ['Build a professional business website',     'Generate leads & grow customer base',          'Launch an online store or service platform',     'Modernise & digitise operations']
  };

  /* ── Recommendations [businessId][goalIndex] ───────────────── */
  var REC = {
    /* 1 — Restaurant / Café */
    1: [
      '🍽️ *Restaurant — Attract More Diners & Visibility*\n\nWe\'ll build you a visually stunning restaurant website that ranks on Google and turns searches into reservations.\n\n✅ What\'s included:\n• Mobile-first website with your full menu, photos & story\n• Local SEO setup (Google Business Profile optimisation)\n• Online reservation widget (OpenTable / custom)\n• Schema markup for restaurant rich results\n• Fast-loading gallery with dish photography support\n• Social media link integration\n\n💡 Expected outcome: More walk-ins from "restaurants near me" searches and a professional digital first impression.',
      '🍽️ *Restaurant — Online Orders & Reservations*\n\nWe\'ll set up a seamless online ordering and table booking system so customers can order and book 24/7.\n\n✅ What\'s included:\n• Custom online ordering page (dine-in, takeaway, delivery)\n• Table reservation system with SMS/email confirmation\n• Real-time order management dashboard\n• Payment gateway integration (card, cash on delivery)\n• WhatsApp order notification setup\n• Mobile-optimised menu with categories & photos\n\n💡 Expected outcome: Reduced phone call load, higher order volume, and zero missed reservations.',
      '🍽️ *Restaurant — Menu Website with Photos*\n\nA beautiful, fast-loading website showcasing your dishes, story, and brand — making every visitor crave what you offer.\n\n✅ What\'s included:\n• Full responsive website (Home, Menu, Gallery, About, Contact)\n• High-quality menu layout with categories & descriptions\n• Photo gallery with lightbox\n• Google Maps + contact section\n• WhatsApp order/contact button\n• Basic SEO setup\n\n💡 Expected outcome: A shareable menu link for social media, a professional first impression, and easier discovery on Google.',
      '🍽️ *Restaurant — Loyalty & Promotions System*\n\nTurn one-time visitors into loyal regulars with a digital loyalty card and promotional campaign system.\n\n✅ What\'s included:\n• Digital stamp card / points system\n• Email or WhatsApp promotion campaigns\n• Special offer landing pages (Happy Hour, Weekend deals)\n• QR code for table-side loyalty sign-up\n• Customer database & basic CRM\n• Monthly promo newsletter setup\n\n💡 Expected outcome: Higher repeat visit rate, bigger average order value, and a direct marketing channel you own.'
    ],

    /* 2 — Retail Store */
    2: [
      '🛍️ *Retail — Launch an Online Store*\n\nWe\'ll build a full e-commerce store so your products are available 24/7 to customers everywhere.\n\n✅ What\'s included:\n• Full e-commerce website (product pages, cart, checkout)\n• Payment gateway integration (card, PayPal, COD)\n• Product categories, filters & search\n• Inventory management dashboard\n• Mobile-optimised shopping experience\n• Order confirmation emails & tracking\n\n💡 Expected outcome: A new sales channel that works around the clock, reaching customers beyond your physical location.',
      '🛍️ *Retail — Attract Local Customers via Search*\n\nWe\'ll optimise your digital presence so nearby shoppers find you first on Google.\n\n✅ What\'s included:\n• Google Business Profile setup & optimisation\n• Local SEO (city/neighbourhood keyword targeting)\n• Fast, mobile-friendly website with store info\n• Customer review strategy\n• Location schema markup\n• Monthly SEO health report\n\n💡 Expected outcome: Appearing in "near me" searches, more foot traffic, and higher local brand awareness.',
      '🛍️ *Retail — Digital Inventory & POS*\n\nModernise how you manage stock, sales, and suppliers with a digital system tailored for your store.\n\n✅ What\'s included:\n• Inventory management system (stock levels, alerts)\n• Sales dashboard & daily reports\n• Barcode scanning support\n• Supplier & purchase order tracking\n• Staff user accounts\n• Integration with your existing till/POS if needed\n\n💡 Expected outcome: No more spreadsheets, real-time stock visibility, fewer out-of-stock surprises.',
      '🛍️ *Retail — Loyalty Rewards Program*\n\nKeep customers coming back with a branded rewards programme that drives repeat purchases.\n\n✅ What\'s included:\n• Points-based loyalty system\n• Customer sign-up page & digital card\n• Automated reward notifications (WhatsApp/email)\n• Birthday & anniversary discount triggers\n• Dashboard to manage rewards & members\n• QR code for in-store check-in\n\n💡 Expected outcome: Higher customer retention rate, increased basket size, and a direct channel to promote new arrivals.'
    ],

    /* 3 — Salon / Spa */
    3: [
      '💇 *Salon — Online Booking & Appointments*\n\nEliminate the phone tag and let clients book their next appointment online, any time of day.\n\n✅ What\'s included:\n• Online booking system (service, staff, time selection)\n• Automated email/SMS appointment reminders\n• Cancellation & rescheduling management\n• Staff schedule & availability management\n• Client profile & history\n• WhatsApp booking confirmation\n\n💡 Expected outcome: Fewer no-shows, less admin time answering calls, and fully booked calendars.',
      '💇 *Salon — Showcase Services & Build Credibility*\n\nA professional website that makes your salon look as good online as it does in person.\n\n✅ What\'s included:\n• Elegant website (Home, Services, Gallery, Team, Book Now)\n• Before/after photo gallery\n• Staff bios & speciality highlights\n• Client testimonials section\n• Pricing page\n• Instagram feed integration\n\n💡 Expected outcome: Clients arrive knowing exactly what to expect, staff can be showcased, and first-time visitors convert more easily.',
      '💇 *Salon — Sell Products & Gift Cards Online*\n\nAdd a new revenue stream by selling your retail products and gift cards online — even when the salon is closed.\n\n✅ What\'s included:\n• Mini e-commerce store for salon products\n• Digital & physical gift card system\n• Secure online payment integration\n• Product descriptions with beauty tips\n• Order fulfilment workflow\n• Promotional landing pages for seasonal offers\n\n💡 Expected outcome: Passive income from online product sales, gift card revenue during holidays, and broader brand reach.',
      '💇 *Salon — Grow Instagram & Social Presence*\n\nWe\'ll build you a social media strategy and tools to grow your following and attract new clients.\n\n✅ What\'s included:\n• Instagram bio & profile optimisation\n• Link-in-bio landing page\n• Content calendar & post templates\n• Hashtag strategy for your niche\n• Reels/story design templates\n• Instagram booking button setup\n\n💡 Expected outcome: Consistent, on-brand social presence that attracts local followers and converts them into bookings.'
    ],

    /* 4 — Healthcare Clinic */
    4: [
      '🏥 *Clinic — Online Appointment Booking*\n\nLet patients book, reschedule, or cancel appointments online — reducing calls and front-desk workload.\n\n✅ What\'s included:\n• Online booking system by doctor/department\n• Patient intake forms (digital)\n• Automated appointment reminders (SMS/email)\n• Calendar sync for medical staff\n• Insurance details collection\n• HIPAA-aware data handling practices\n\n💡 Expected outcome: Fewer missed appointments, less front-desk phone burden, and a better patient experience from first contact.',
      '🏥 *Clinic — Professional Web Presence*\n\nA trusted, clean clinic website that builds patient confidence and ranks on Google for local health searches.\n\n✅ What\'s included:\n• Full clinic website (Services, Doctors, About, Contact, Book)\n• Doctor profiles with photos & credentials\n• Service/specialty pages\n• Patient testimonials\n• Local SEO & Google Maps integration\n• Accessibility-compliant design\n\n💡 Expected outcome: Patients find you before competitors, and arrive at appointments already trusting your team.',
      '🏥 *Clinic — Telemedicine / Virtual Consultations*\n\nOffer video consultations so patients can see their doctor from anywhere — expanding your reach without adding space.\n\n✅ What\'s included:\n• Telemedicine booking flow\n• Secure video call integration\n• Digital prescription / referral notes\n• Patient portal for test results\n• Payment for virtual visits\n• Follow-up scheduling system\n\n💡 Expected outcome: New revenue stream from remote patients, reduced no-shows, and improved access for patients who can\'t visit in person.',
      '🏥 *Clinic — Digital Patient Records*\n\nReplace paper files with a secure digital records and practice management system.\n\n✅ What\'s included:\n• Electronic Health Record (EHR) system\n• Patient registration & history tracking\n• Prescription & referral management\n• Billing & invoice system\n• Staff role-based access control\n• Secure cloud backup\n\n💡 Expected outcome: Faster consultations, no lost records, easier audits, and a scalable foundation for clinic growth.'
    ],

    /* 5 — Real Estate Agency */
    5: [
      '🏠 *Real Estate — Property Listings Website*\n\nA property showcase platform that makes your listings stand out and generates daily leads.\n\n✅ What\'s included:\n• Property listing website with search & filter\n• Property detail pages (photos, maps, specs, video)\n• Lead capture form per listing\n• Featured properties section\n• Agent profile pages\n• IDX / MLS integration if applicable\n\n💡 Expected outcome: Buyers and renters browse your inventory 24/7, and serious leads come directly to your inbox.',
      '🏠 *Real Estate — Qualified Lead Generation*\n\nWe\'ll build a lead generation machine that attracts buyers and sellers who are ready to act.\n\n✅ What\'s included:\n• Targeted landing pages (Buy / Sell / Rent)\n• Lead magnet: free property valuation form\n• WhatsApp & email lead notifications\n• Google Ads landing page optimisation\n• CRM integration (HubSpot or custom)\n• Lead scoring & follow-up automation\n\n💡 Expected outcome: A steady pipeline of qualified prospects instead of cold outreach.',
      '🏠 *Real Estate — Agent Credibility & Personal Brand*\n\nBuild a personal brand website that makes you the go-to agent in your market.\n\n✅ What\'s included:\n• Personal agent website with bio & listings\n• Client testimonials & success stories\n• Sold properties portfolio\n• Blog / market insights section\n• LinkedIn & social media integration\n• Contact & WhatsApp CTA\n\n💡 Expected outcome: Clients choose you over other agents because they already know, like, and trust you before the first call.',
      '🏠 *Real Estate — CRM & Follow-Up Automation*\n\nNever lose a lead again with an automated CRM that keeps every prospect warm.\n\n✅ What\'s included:\n• CRM setup & lead pipeline\n• Automated email/WhatsApp follow-up sequences\n• Property match alerts for registered buyers\n• Task reminders for agents\n• Lead source tracking\n• Monthly lead summary reports\n\n💡 Expected outcome: Higher conversion rate from initial inquiry to closed deal, and no leads falling through the cracks.'
    ],

    /* 6 — Law Firm */
    6: [
      '⚖️ *Law Firm — Professional Website*\n\nA credibility-first website that positions your firm as the authority clients trust with serious legal matters.\n\n✅ What\'s included:\n• Professional multi-page website (Practice Areas, Team, About, Contact)\n• Attorney profile pages with credentials\n• Elegant, trust-building design\n• Client testimonials (anonymised where needed)\n• Accessibility & mobile compliance\n• SSL & security hardening\n\n💡 Expected outcome: Clients who find you online arrive with confidence, and your firm looks the part before a single word is spoken.',
      '⚖️ *Law Firm — Lead Generation from Clients*\n\nTurn your website into a consistent source of consultation requests from qualified prospects.\n\n✅ What\'s included:\n• Practice area landing pages with clear CTAs\n• Free consultation intake form\n• Live chat / WhatsApp contact widget\n• Local SEO for legal search terms\n• Google Business Profile setup\n• Conversion-optimised page design\n\n💡 Expected outcome: A steady stream of consultation requests from people actively searching for legal help in your area.',
      '⚖️ *Law Firm — Secure Client Portal*\n\nOffer clients a professional, secure space to share documents and track their case.\n\n✅ What\'s included:\n• Secure client login portal\n• Document upload & management\n• Case status updates\n• Encrypted messaging\n• E-signature integration\n• Audit trail for compliance\n\n💡 Expected outcome: Fewer back-and-forth emails, stronger client satisfaction, and a modern practice that handles sensitive data responsibly.',
      '⚖️ *Law Firm — Legal Content & Education*\n\nEstablish thought leadership with a blog and resource centre that drives organic traffic and builds trust.\n\n✅ What\'s included:\n• Legal blog setup with SEO optimisation\n• FAQ pages per practice area\n• Downloadable legal guides (lead magnets)\n• Newsletter signup system\n• Social sharing tools\n• Content strategy & editorial calendar\n\n💡 Expected outcome: Google rankings for legal questions in your speciality, and a brand that is known as the knowledgeable choice.'
    ],

    /* 7 — Educational Institution */
    7: [
      '🎓 *Education — E-Learning Platform*\n\nLaunch a fully branded e-learning platform where students can access courses, videos, and materials anywhere.\n\n✅ What\'s included:\n• LMS (Learning Management System) setup\n• Course builder (videos, quizzes, PDFs)\n• Student dashboard & progress tracking\n• Certificate generation\n• Payment & subscription system\n• Mobile-optimised learning experience\n\n💡 Expected outcome: A scalable education product that generates recurring revenue and removes the limit of physical classroom size.',
      '🎓 *Education — Online Course Registrations*\n\nSimplify how students discover and enrol in your courses with a seamless registration system.\n\n✅ What\'s included:\n• Course catalogue website with search & filters\n• Online registration & enrolment forms\n• Payment integration (one-time & instalment)\n• Automated confirmation emails\n• Waitlist management\n• Student intake dashboard\n\n💡 Expected outcome: Less admin paperwork, faster enrolment, and a smoother first impression for new students.',
      '🎓 *Education — Student Portal*\n\nA branded digital hub where students access schedules, materials, grades, and communication.\n\n✅ What\'s included:\n• Student login portal\n• Class schedule & timetable\n• Assignment submission\n• Grade tracking\n• Announcements & messaging\n• Parent access mode\n\n💡 Expected outcome: A modern institution image, better student engagement, and reduced administrative load on staff.',
      '🎓 *Education — Promote Courses & Grow Enrolment*\n\nWe\'ll build a digital marketing engine that fills your classes with the right students.\n\n✅ What\'s included:\n• Marketing website with compelling course pages\n• SEO for educational search terms\n• Lead capture & nurture system\n• Email campaign sequences for prospects\n• Social media course promotion setup\n• Testimonial & alumni success page\n\n💡 Expected outcome: A consistent pipeline of new student enquiries and a higher enrolment rate each term.'
    ],

    /* 8 — Hotel / Hospitality */
    8: [
      '🏨 *Hotel — Online Room Booking*\n\nLet guests book directly through your website and stop paying OTA commissions.\n\n✅ What\'s included:\n• Direct booking engine integrated into your site\n• Room type pages with photos, amenities & pricing\n• Availability calendar & rate management\n• Secure payment processing\n• Instant booking confirmation emails\n• Special rate / promo code system\n\n💡 Expected outcome: More direct bookings, lower OTA dependency, and full control over your room rates and guest relationships.',
      '🏨 *Hotel — Showcase Rooms & Experiences*\n\nA visually stunning website that sells the experience before the guest even arrives.\n\n✅ What\'s included:\n• Full hotel website with gallery, rooms, dining, activities\n• Immersive photo & video integration\n• Virtual tour support\n• Amenities & facilities pages\n• Local attractions guide\n• Review highlights from TripAdvisor / Google\n\n💡 Expected outcome: Higher conversion from visitor to booked guest due to an aspirational, high-quality presentation.',
      '🏨 *Hotel — Increase Direct Bookings*\n\nA conversion-focused strategy to shift guests away from Booking.com and Airbnb — saving you commission on every room.\n\n✅ What\'s included:\n• Best rate guarantee messaging & widget\n• Direct booking incentive system (free breakfast, upgrade)\n• Email retargeting for past guests\n• SEO for branded & local searches\n• Google Hotel Ads integration\n• Loyalty programme for returning guests\n\n💡 Expected outcome: A measurable shift in booking channel mix toward direct — every % point saves real money.',
      '🏨 *Hotel — Automate Guest Communication*\n\nDeliver a five-star experience at every touchpoint with automated, personalised guest messaging.\n\n✅ What\'s included:\n• Pre-arrival information email sequence\n• Digital check-in / pre-check-in form\n• In-stay upsell messages (spa, dining, tours)\n• Post-stay review request automation\n• Guest feedback form\n• WhatsApp concierge setup\n\n💡 Expected outcome: Happier guests, more 5-star reviews, higher upsell revenue, and less front-desk workload.'
    ],

    /* 9 — E-commerce Store */
    9: [
      '🛒 *E-commerce — Speed & Conversion Optimisation*\n\nWe\'ll audit and rebuild the slow, leaky parts of your store so more visitors become paying customers.\n\n✅ What\'s included:\n• Full performance audit (Core Web Vitals)\n• Image optimisation & lazy loading\n• Checkout flow redesign\n• Mobile UX improvements\n• A/B test framework setup\n• Conversion rate analysis report\n\n💡 Expected outcome: Faster pages rank higher on Google and convert at 2–3× the rate of slow sites.',
      '🛒 *E-commerce — Expand Product Catalogue*\n\nScale your store to handle more products, categories, and product variants without breaking the user experience.\n\n✅ What\'s included:\n• Scalable catalogue architecture\n• Advanced filtering & search\n• Bulk product import tools\n• Product variant management\n• Cross-sell & upsell blocks\n• Category page SEO optimisation\n\n💡 Expected outcome: A store that grows with you — easy to manage 100 or 10,000 products.',
      '🛒 *E-commerce — Reduce Cart Abandonment*\n\nRecover lost revenue by re-engaging shoppers who left without completing their purchase.\n\n✅ What\'s included:\n• Abandoned cart email sequence\n• Exit-intent popup with discount offer\n• Sticky add-to-cart button on mobile\n• Trust badges & secure checkout messaging\n• Guest checkout option\n• WhatsApp cart recovery messages\n\n💡 Expected outcome: Recover 10–20% of abandoned carts — pure recovered revenue with no additional ad spend.',
      '🛒 *E-commerce — Payment & Shipping Integration*\n\nConnect the right payment and logistics partners to deliver a smooth, trusted checkout experience.\n\n✅ What\'s included:\n• Multi-payment gateway setup (card, PayPal, COD, instalments)\n• Shipping provider API integration\n• Real-time shipping rate calculator\n• Order tracking page\n• Returns & refund workflow\n• Multi-currency support (if needed)\n\n💡 Expected outcome: Fewer abandoned checkouts due to payment friction, and customers who trust your delivery process.'
    ],

    /* 10 — Fitness / Gym */
    10: [
      '💪 *Fitness — Online Class & Membership Sign-Ups*\n\nLet members join, book classes, and manage their membership entirely online.\n\n✅ What\'s included:\n• Online membership sign-up & payment\n• Class booking calendar\n• Automated membership renewal reminders\n• Member portal (booking history, profile)\n• Freeze / cancel self-service\n• Staff management dashboard\n\n💡 Expected outcome: Less front-desk admin, more members, and a 24/7 sign-up process that captures interest the moment it peaks.',
      '💪 *Fitness — Showcase Trainers & Classes*\n\nA motivating website that sells your culture, trainers, and programmes before a prospect sets foot in the gym.\n\n✅ What\'s included:\n• Gym website with class timetable, trainers & facilities\n• Trainer bios with specialisations\n• Photo & video gallery (workouts, community)\n• Class description pages\n• Transformation testimonials\n• Free trial sign-up page\n\n💡 Expected outcome: Prospects arrive for a trial already excited — higher trial-to-member conversion.',
      '💪 *Fitness — Sell Workout Plans & Guides Online*\n\nMonetise your expertise beyond the gym walls by selling digital fitness products.\n\n✅ What\'s included:\n• Digital product store (workout plans, meal guides, video programmes)\n• Secure download delivery\n• Payment gateway integration\n• Bundle & upsell options\n• Email list building from buyers\n• Affiliate programme setup (optional)\n\n💡 Expected outcome: Recurring passive income that scales independently of your physical gym capacity.',
      '💪 *Fitness — Fitness Community & App*\n\nBuild a loyal community around your brand with a members-only app or web platform.\n\n✅ What\'s included:\n• Mobile app (iOS + Android) or web app\n• Member challenges & leaderboards\n• Progress tracking & logging\n• Push notifications for classes & offers\n• Community feed / discussion\n• In-app purchase for premium plans\n\n💡 Expected outcome: Higher member retention, deeper brand loyalty, and a product that differentiates you from every other gym in the city.'
    ],

    /* 11 — Consulting Business */
    11: [
      '📊 *Consulting — Authority & Client Attraction*\n\nA premium website and content strategy that positions you as the expert clients pay top rates for.\n\n✅ What\'s included:\n• Premium multi-page consulting website\n• Services/methodology pages\n• Client results & case studies section\n• Thought leadership blog\n• Speaking & media appearances page\n• Professional headshots integration\n\n💡 Expected outcome: Clients arrive pre-sold on your expertise — fewer price objections, faster sales cycles.',
      '📊 *Consulting — Lead Generation & Intake*\n\nA systematic process to turn website visitors into discovery call bookings without manual effort.\n\n✅ What\'s included:\n• High-converting service landing pages\n• Free resource lead magnets (guides, templates)\n• Booking calendar integration (Calendly / custom)\n• CRM pipeline setup\n• Email nurture sequence for new leads\n• Automated follow-up system\n\n💡 Expected outcome: A predictable flow of qualified discovery calls so you can focus on client work, not business development.',
      '📊 *Consulting — Case Studies & Testimonials*\n\nTurn client results into compelling proof that sells your services for you.\n\n✅ What\'s included:\n• Dedicated case study pages (problem / solution / result format)\n• Video testimonial integration\n• Results metrics display (ROI, growth %)\n• Industry-specific portfolio sections\n• PDF case study downloads\n• Social proof widgets\n\n💡 Expected outcome: Prospects who read your case studies become significantly easier to close — they\'ve already seen the results.',
      '📊 *Consulting — Thought Leadership Content Hub*\n\nEstablish a content engine that generates inbound leads through education and authority.\n\n✅ What\'s included:\n• Blog / resource centre setup\n• SEO keyword strategy for your niche\n• Newsletter signup & email platform\n• Podcast or video embed integration\n• LinkedIn content syndication setup\n• Gated content (premium downloads)\n\n💡 Expected outcome: Organic leads from Google and LinkedIn who already trust your thinking before they reach out.'
    ],

    /* 12 — Construction / Contracting */
    12: [
      '🏗️ *Construction — Portfolio & Project Showcase*\n\nA professional website that lets your completed work speak louder than any brochure.\n\n✅ What\'s included:\n• Project portfolio with before/after photos\n• Project categories (residential, commercial, renovation)\n• Company story & credentials\n• Team & certifications page\n• Client testimonials\n• Quote request form\n\n💡 Expected outcome: New clients choose you based on visible proof of quality — your work closes deals for you.',
      '🏗️ *Construction — Local Lead Generation*\n\nGet found by homeowners and developers searching for contractors in your area.\n\n✅ What\'s included:\n• Local SEO for contractor search terms\n• Google Business Profile setup & optimisation\n• Service area pages\n• Review generation strategy\n• Fast mobile site for on-the-go searches\n• Click-to-call & WhatsApp integration\n\n💡 Expected outcome: A constant flow of local enquiries from people who need exactly what you offer.',
      '🏗️ *Construction — Digital Job & Client Management*\n\nReplace clipboards and spreadsheets with a system to track jobs, quotes, and clients.\n\n✅ What\'s included:\n• Job management dashboard (status, timeline, notes)\n• Quote / estimate builder\n• Client communication log\n• Invoice & payment tracking\n• Subcontractor task assignment\n• Document & photo storage per project\n\n💡 Expected outcome: Every job runs smoother, nothing falls through the cracks, and clients are impressed by your professionalism.',
      '🏗️ *Construction — Professional Brand Presence*\n\nA strong, consistent brand identity that positions your firm above local competition.\n\n✅ What\'s included:\n• Logo & brand identity design\n• Professional website & business cards\n• Branded estimate & invoice templates\n• Vehicle & site signage guidelines\n• Social media profile branding\n• Email signature design\n\n💡 Expected outcome: You look the part before doing a single job — clients trust you from the first search.'
    ],

    /* 13 — Automotive Business */
    13: [
      '🚗 *Automotive — Online Inventory & Services*\n\nShowcase your vehicles or services online so customers can browse and inquire before visiting.\n\n✅ What\'s included:\n• Vehicle inventory listings (photos, specs, price, availability)\n• Service menu with descriptions & pricing\n• Search & filter by make, model, year, price\n• WhatsApp / call CTA per listing\n• Financing calculator widget\n• SEO optimised car listing pages\n\n💡 Expected outcome: More serious walk-ins who have already done research, and fewer tire-kickers wasting your team\'s time.',
      '🚗 *Automotive — Service Booking & Appointments*\n\nLet customers book their next service, MOT, or repair online at any hour.\n\n✅ What\'s included:\n• Online service booking system\n• Service type selection (oil change, inspection, repair)\n• Technician / bay scheduling\n• Automated reminder notifications\n• Digital job card & status updates\n• Customer approval for extra work via SMS/WhatsApp\n\n💡 Expected outcome: A fuller workshop diary, less phone admin, and customers who feel informed throughout the repair process.',
      '🚗 *Automotive — Local Visibility on Google*\n\nDominate local search results when someone nearby searches for car services.\n\n✅ What\'s included:\n• Google Business Profile optimisation\n• Local SEO for automotive terms\n• Location & service area pages\n• Review generation strategy\n• Citation building across directories\n• Fast, mobile-first website\n\n💡 Expected outcome: Your business appears at the top when local customers search for your exact services.',
      '🚗 *Automotive — Customer Reviews & Loyalty*\n\nBuild a reputation that drives referrals and keeps customers returning for every service.\n\n✅ What\'s included:\n• Automated post-service review request (Google/Facebook)\n• Loyalty stamp card (digital)\n• Service history reminders ("time for your next service")\n• Referral programme\n• Customer database management\n• WhatsApp broadcast campaigns\n\n💡 Expected outcome: A growing library of 5-star reviews and a loyal base that sends you their friends and family.'
    ],

    /* 14 — Non-Profit */
    14: [
      '🌱 *Non-Profit — Donation & Fundraising Platform*\n\nMake it effortless for supporters to donate and track the impact of their generosity.\n\n✅ What\'s included:\n• Donation page with one-time & recurring options\n• Secure payment gateway (card, PayPal)\n• Campaign pages with progress bar\n• Donor recognition wall\n• Tax receipt automation\n• Fundraising event ticket sales\n\n💡 Expected outcome: Higher donation conversion rates, more recurring donors, and a platform that supports year-round fundraising.',
      '🌱 *Non-Profit — Volunteer Sign-Ups & Engagement*\n\nRecruit, manage, and retain the volunteers who make your mission possible.\n\n✅ What\'s included:\n• Volunteer registration & application form\n• Opportunity listings (event, skills-based)\n• Volunteer portal (hours tracking, schedule)\n• Automated onboarding email sequence\n• Impact reporting for volunteers\n• Community newsletter\n\n💡 Expected outcome: More volunteers, better retention, and a team that feels connected to your mission.',
      '🌱 *Non-Profit — Storytelling & Awareness Website*\n\nAn emotionally compelling website that turns visitors into believers and donors.\n\n✅ What\'s included:\n• Impact-first website design\n• Beneficiary stories & photo essays\n• Mission, vision & values pages\n• Media & press room\n• Social media integration\n• SEO for cause-related searches\n\n💡 Expected outcome: Visitors understand why your work matters — and take action (donate, share, volunteer) because of how they feel.',
      '🌱 *Non-Profit — Events & Programme Management*\n\nRun your events, programmes, and initiatives from one organised digital platform.\n\n✅ What\'s included:\n• Event listing & ticketing system\n• Programme registration & tracking\n• Attendee management dashboard\n• Email communication system\n• Post-event impact reporting\n• Calendar & scheduling tools\n\n💡 Expected outcome: Smoother events, better attendance tracking, and a professional image for your organisation.'
    ],

    /* 15 — Fashion Brand */
    15: [
      '👗 *Fashion — E-Commerce Store*\n\nA visually stunning online store that makes your clothing and accessories impossible to resist.\n\n✅ What\'s included:\n• Fashion e-commerce website (lookbook layout)\n• Product pages with size guides, multiple photos & zoom\n• Cart, wishlist & secure checkout\n• Size filter & collection pages\n• Abandoned cart recovery\n• Payment gateway integration\n\n💡 Expected outcome: A premium shopping experience that reflects your brand and converts browsers into buyers.',
      '👗 *Fashion — Brand Identity & Lookbook Site*\n\nA brand website as stylish as your collections — built to make your brand unforgettable.\n\n✅ What\'s included:\n• Editorial-style brand website\n• Lookbook / campaign gallery\n• Brand story & behind-the-scenes content\n• Seasonal collection showcases\n• Press & stockist page\n• Social media integration\n\n💡 Expected outcome: A brand that looks as premium online as it does in person — attracting the right customers and stockists.',
      '👗 *Fashion — Instagram & Social Commerce*\n\nTurn your Instagram following into a direct sales channel and grow it at the same time.\n\n✅ What\'s included:\n• Instagram Shopping setup\n• Link-in-bio storefront\n• Shoppable posts & stories setup\n• Reels & content template pack\n• Influencer collaboration page\n• UGC (user-generated content) gallery\n\n💡 Expected outcome: Sales that come directly from social media — your followers become your customers.',
      '👗 *Fashion — Wholesale / B2B Portal*\n\nOpen a B2B channel for boutiques and retailers to browse and order your collections.\n\n✅ What\'s included:\n• Password-protected wholesale portal\n• Trade pricing & MOQ display\n• Bulk order form\n• Downloadable line sheets & lookbooks\n• Retailer application form\n• Order history & invoice management\n\n💡 Expected outcome: A scalable wholesale channel that grows revenue without the overhead of a full sales team.'
    ],

    /* 16 — Photography / Creative Studio */
    16: [
      '📸 *Photography — Portfolio Website*\n\nA stunning portfolio that makes the right clients reach out before comparing you with anyone else.\n\n✅ What\'s included:\n• Full-screen photography portfolio website\n• Gallery categories (weddings, portraits, commercial, etc.)\n• Image protection (right-click disable, watermark support)\n• Client testimonials\n• About & story page\n• Contact & quote request form\n\n💡 Expected outcome: A professional showcase that attracts premium clients who value your style.',
      '📸 *Photography — Online Bookings & Quotes*\n\nA booking system that turns website visitors into confirmed shoots without the back-and-forth.\n\n✅ What\'s included:\n• Booking / inquiry form with package selector\n• Availability calendar\n• Automated quote generation\n• Deposit payment system\n• Client onboarding email sequence\n• Contract & model release e-signature\n\n💡 Expected outcome: More confirmed bookings per inquiry, faster decision-making from clients, and less admin per job.',
      '📸 *Photography — Sell Digital Products*\n\nMonetise your skills beyond shooting sessions with digital downloads.\n\n✅ What\'s included:\n• Digital product store (presets, templates, e-books)\n• Secure download delivery\n• Payment gateway integration\n• Bundle & upsell offers\n• Customer email list from purchases\n• Affiliate programme (optional)\n\n💡 Expected outcome: Passive income from digital sales that works 24/7 — even when you\'re on a shoot.',
      '📸 *Photography — Grow Social Following & Reach*\n\nA social media strategy that grows your audience and converts followers into booked clients.\n\n✅ What\'s included:\n• Instagram profile optimisation\n• Content strategy & caption templates\n• Hashtag research for your niche\n• Link-in-bio portfolio page\n• Story & Reel template pack\n• Engagement growth tactics\n\n💡 Expected outcome: A growing audience that knows your work — and a steady flow of enquiries from people who already love your style.'
    ],

    /* 17 — Food Delivery / Catering */
    17: [
      '🚚 *Catering — Online Ordering Platform*\n\nA branded ordering system where customers place food delivery or collection orders directly.\n\n✅ What\'s included:\n• Online ordering website (menu, cart, checkout)\n• Real-time order management dashboard\n• WhatsApp order notification\n• Scheduled order support\n• Payment gateway integration\n• Customer order history\n\n💡 Expected outcome: Orders come in directly — no third-party commission, full control over your brand experience.',
      '🚚 *Catering — Catering Requests & Quotes*\n\nA professional request system that captures event catering leads and converts them into confirmed bookings.\n\n✅ What\'s included:\n• Catering inquiry form (event type, guests, date, dietary needs)\n• Automated quote builder\n• Package presentation page\n• E-signature for booking confirmation\n• Deposit payment system\n• Follow-up email automation\n\n💡 Expected outcome: More corporate and event bookings with a process that looks professional from first contact.',
      '🚚 *Catering — Menu & Event Showcase*\n\nA mouthwatering website that sells your catering services before a client ever makes contact.\n\n✅ What\'s included:\n• Full catering website (menus, packages, gallery, about)\n• Event photo gallery\n• Menu PDF downloads\n• Past client testimonials\n• Corporate & private event sections\n• FAQ page\n\n💡 Expected outcome: Clients arrive pre-convinced — your website does the selling so you focus on the cooking.',
      '🚚 *Catering — Local SEO & Google Maps*\n\nBe the first result when someone in your area searches for catering services.\n\n✅ What\'s included:\n• Google Business Profile setup & optimisation\n• Local SEO for catering & delivery terms\n• Service area targeting\n• Review generation strategy\n• Location & menu schema markup\n• Fast mobile website\n\n💡 Expected outcome: Appearing at the top of local search — turning strangers into first-time customers.'
    ],

    /* 18 — Tech Startup */
    18: [
      '🚀 *Startup — MVP & Landing Page*\n\nValidate your idea and attract early users with a sharp product landing page and lightweight MVP.\n\n✅ What\'s included:\n• Product landing page (hero, features, social proof, CTA)\n• Waitlist / early access sign-up system\n• Demo video integration\n• Analytics & heatmap setup\n• A/B test framework\n• MVP web app (core features only)\n\n💡 Expected outcome: Real market feedback before building the full product — and an early user base ready for launch.',
      '🚀 *Startup — Investor-Ready Website*\n\nA pitch-perfect web presence that communicates your vision, traction, and team to investors and partners.\n\n✅ What\'s included:\n• Startup website (Product, Team, Traction, Press, Contact)\n• Demo / product video\n• Metrics & milestones showcase\n• Press mentions integration\n• Investor deck download (gated)\n• One-pager CTA design\n\n💡 Expected outcome: Investors take your startup seriously before the first meeting — your website does the first-round pitch.',
      '🚀 *Startup — SaaS or Web App*\n\nWe\'ll build your software product from design to deployment — scalable, secure, and production-ready.\n\n✅ What\'s included:\n• Full SaaS web application development\n• User authentication & account management\n• Subscription billing (Stripe integration)\n• Admin dashboard\n• API development\n• Cloud deployment & CI/CD pipeline\n\n💡 Expected outcome: A production-grade product your customers can rely on — built to scale from day one.',
      '🚀 *Startup — Mobile App*\n\nTake your product to iOS and Android with a native-quality mobile app.\n\n✅ What\'s included:\n• Cross-platform mobile app (React Native)\n• User onboarding flow\n• Push notifications\n• In-app purchases or subscriptions\n• Backend API integration\n• App Store & Google Play submission\n\n💡 Expected outcome: A mobile product that opens new acquisition channels and increases user retention through daily device presence.'
    ],

    /* 19 — Travel Agency */
    19: [
      '✈️ *Travel — Tour Packages & Destination Showcase*\n\nAn inspiring travel website that makes visitors dream — and book.\n\n✅ What\'s included:\n• Travel agency website with destination pages\n• Tour package listings (itinerary, inclusions, pricing)\n• High-quality photo & video galleries\n• Travel blog / destination guides\n• Testimonials from past travellers\n• Enquiry & WhatsApp CTA\n\n💡 Expected outcome: Visitors stay longer, explore more packages, and enquire because your website genuinely inspires them.',
      '✈️ *Travel — Online Bookings & Payments*\n\nLet travellers search, select, and pay for packages directly on your website.\n\n✅ What\'s included:\n• Online booking engine (package selection, dates, guests)\n• Secure payment gateway (deposit or full payment)\n• Booking confirmation & itinerary emails\n• Availability management dashboard\n• Group booking support\n• Passport / document collection form\n\n💡 Expected outcome: Bookings at any hour, no phone tag, and a smoother experience that builds trust.',
      '✈️ *Travel — SEO for Travel Searches*\n\nRank on Google for the trips people are already planning, and capture that organic traffic.\n\n✅ What\'s included:\n• Destination & package SEO pages\n• Travel blog with keyword strategy\n• Google Business Profile setup\n• Local + national SEO for travel terms\n• Backlink outreach strategy\n• Monthly SEO reporting\n\n💡 Expected outcome: Free, qualified traffic from people actively searching for the trips you sell.',
      '✈️ *Travel — Automated Quotes & Follow-Ups*\n\nRespond to every enquiry instantly with automated quotes and a follow-up system that closes more bookings.\n\n✅ What\'s included:\n• Quote request form with trip preferences\n• Automated personalised quote email\n• Follow-up sequence (3–5 emails over 2 weeks)\n• CRM pipeline for enquiries\n• WhatsApp follow-up integration\n• Lost lead re-engagement campaigns\n\n💡 Expected outcome: No enquiry goes cold — every lead gets a timely, professional response that moves them toward booking.'
    ],

    /* 20 — Other Business */
    20: [
      '💼 *Professional Business Website*\n\nA clean, conversion-focused website that establishes your credibility and turns visitors into clients.\n\n✅ What\'s included:\n• Multi-page business website (Home, Services, About, Contact)\n• Mobile-first, fast-loading design\n• Service / product pages\n• Contact form & WhatsApp CTA\n• Basic local SEO setup\n• Google Analytics integration\n\n💡 Expected outcome: A digital home base that makes your business look professional and generates inbound enquiries around the clock.',
      '💼 *Lead Generation & Customer Growth*\n\nA systematic digital strategy to attract new customers and grow your pipeline.\n\n✅ What\'s included:\n• High-converting landing pages\n• Lead capture forms & lead magnets\n• WhatsApp & email follow-up automation\n• Google Business Profile setup\n• Local SEO & directory listings\n• CRM pipeline setup\n\n💡 Expected outcome: A predictable flow of new leads so you spend less time hunting for business and more time serving clients.',
      '💼 *Online Store or Service Platform*\n\nSell your products or services online with a system built around your specific business model.\n\n✅ What\'s included:\n• E-commerce or service booking platform\n• Payment gateway integration\n• Customer account & order management\n• Product / service catalogue\n• Automated order/booking confirmations\n• Mobile-optimised experience\n\n💡 Expected outcome: A new revenue channel that works 24/7, reaching customers beyond your physical location.',
      '💼 *Digitalise & Modernise Operations*\n\nReplace manual processes with digital tools that save time, reduce errors, and let you scale.\n\n✅ What\'s included:\n• Operations workflow audit\n• Custom admin dashboard / internal tool\n• Client / customer database\n• Automated notifications & reminders\n• Document management system\n• Reporting & analytics\n\n💡 Expected outcome: Less time on admin, fewer human errors, and a business that can grow without proportionally growing headcount.'
    ]
  };

  /* Contact footer appended to every recommendation */
  var CONTACT_FOOTER = '\n\n---\n📩 **Ready to get started?**\nContact the Mobiweb team and we\'ll build a custom plan for your business:\n\n• 💬 WhatsApp: [+961 76 326 003](https://wa.me/96176326003)\n• 📧 Email: info@mobiweb.dev\n• 📸 Instagram: [@mobiweb.dev](https://www.instagram.com/mobiweb.dev?igsh=MTlpNDk3N3h0a2Myeg==)';

  /* ── Chatbot State ──────────────────────────────────────────── */
  var state = { stage: STAGE.PICK_BUSINESS, businessId: null };

  /* ── Build DOM widget ──────────────────────────────────────── */
  var style = document.createElement('style');
  style.textContent = [
    /* Toggle button */
    '.cb-toggle{position:fixed;bottom:90px;right:28px;width:54px;height:54px;border-radius:50%;background:linear-gradient(135deg,#38B6FF 0%,#114CBF 100%);color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 24px rgba(56,182,255,.45);z-index:900;transition:transform .25s ease,box-shadow .25s ease;}',
    '.cb-toggle:hover{transform:scale(1.08);box-shadow:0 8px 32px rgba(56,182,255,.55);}',
    '.cb-toggle svg{transition:transform .25s ease;}',
    '.cb-toggle.open svg.icon-chat{display:none;}',
    '.cb-toggle:not(.open) svg.icon-close{display:none;}',
    /* Badge */
    '.cb-badge{position:absolute;top:-4px;right:-4px;width:18px;height:18px;background:#e53e3e;border-radius:50%;font-size:10px;font-weight:700;color:#fff;display:flex;align-items:center;justify-content:center;opacity:0;transform:scale(0);transition:opacity .2s,transform .2s;}',
    '.cb-badge.show{opacity:1;transform:scale(1);}',
    /* Window */
    '.cb-window{position:fixed;bottom:158px;right:28px;width:360px;max-width:calc(100vw - 32px);height:520px;max-height:calc(100vh - 180px);background:#fff;border-radius:20px;box-shadow:0 20px 60px rgba(11,31,94,.2);display:flex;flex-direction:column;overflow:hidden;z-index:900;opacity:0;transform:translateY(16px) scale(.97);transition:opacity .3s ease,transform .3s ease;pointer-events:none;}',
    '.cb-window.open{opacity:1;transform:translateY(0) scale(1);pointer-events:auto;}',
    /* Header */
    '.cb-header{padding:18px 20px;background:linear-gradient(135deg,#0B1F5E 0%,#114CBF 100%);color:#fff;display:flex;align-items:center;gap:12px;flex-shrink:0;}',
    '.cb-avatar{width:40px;height:40px;border-radius:50%;background:rgba(56,182,255,.25);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;}',
    '.cb-header-info{flex:1;min-width:0;}',
    '.cb-header-name{font-size:.95rem;font-weight:700;letter-spacing:.01em;}',
    '.cb-header-status{font-size:.75rem;opacity:.75;display:flex;align-items:center;gap:5px;}',
    '.cb-dot{width:7px;height:7px;background:#4ade80;border-radius:50%;flex-shrink:0;}',
    '.cb-close-btn{background:rgba(255,255,255,.12);border:none;color:#fff;width:30px;height:30px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .2s;}',
    '.cb-close-btn:hover{background:rgba(255,255,255,.22);}',
    /* Messages */
    '.cb-messages{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;scroll-behavior:smooth;}',
    '.cb-messages::-webkit-scrollbar{width:4px;}',
    '.cb-messages::-webkit-scrollbar-thumb{background:rgba(17,76,191,.18);border-radius:4px;}',
    /* Bubbles */
    '.cb-msg{max-width:88%;line-height:1.5;font-size:.875rem;animation:cbFadeUp .25s ease forwards;}',
    '@keyframes cbFadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}',
    '.cb-msg.bot{align-self:flex-start;}',
    '.cb-msg.user{align-self:flex-end;}',
    '.cb-bubble{padding:10px 14px;border-radius:16px;white-space:pre-wrap;word-break:break-word;}',
    '.cb-msg.bot .cb-bubble{background:#F5F9FF;color:#0B1F5E;border-bottom-left-radius:4px;}',
    '.cb-msg.user .cb-bubble{background:linear-gradient(135deg,#38B6FF,#114CBF);color:#fff;border-bottom-right-radius:4px;}',
    /* Options */
    '.cb-options{display:flex;flex-direction:column;gap:6px;margin-top:4px;}',
    '.cb-option{background:#fff;border:1.5px solid rgba(17,76,191,.2);color:#0B1F5E;border-radius:10px;padding:9px 14px;font-size:.84rem;font-weight:500;text-align:left;cursor:pointer;transition:border-color .2s,background .2s;line-height:1.4;}',
    '.cb-option:hover,.cb-option:active{border-color:#38B6FF;background:rgba(56,182,255,.06);}',
    /* Typing indicator */
    '.cb-typing{display:flex;align-items:center;gap:4px;padding:12px 14px;background:#F5F9FF;border-radius:16px;border-bottom-left-radius:4px;width:fit-content;}',
    '.cb-typing span{width:7px;height:7px;background:#38B6FF;border-radius:50%;animation:cbBounce 1s infinite;}',
    '.cb-typing span:nth-child(2){animation-delay:.16s;}',
    '.cb-typing span:nth-child(3){animation-delay:.32s;}',
    '@keyframes cbBounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}',
    /* Input row */
    '.cb-input-row{padding:12px 16px;border-top:1px solid rgba(17,76,191,.08);display:flex;gap:8px;flex-shrink:0;background:#fff;}',
    '.cb-text-input{flex:1;padding:9px 13px;border:1.5px solid rgba(17,76,191,.18);border-radius:10px;font-size:.875rem;color:#0B1F5E;outline:none;background:#F5F9FF;transition:border-color .2s;}',
    '.cb-text-input:focus{border-color:#38B6FF;}',
    '.cb-text-input::placeholder{color:#a0aec0;}',
    '.cb-send-btn{width:38px;height:38px;border-radius:10px;background:linear-gradient(135deg,#38B6FF,#114CBF);color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:opacity .2s;}',
    '.cb-send-btn:hover{opacity:.88;}',
    /* Link style in bubbles */
    '.cb-bubble a{color:#38B6FF;text-decoration:underline;}'
  ].join('');
  document.head.appendChild(style);

  /* Toggle button */
  var toggle = document.createElement('button');
  toggle.className = 'cb-toggle';
  toggle.setAttribute('aria-label', 'Open Business Assistant');
  toggle.innerHTML = [
    '<svg class="icon-chat" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">',
    '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    '</svg>',
    '<svg class="icon-close" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">',
    '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    '</svg>',
    '<div class="cb-badge" id="cb-badge">1</div>'
  ].join('');
  document.body.appendChild(toggle);

  /* Chat window */
  var win = document.createElement('div');
  win.className = 'cb-window';
  win.setAttribute('role', 'dialog');
  win.setAttribute('aria-label', 'AI Business Assistant');
  win.innerHTML = [
    '<div class="cb-header">',
    '  <div class="cb-avatar">🤖</div>',
    '  <div class="cb-header-info">',
    '    <div class="cb-header-name">Mobiweb Assistant</div>',
    '    <div class="cb-header-status"><div class="cb-dot"></div>Online now</div>',
    '  </div>',
    '  <button class="cb-close-btn" aria-label="Close chat">',
    '    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">',
    '      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    '    </svg>',
    '  </button>',
    '</div>',
    '<div class="cb-messages" id="cb-messages"></div>',
    '<div class="cb-input-row">',
    '  <input class="cb-text-input" id="cb-input" type="text" placeholder="Type a number or message…" autocomplete="off" />',
    '  <button class="cb-send-btn" id="cb-send" aria-label="Send">',
    '    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">',
    '      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
    '    </svg>',
    '  </button>',
    '</div>'
  ].join('');
  document.body.appendChild(win);

  var msgContainer = win.querySelector('#cb-messages');
  var textInput    = win.querySelector('#cb-input');
  var sendBtn      = win.querySelector('#cb-send');
  var badge        = toggle.querySelector('#cb-badge');
  var closeBtn     = win.querySelector('.cb-close-btn');

  var isOpen = false;
  var hasOpened = false;

  /* ── Open / Close ──────────────────────────────────────────── */
  function openChat() {
    isOpen = true;
    toggle.classList.add('open');
    win.classList.add('open');
    toggle.setAttribute('aria-label', 'Close Business Assistant');
    badge.classList.remove('show');
    if (!hasOpened) {
      hasOpened = true;
      setTimeout(function () { greetUser(); }, 200);
    }
    setTimeout(function () { textInput.focus(); }, 350);
  }

  function closeChat() {
    isOpen = false;
    toggle.classList.remove('open');
    win.classList.remove('open');
    toggle.setAttribute('aria-label', 'Open Business Assistant');
  }

  toggle.addEventListener('click', function () {
    isOpen ? closeChat() : openChat();
  });
  closeBtn.addEventListener('click', closeChat);

  /* Show badge after 3s to nudge first-time visitors */
  setTimeout(function () {
    if (!hasOpened) badge.classList.add('show');
  }, 3000);

  /* ── Render helpers ────────────────────────────────────────── */
  function appendBotMessage(text) {
    var msg = document.createElement('div');
    msg.className = 'cb-msg bot';
    var bubble = document.createElement('div');
    bubble.className = 'cb-bubble';
    bubble.innerHTML = formatText(text);
    msg.appendChild(bubble);
    msgContainer.appendChild(msg);
    scrollBottom();
    return msg;
  }

  function appendUserMessage(text) {
    var msg = document.createElement('div');
    msg.className = 'cb-msg user';
    var bubble = document.createElement('div');
    bubble.className = 'cb-bubble';
    bubble.textContent = text;
    msg.appendChild(bubble);
    msgContainer.appendChild(msg);
    scrollBottom();
  }

  function appendOptions(opts) {
    var row = document.createElement('div');
    row.className = 'cb-msg bot';
    var inner = document.createElement('div');
    inner.className = 'cb-options';
    opts.forEach(function (opt, i) {
      var btn = document.createElement('button');
      btn.className = 'cb-option';
      btn.textContent = (i + 1) + '. ' + opt;
      btn.addEventListener('click', function () {
        handleOptionClick(i + 1, opt, row);
      });
      inner.appendChild(btn);
    });
    row.appendChild(inner);
    msgContainer.appendChild(row);
    scrollBottom();
    return row;
  }

  function showTyping(callback, delay) {
    var msg = document.createElement('div');
    msg.className = 'cb-msg bot';
    msg.innerHTML = '<div class="cb-typing"><span></span><span></span><span></span></div>';
    msgContainer.appendChild(msg);
    scrollBottom();
    setTimeout(function () {
      msg.remove();
      callback();
    }, delay || 800);
  }

  function scrollBottom() {
    requestAnimationFrame(function () {
      msgContainer.scrollTop = msgContainer.scrollHeight;
    });
  }

  /* Simple markdown → HTML (bold, links, horizontal rule) */
  function formatText(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/^---$/gm, '<hr style="border:none;border-top:1px solid rgba(17,76,191,.12);margin:8px 0;">')
      .replace(/\n/g, '<br>');
  }

  /* ── Conversation logic ────────────────────────────────────── */
  function greetUser() {
    showTyping(function () {
      appendBotMessage('👋 Hi! I\'m the **Mobiweb Business Assistant**.\n\nI can help you figure out the best digital solution for your business in just 2 quick steps!');
      showTyping(function () {
        appendBotMessage('First, **what type of business do you run?** Select a number below:');
        appendOptions(BUSINESSES.map(function (b) { return b.emoji + ' ' + b.label; }));
      }, 700);
    }, 900);
  }

  function handleOptionClick(num, label, optionRow) {
    /* Disable all options in that row */
    optionRow.querySelectorAll('.cb-option').forEach(function (b) {
      b.disabled = true;
      b.style.opacity = '.5';
      b.style.cursor = 'default';
    });

    appendUserMessage(num + '. ' + label);

    if (state.stage === STAGE.PICK_BUSINESS) {
      state.businessId = num;
      state.stage = STAGE.PICK_GOAL;
      var biz = BUSINESSES[num - 1];
      showTyping(function () {
        appendBotMessage('Great choice! 🎯 Now, **what\'s your main goal for ' + biz.label + '?**');
        var goals = GOALS[num] || GOALS[20];
        appendOptions(goals);
      }, 800);

    } else if (state.stage === STAGE.PICK_GOAL) {
      var goalIdx = num - 1;
      var bizRecs = REC[state.businessId] || REC[20];
      var rec = bizRecs[goalIdx] || bizRecs[0];
      state.stage = STAGE.DONE;
      showTyping(function () {
        appendBotMessage('Perfect! Here\'s what we recommend for you 👇');
        showTyping(function () {
          appendBotMessage(rec + CONTACT_FOOTER);
          showTyping(function () {
            appendBotMessage('Would you like to explore another option, or start fresh?');
            var restartRow = appendOptions(['🔄 Start over', '📩 Contact us now']);
            /* Override click for these special options */
            restartRow.querySelectorAll('.cb-option').forEach(function (b, i) {
              b.onclick = null;
              b.addEventListener('click', function () {
                if (i === 0) {
                  restartRow.querySelectorAll('.cb-option').forEach(function (bb) { bb.disabled = true; bb.style.opacity = '.5'; bb.style.cursor = 'default'; });
                  appendUserMessage('Start over');
                  state = { stage: STAGE.PICK_BUSINESS, businessId: null };
                  showTyping(function () {
                    appendBotMessage('No problem! Let\'s find the right solution for you. 👇\n**What type of business do you run?**');
                    appendOptions(BUSINESSES.map(function (bb) { return bb.emoji + ' ' + bb.label; }));
                  }, 700);
                } else {
                  restartRow.querySelectorAll('.cb-option').forEach(function (bb) { bb.disabled = true; bb.style.opacity = '.5'; bb.style.cursor = 'default'; });
                  appendUserMessage('Contact us now');
                  showTyping(function () {
                    appendBotMessage('Awesome! Reach out and we\'ll get back to you quickly:\n\n💬 **WhatsApp:** [+961 76 326 003](https://wa.me/96176326003)\n📧 **Email:** info@mobiweb.dev\n📸 **Instagram:** [@mobiweb.dev](https://www.instagram.com/mobiweb.dev?igsh=MTlpNDk3N3h0a2Myeg==)');
                  }, 600);
                }
              });
            });
          }, 600);
        }, 1200);
      }, 900);
    }
  }

  /* ── Text input handler ────────────────────────────────────── */
  function handleTextInput() {
    var val = textInput.value.trim();
    if (!val) return;
    textInput.value = '';

    var num = parseInt(val, 10);

    if (state.stage === STAGE.PICK_BUSINESS) {
      if (num >= 1 && num <= 20) {
        /* Simulate clicking that option by running the logic directly */
        var biz = BUSINESSES[num - 1];
        appendUserMessage(num + '. ' + biz.emoji + ' ' + biz.label);
        state.businessId = num;
        state.stage = STAGE.PICK_GOAL;
        showTyping(function () {
          appendBotMessage('Great choice! 🎯 Now, **what\'s your main goal for ' + biz.label + '?**');
          appendOptions(GOALS[num] || GOALS[20]);
        }, 800);
      } else {
        appendUserMessage(val);
        showTyping(function () {
          appendBotMessage('Please type a number between 1 and 20 to pick your business type, or click one of the options above. 😊');
        }, 600);
      }
    } else if (state.stage === STAGE.PICK_GOAL) {
      if (num >= 1 && num <= 4) {
        var goalIdx = num - 1;
        var goals = GOALS[state.businessId] || GOALS[20];
        appendUserMessage(num + '. ' + goals[goalIdx]);
        var bizRecs = REC[state.businessId] || REC[20];
        var rec = bizRecs[goalIdx] || bizRecs[0];
        state.stage = STAGE.DONE;
        showTyping(function () {
          appendBotMessage('Perfect! Here\'s what we recommend for you 👇');
          showTyping(function () {
            appendBotMessage(rec + CONTACT_FOOTER);
            showTyping(function () {
              appendBotMessage('Would you like to explore another option, or start fresh?');
              var restartRow = appendOptions(['🔄 Start over', '📩 Contact us now']);
              restartRow.querySelectorAll('.cb-option').forEach(function (b, i) {
                b.onclick = null;
                b.addEventListener('click', function () {
                  if (i === 0) {
                    restartRow.querySelectorAll('.cb-option').forEach(function (bb) { bb.disabled = true; bb.style.opacity = '.5'; bb.style.cursor = 'default'; });
                    appendUserMessage('Start over');
                    state = { stage: STAGE.PICK_BUSINESS, businessId: null };
                    showTyping(function () {
                      appendBotMessage('No problem! Let\'s find the right solution for you. 👇\n**What type of business do you run?**');
                      appendOptions(BUSINESSES.map(function (bb) { return bb.emoji + ' ' + bb.label; }));
                    }, 700);
                  } else {
                    restartRow.querySelectorAll('.cb-option').forEach(function (bb) { bb.disabled = true; bb.style.opacity = '.5'; bb.style.cursor = 'default'; });
                    appendUserMessage('Contact us now');
                    showTyping(function () {
                      appendBotMessage('Awesome! Reach out and we\'ll get back to you quickly:\n\n💬 **WhatsApp:** [+961 76 326 003](https://wa.me/96176326003)\n📧 **Email:** info@mobiweb.dev\n📸 **Instagram:** [@mobiweb.dev](https://www.instagram.com/mobiweb.dev?igsh=MTlpNDk3N3h0a2Myeg==)');
                    }, 600);
                  }
                });
              });
            }, 600);
          }, 1200);
        }, 900);
      } else {
        appendUserMessage(val);
        showTyping(function () {
          appendBotMessage('Please type a number between 1 and 4 to select your goal, or click one of the options above. 😊');
        }, 600);
      }
    } else {
      /* DONE stage — freeform fallback */
      appendUserMessage(val);
      showTyping(function () {
        appendBotMessage('For more specific questions, reach us directly:\n\n💬 **WhatsApp:** [+961 76 326 003](https://wa.me/96176326003)\n📧 **Email:** info@mobiweb.dev\n\nWant to **start over**? Type "restart" below.');
        if (val.toLowerCase().indexOf('restart') !== -1 || val === '1') {
          state = { stage: STAGE.PICK_BUSINESS, businessId: null };
        }
      }, 700);
    }
  }

  sendBtn.addEventListener('click', handleTextInput);
  textInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') handleTextInput();
  });

  /* Handle "restart" keyword at any stage */
  textInput.addEventListener('input', function () {
    if (textInput.value.toLowerCase() === 'restart') {
      textInput.value = '';
      appendUserMessage('Restart');
      state = { stage: STAGE.PICK_BUSINESS, businessId: null };
      showTyping(function () {
        appendBotMessage('Starting fresh! 🔄\n**What type of business do you run?**');
        appendOptions(BUSINESSES.map(function (b) { return b.emoji + ' ' + b.label; }));
      }, 700);
    }
  });

})();
