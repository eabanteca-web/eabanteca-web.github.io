import { useState, useEffect, useRef } from 'react';
import { supabase } from './supabaseClient';

const translations = {
  en: {
    "nav-about": "About", "nav-problems": "Problems", "nav-pillars": "Pillars", "nav-programs": "Programs",
    "nav-manifesto": "Manifesto", "nav-guide": "Guide", "nav-sign": "Sign", "nav-champions": "Champions", "nav-donate": "Donate",
    "hero-badge": "Empowering Homeowners Since 2024", "hero-title1": "Good Governance", "hero-title2": "Starts at Home",
    "hero-desc": "eAbante is a non-profit movement dedicated to promoting transparency, accountability, and fair governance in homeowners associations — one purok at a time.",
    "hero-btn1": "Pirmahan ang Manipesto", "hero-btn2": "See the Problems",
    "about-label": "About the Movement", "about-title": "Standing Up for <span class=\"text-gradient\">Homeowner Rights</span>",
    "about-p1": "In many homeowners associations, decisions are made behind closed doors. Dues are collected without clear accounting. Elections lack proper oversight. Homeowners are left in the dark — powerless against a system designed to exclude them.",
    "about-p2": "<strong class=\"text-white\">eAbante</strong> was founded to change that. We believe that good governance isn't just for governments — it starts right where we live. Our name comes from the Filipino word <em>\"abante\"</em>, meaning <strong class=\"text-brand-400\">to move forward</strong>.",
    "about-p3": "We equip homeowners with the knowledge, tools, and legal support they need to hold their HOA boards accountable. Through our Manifesto and Purok Self-Governance model, we build a system where every peso is accounted for, every decision is transparent, every purok has a voice, and every elder is a guardian of trust.",
    "problems-label": "Executive Summary", "problems-title": "The Problems We're <span class=\"text-gradient\">Solving</span>",
    "problems-desc": "These are the systemic failures in HOA governance that eAbante was built to address — drawn from actual patterns observed across communities.",
    "p1-title": "Financial Opacity", "p1-desc": "Homeowners pay monthly dues but never see where the money goes. Financial statements are either not published, deliberately vague, or impossible to scrutinize.",
    "p1-stat1": "No published financials", "p1-stat2": "No independent audit",
    "p2-title": "Power Concentration", "p2-desc": "A small group of officers holds all authority with no decentralized checks. There is no purok-level representation, no local councils, no grassroots oversight.",
    "p2-stat1": "No purok-level governance", "p2-stat2": "Same officers re-elected unopposed",
    "p3-title": "Election Manipulation", "p3-desc": "Elections held without independent observers, secret ballots not guaranteed, vote counting lacks transparency. The same clique controls the board for years.",
    "p3-stat1": "No independent observer", "p3-stat2": "Homeowners unaware of schedule",
    "p4-title": "No Dispute Resolution", "p4-desc": "No mediation structure exists. Disputes fester for months and escalate straight to costly litigation instead of being resolved within the community.",
    "p4-stat1": "No internal mediation", "p4-stat2": "Escalated to litigation",
    "p5-title": "Exclusion from Decisions", "p5-desc": "Special assessments, infrastructure projects, and policy changes decided by the board alone. Homeowners informed after the fact — never consulted before.",
    "p5-stat1": "No pre-decision consultation", "p5-stat2": "Homeowners feel powerless",
    "p6-title": "No Unified Agreement", "p6-desc": "No community-wide pact binds both the board and homeowners to a shared standard of governance. Without a Manifesto, accountability is optional.",
    "p6-stat1": "No governance pact", "p6-stat2": "Don't know their rights",
    "problems-summary1": "Systemic Problems Identified", "problems-summary2": "Homeowners experience at least one", "problems-summary3": "The eAbante solution addresses all six",
    "pillars-label": "Our Foundation", "pillars-title": "Four Pillars of <span class=\"text-gradient\">Good Governance</span>",
    "pillar1-title": "Transparency", "pillar1-desc": "Financial records, meeting minutes, and board decisions must be openly accessible to every homeowner.",
    "pillar2-title": "Accountability", "pillar2-desc": "HOA officers must answer for their actions through regular audits, performance reviews, and recall processes.",
    "pillar3-title": "Participation", "pillar3-desc": "Every homeowner has the right to be heard — from purok councils to general assemblies — so no one is left out.",
    "pillar4-title": "Rule of Law", "pillar4-desc": "HOA governance must follow the law — from the Condominium Act to local ordinances.",
    "programs-label": "What We Do", "programs-title": "Our <span class=\"text-gradient\">Programs</span>", "programs-desc": "Each program directly addresses the systemic problems identified in our executive summary.",
    "prog1-label": "Education", "prog1-title": "Governance Academy", "prog1-desc": "Free workshops on HOA laws, financial literacy, and homeowners' rights.", "prog1-solves": "Solves: Problem 06",
    "prog2-badge": "Flagship", "prog2-label": "Monitoring", "prog2-title": "Transparency Watch", "prog2-desc": "Our team audits HOA compliance and publishes transparency scorecards.", "prog2-solves": "Solves: Problem 01",
    "prog3-label": "Legal Aid", "prog3-title": "Legal Support Network", "prog3-desc": "Partner law firms provide pro-bono legal assistance for governance issues.", "prog3-solves": "Solves: Problem 05",
    "prog4-label": "Technology", "prog4-title": "eAbante Platform", "prog4-desc": "A digital platform for financial data, transparent elections, and digital participation.", "prog4-solves": "Solves: Problem 03",
    "prog5-badge": "New", "prog5-label": "Governance Model", "prog5-title": "Purok Self-Governance", "prog5-desc": "Each purok is encouraged to form its own Council of Elders to self-govern under a unified Manifesto.", "prog5-solves": "Solves: Problem 02 & 04",
    "manifesto-label": "Ang Pangako ng Mamamayan", "manifesto-title": "Ang <span class=\"text-gradient\">Manipesto</span>", "manifesto-desc": "Ito ang pinagkakaisang dokumento ng bawat residente — ang paktang nagbibigkis sa buong pamayanan.",
    "manifesto-doc-title": "MANIFESTO NG MAMAMAYAN", "manifesto-doc-subtitle": "Citizen's Governance Pact", "manifesto-version": "Bersyon 2.1", "manifesto-effective": "Epektibo: Enero 2025", "manifesto-signers": "1,247 na nagpirma",
    "manifesto-preamble": "Paunang Pagpapahayag (Preamble Disclaimer)",
    "manifesto-preamble-content": "Ang Manipestong ito ay isang boluntaryo, mapayapa, at legal na samahan ng mga mamamayan. Wala kaming layuning pabagsakin o palitan ang itinatag na pamahalaang barangay o HOA. Sa halip, layunin naming makipagtulungan, magmungkahi ng mabuting pamamahala, at maging matapat na tagapagsubaybay upang ang aming pamayanan ay maging mas maayos, malinis, at makatao. Ang lahat ng nakapaloob dito ay gabay at rekomendasyon lamang, hindi puwersahang ipatutupad laban sa batas.",
    "manifesto-intro1": "Kami, mga residente ng Barangay [Name], ay malayang nagkakaisa sa ilalim ng Manipestong ito upang maitaguyod ang isang pamayanan na may malasakit, pagkakaisa, at maayos na pamamahala.",
    "manifesto-intro2": "Sa aming pagkakaisa, kinikilala namin na ang tunay na pagbabago ay nagsisimula sa bawat isa sa amin. Sa pamamagitan ng Manipestong ito, iminumungkahi namin ang mga sumusunod na layunin at prinsipyo.",
    "manifesto-purpose": "Layunin",
    "manifesto-purpose1": "Magsilbing boses ng bawat purok at ng buong barangay sa mga usaping panlipunan at pangkabuhayan.",
    "manifesto-purpose2": "Magkaroon ng maayos, malinis, at mapayapa na pamayanan sa pamamagitan ng sama-samang pagtutulungan.",
    "manifesto-purpose3": "Imungkahi sa bawat purok na magtatag ng kanilang sariling Sanggunian ng Matatanda (Council of Elders) na siyang mag-oorganisa ng mga proyekto at magiging tulay sa barangay. (Ito ay isang rekomendasyon lamang, hindi ipinag-uutos.)",
    "manifesto-purpose4": "Tiyakin na ang lahat ng mahahalagang desisyon (tulad ng badyet, pagbabago ng Manipesto, at pagpapatalsik ng opisyal ng kilusan) ay pag-uusapan nang sama-sama sa pangkalahatang pagpupulong at hindi ipatupad nang walang pahintulot ng nakararami. Ang mga pang-araw-araw na desisyon ay maaaring ipaubaya sa isang maliit na lupong tagapagpatupad (steering committee) na inihalal ng asemblea, ngunit ang nasabing lupon ay laging mananagot sa pangkalahatang asemblea.",
    "manifesto-principles": "Mga Prinsipyo ng Pamamahala",
    "manifesto-principles-intro": "Bilang patunay ng aming pagkakaisa, kami ay sumasang-ayon na sundin ang mga sumusunod na prinsipyo na siyang magiging gabay sa aming mga pinuno at sa bawat residente:",
    "manifesto-p1-title": "Karapatan sa Katiwasayan", "manifesto-p1-desc": "Bawat residente ay may karapatang malaman ang lahat ng financial records, meeting minutes, contracts, at desisyon ng namumunong lupon. Walang impormasyong itatago nang walang wastong dahilan.",
    "manifesto-p2-title": "Pananagutan ng mga Namumuno", "manifesto-p2-desc": "Ang lahat ng boluntaryong opisyal ng kilusang ito ay dapat sumailalim sa regular na audit at maaaring mapabalik (recall) ng mayorya ng mga kasapi. Para naman sa mga nahalal na opisyal ng HOA o barangay, ang kilusan ay maninindigan sa kanilang pananagutan sa pamamagitan ng paghahain ng reklamo sa Ombudsman, COMELEC, o iba pang tamang ahensya kung kinakailangan. Walang pinuno ang nakahihigit sa Manipestong ito.",
    "manifesto-p3-title": "Pamamahala ng Bawat Purok", "manifesto-p3-desc": "Iminumungkahi namin na ang bawat purok ay maghahalal ng sarili nitong Sanggunian ng Matatanda (Council of Elders) na bubuuin ng mga iginagalang at matagal nang naninirahan sa nasabing purok, anuman ang edad (basta matagal nang residente at kilala sa integridad). Kung ang isang purok ay magpasya na lumikha ng naturang konseho, iminumungkahi naming sila ang maglutas ng mga lokal na alitan, mamamahala sa mga pondong pampurok, at kakatawan sa kanilang purok sa pangkalahatang asemblea.",
    "manifesto-p4-title": "Pagkakaisa sa ilalim ng Manipesto", "manifesto-p4-desc": "Habang ang bawat purok ay may sariling pamamahala, lahat ng purok na sumasang-ayon sa Manipestong ito ay nakatali sa iisang Manipestong ito. Hinihikayat namin na walang purok ang magpatupad ng mga alituntuning sumasalungat sa diwa ng transparency, accountability, at patas na pamamahala.",
    "manifesto-p5-title": "Malayang Pagpili", "manifesto-p5-desc": "Lahat ng halalan — para sa pangunahing lupon at para sa bawat Sanggunian ng Matatanda (kung ang purok ay magpasyang magtatag nito) — ay isasagawa sa pamamagitan ng independiyenteng tagamasid, nabe-verify na balota, at transparent na pagbibilang ng boto.",
    "manifesto-p6-title": "Katarungang Pamayanan", "manifesto-p6-desc": "Ang mga alitan ay unang sasagutin sa antas ng purok — kung may naitatag na Sanggunian ng Matatanda, sila ang mag-aayos; kung wala, ang mga residente ng purok ay maaaring mag-usap nang sama-sama. Kung hindi maresolba, ito ay dadalhin sa pangkalahatang asemblea. Ang paghahabol sa korte ang huling paraan, hindi ang una.",
    "manifesto-p7-title": "Pagbabago ng Manipestong Ito", "manifesto-p7-desc": "Ang Manipestong ito ay maaaring baguhin (amend) sa pamamagitan ng mayoryang boto (mahigit sa kalahati) ng mga kasaping dumalo sa isang pangkalahatang pagpupulong, basta ang lahat ng purok ay nabigyan ng abiso nang hindi bababa sa dalawang linggo bago ang pulong. Anumang pagbabago ay isusulat at ilalabas bilang bagong bersyon, habang pinapanatili ang orihinal na diwa ng transparency, accountability, at pagkakaisa.",
    "manifesto-sign-btn": "Pirma ang Manipesto", "manifesto-signers-count": "1,247 na residente ang nagpirma",
    "manifesto-sidebar-structure": "Estruktura ng Pamamahala", "manifesto-sidebar-manifesto": "Manipesto", "manifesto-sidebar-manifesto-desc": "Ang paktang nagbibigkis ng lahat",
    "manifesto-sidebar-assembly": "Pangkalahatang Asemblea", "manifesto-sidebar-assembly-desc": "Lahat ng residente + mga delegado",
    "manifesto-sidebar-purok": "Purok", "manifesto-sidebar-council": "Sanggunian",
    "manifesto-sidebar-footnote": "Ang pagtatag ng Sanggunian ng Matatanda sa bawat purok ay isang rekomendasyon lamang, hindi ipinag-uutos. Bawat purok ay malayang magpasiya kung nais nitong bumuo ng sariling konseho. Ang Manipesto ay nagbibigay-gabay, hindi puwersa.",
    "manifesto-council-title": "Sanggunian ng Matatanda", "manifesto-council-desc": "Hinihikayat ang bawat purok na maghalal* ng 3–5 na iginagalang residente na siyang sisilbi bilang Sanggunian. Hindi sila mga politiko — sila ang kapitbahay na pinagkakatiwalaan dahil sa kanilang karunungan at katarungan.",
    "manifesto-council-footnote": "*Rekomendasyon lamang – boluntaryo bawat purok",
    "manifesto-council-role1": "Lulutas ng Alitan", "manifesto-council-role1-desc": "Pag-ayusin ang mga gulo sa purok bago lumala",
    "manifesto-council-role2": "Pamahalaan ang Pondong Purok", "manifesto-council-role2-desc": "Alagaan ang budget ng zona nang bukas at malinaw",
    "manifesto-council-role3": "Katawanin sa Asemblea", "manifesto-council-role3-desc": "Dalhin ang boses ng purok sa pagpupulong",
    "manifesto-council-role4": "Igalang ang Manipesto", "manifesto-council-role4-desc": "Siguruhin na ang lahat ng kilos ay ayon sa paktang ito",
    "manifesto-effective-title": "Bakit ito Epektibo",
    "manifesto-effective-1": "Malapit sa tao.", "manifesto-effective-1-desc": "Ang sanggunian ng purok ay kilala ang bawat pamilya — ang mga problema ay nahaharap agad, hindi pinabubula.",
    "manifesto-effective-2": "Walang politika.", "manifesto-effective-2-desc": "Ang mga matatanda ay pinili dahil sa kanilang ugali, hindi sa kampanya. Walang poster, walang pangako — track record lang.",
    "manifesto-effective-3": "Manipesto ay di-negotiable.", "manifesto-effective-3-desc": "Ang paktang ito ay nakabigkis sa lahat — mula Purok 1 hanggang sa pangunahing lupon. Walang eksepsyon.",
    "steering-label": "Internal Movement Guide", "steering-title": "Steering Committee <span class=\"text-gradient\">Election Guide</span>",
    "steering-desc": "A guide for signatories to elect a small steering committee that will handle day-to-day decisions between general assemblies.",
    "steering-purpose-title": "Purpose (Layunin)", "steering-purpose-desc": "The Steering Committee (Lupong Tagapagpatupad) is a small group of volunteers elected by the general assembly (all manifesto signatories) to manage routine decisions, coordinate programs, and prepare reports for the next assembly. The Committee is accountable to the assembly and can be recalled at any time.",
    "steering-composition-title": "Composition (Komposisyon)",
    "steering-comp1": "Recommended size: <strong class=\"text-slate-300\">3 to 7 members</strong> (odd number to break ties)",
    "steering-comp2": "At least one member should reside in a different purok to ensure representation",
    "steering-comp3": "No HOA officer or barangay official may serve unless they take a leave from their official position (to avoid conflict of interest)",
    "steering-election-title": "Election Process", "steering-step": "Step", "steering-action": "Action",
    "steering-step1-title": "Announcement", "steering-step1-desc": "Post the election date at least 2 weeks in advance via website, email list, and purok representatives.",
    "steering-step2-title": "Nomination", "steering-step2-desc": "Any manifesto signatory may self-nominate or be nominated by another signatory. Nominations close 3 days before the election.",
    "steering-step3-title": "Voting", "steering-step3-desc": "Conduct voting via a secure, verifiable method (e.g., Google Forms with voter email tracking, or in-person secret ballot). Each signatory gets one vote.",
    "steering-step4-title": "Independent Observer", "steering-step4-desc": "Invite a neutral person (e.g., a local teacher or religious leader) to observe the vote counting.",
    "steering-step5-title": "Result Announcement", "steering-step5-desc": "Publish the names of elected members and their vote counts within 24 hours.",
    "steering-term-title": "Term (Panahon)",
    "steering-term1": "<strong class=\"text-slate-300\">1 year</strong> (or 6 months for a pilot phase)",
    "steering-term2": "May be re-elected for another term",
    "steering-recall-title": "Recall (Pagpapabalik)",
    "steering-recall1": "Any signatory may petition for a recall election with signatures of <strong class=\"text-red-400\">20% of all signatories</strong>",
    "steering-recall2": "A recall vote is held within <strong class=\"text-slate-300\">30 days</strong>",
    "steering-responsibilities-title": "Responsibilities (Mga Pananagutan)",
    "steering-resp1-title": "Implement Assembly Decisions", "steering-resp1-desc": "Implement decisions approved by the general assembly.",
    "steering-resp2-title": "Manage Operations", "steering-resp2-desc": "Manage day-to-day operations (schedule workshops, respond to inquiries).",
    "steering-resp3-title": "Prepare Reports", "steering-resp3-desc": "Prepare financial and activity reports for each general assembly.",
    "steering-resp4-title": "Call General Assembly", "steering-resp4-desc": "Call a general assembly when a major decision (budget, manifesto amendment, officer removal) is needed.",
    "steering-checklist-title": "First Election Checklist",
    "steering-check1": "Designate a temporary election committee (3 volunteers not running for Steering Committee)",
    "steering-check2": "Create a master list of all manifesto signatories (with email/contact)",
    "steering-check3": "Prepare ballot template", "steering-check4": "Set date, time, and voting platform",
    "steering-check5": "Announce to all signatories", "steering-check6": "Count votes with observer",
    "steering-check7": "Announce results", "steering-check8": "Hold first Steering Committee meeting to elect Chair, Secretary, and Treasurer",
    "howto-label": "How to Join", "howto-title": "How to <span class=\"text-gradient\">Get Involved</span>",
    "howto-step1-title": "Read", "howto-step1-desc": "Study the Manifesto and understand the rights and responsibilities outlined herein",
    "howto-step2-title": "Sign", "howto-step2-desc": "Add your name to the growing list of residents standing up for good governance",
    "howto-step3-title": "Organize", "howto-step3-desc": "Help establish (if your purok wishes) a Council of Elders in your purok",
    "howto-step4-title": "Govern", "howto-step4-desc": "Govern your purok through the Council, report to the Assembly, and hold the board accountable",
    "sign-label": "Sign the Pact", "sign-title": "Sign the <span class=\"text-gradient\">Manifesto</span>", "sign-desc": "Sign your pledge to abide by the Manifesto. Your signature is a declaration that you believe in good governance.",
    "sign-name-label": "Full Name", "sign-email-label": "Email", "sign-address-label": "Block & Lot / Address", "sign-phone-label": "Phone Number",
    "sign-purok-label": "Purok", "sign-purok-select": "Select your purok", "sign-purok-na": "Not part of purok system",
    "sign-comment-label": "Comment (Optional)", "sign-privacy-title": "Data Privacy Notice",
    "sign-privacy-act": "In accordance with the <strong class=\"text-slate-300\">Data Privacy Act of the Philippines (RA 10173)</strong>, we inform you that:",
    "sign-privacy-1": "Your name, email, address, and other information will only be collected for the purpose of signing the Manifesto and communicating with you as part of the eAbante movement.",
    "sign-privacy-2": "We will not sell, distribute, or use your personal information for commercial purposes without your consent.",
    "sign-privacy-3": "Your signature and name may be displayed on the public list of supporters unless you request anonymity (email privacy@eabante.org).",
    "sign-privacy-4": "You may withdraw your consent or request deletion of your data by emailing us.",
    "sign-privacy-agree": "By signing the Manifesto, you agree to these terms.",
    "sign-manifesto-agree": "I have read the entire Manifesto and agree to abide by its purposes and principles. I will govern honestly with transparency, accountability, and fair governance in my community.",
    "sign-privacy-agree2": "I agree that my personal information will be collected and used only for the eAbante movement in accordance with the Data Privacy Act. It will not be sold or shared without my consent.",
    "sign-btn": "Sign the Manifesto",
    "champions-label": "Allies", "champions-title": "eAbante <span class=\"text-gradient\">Champions</span>",
    "champions-desc": "It's not enough to complain — we need leaders willing to run for office to change the system from within. Champions are residents ready to compete in HOA and Barangay elections — supported by eAbante and the Manifesto.",
    "champions-badge": "Priority",
    "champions-card1-title": "Run for HOA Election", "champions-card1-desc": "Become a candidate for your HOA board as a Champion. eAbante will provide the backbone of support — from campaign to legal assistance.",
    "champions-card1-li1": "Backed by Manifesto signatories in your community", "champions-card1-li2": "Free campaign materials and strategy guidance", "champions-card1-li3": "Legal support if there's a dispute in election results",
    "champions-card2-title": "Run for Barangay Election", "champions-card2-desc": "Run for Barangay level as Kagawad — leading with the Manifesto's vision for broader impact. Change starts in our own neighborhoods.",
    "champions-card2-li1": "Endorsed by eAbante network of residents", "champions-card2-li2": "Governance training and community organizing support", "champions-card2-li3": "Coalition with other eAbante Champions nationwide",
    "champions-card3-title": "Become a Champion", "champions-card3-desc": "You don't need to run — you just need to be faithful to the Manifesto and be a model of good governance. Be an inspiration to your community.",
    "champions-card3-li1": "Listed as certified Champion in our directory", "champions-card3-li2": "Priority access to our programs and events", "champions-card3-li3": "Connected to a network of reform-minded leaders",
    "champions-cta-title": "Ready to Become a Champion?", "champions-cta-desc": "Take our Champion assessment to see if you're ready to run. Our team will contact you for the next steps.",
    "champions-cta-btn": "Support the Cause",
    "donate-label": "Support the Movement", "donate-title": "Donate to <span class=\"text-gradient\">eAbante</span>",
    "donate-desc": "Every peso helps expand programs that give voice to communities in need of good governance.",
    "donate-btn": "Donate", "donate-receipt": "All donations will receive a tax receipt. Email info@eabante.org for confirmation.",
    "join-label": "Join Us", "join-title": "Be Part of the <span class=\"text-gradient\">Movement</span>",
    "join-desc": "There's a place for you at eAbante — resident, lawyer, auditor, or anyone who believes in good governance.",
    "join-card1-title": "Sign as Resident", "join-card1-desc": "Sign the Manifesto and join the push for self-governance in your purok.",
    "join-card2-title": "Professional", "join-card2-desc": "Lawyers, auditors, and educators — offer your skills as a volunteer to the movement.",
    "join-card3-title": "Donor", "join-card3-desc": "Sustain our programs and help reach more communities.",
    "join-newsletter-title": "Stay Informed", "join-newsletter-desc": "Receive governance tips, Manifesto updates, and community stories in your inbox.",
    "join-newsletter-btn": "Subscribe",
    "footer-desc": "A non-profit movement promoting good governance and transparency in homeowners associations — one purok at a time.",
    "footer-movement": "Movement", "footer-about": "About Us", "footer-problems": "Problems", "footer-programs": "Programs",
    "footer-gov-academy": "Governance Academy", "footer-transparency": "Transparency Watch", "footer-legal": "Legal Support", "footer-platform": "eAbante Platform",
    "footer-resources": "Resources", "footer-manifesto": "The Manifesto", "footer-election-guide": "Election Guide",
    "footer-sign": "Sign the Pact", "footer-champions": "eAbante Champions", "footer-copyright": "© 2025 eAbante Movement. All rights reserved."
  },
  tl: {
    "nav-about": "Tungkol", "nav-problems": "Mga Problema", "nav-pillars": "Mga Haligi", "nav-programs": "Mga Programa",
    "nav-manifesto": "Manipesto", "nav-guide": "Gabay", "nav-sign": "Pirma", "nav-champions": "Mga Kampeon", "nav-donate": "Mag-donate",
    "hero-badge": "Pagbibigay Kapangyarihan sa Maybahay Simula 2024", "hero-title1": "Maayos na Pamamahala", "hero-title2": "Nagsisimula sa Bahay",
    "hero-desc": "Ang eAbante ay isang non-profit movement na nakatuon sa pagtataguyod ng transparency, accountability, at patas na pamamahala sa mga homeowners association — isang purok sa bawat oras.",
    "hero-btn1": "Pirmahan ang Manipesto", "hero-btn2": "Tingnan ang mga Problema",
    "about-label": "Tungkol sa Kilusan", "about-title": "Pagtatanggol sa <span class=\"text-gradient\">Karapatan ng Maybahay</span>",
    "about-p1": "Sa maraming homeowners associations, ang mga desisyon ay ginagawa nang nakasarado. Ang mga dues ay kinokolekta nang walang malinaw na accounting. Ang mga halalan ay kulang sa tamang pangangasiwa. Ang mga maybahay ay naiiwan sa kadiliman — walang kapangyarihan laban sa sistemang idinisenyo upang hindi sila kasama.",
    "about-p2": "<strong class=\"text-white\">Ang eAbante</strong> ay itinatag upang baguhin iyon. Naniniwala kami na ang maayos na pamamahala ay hindi lamang para sa mga pamahalaan — nagsisimula ito sa kung saan tayo nakatira. Ang aming pangalan ay nagmula sa salitang Filipino na <em>\"abante\"</em>, nangangahulugang <strong class=\"text-brand-400\">umusong pasulong</strong>.",
    "about-p3": "Binibigyan namin ng kaalaman, kagamitan, at suporta legal ang mga maybahay na kailangan nila upang managot ang kanilang HOA boards. Sa pamamagitan ng aming Manipesto at modelo ng Purok Self-Governance, bumubuo kami ng sistema kung saan bawat piso ay may katumbas, bawat desisyon ay transparent, bawat purok ay may boses, at bawat matanda ay tagapagbantay ng tiwala.",
    "problems-label": "Buod ng Ehekutibo", "problems-title": "Ang mga Problemang <span class=\"text-gradient\">Aming Sinasagot</span>",
    "problems-desc": "Ito ang mga sistematikong pagkukulang sa pamamahala ng HOA na itinatag ang eAbante upang tugunan — hango sa mga tunay na pattern na napagmasdan sa iba't ibang komunidad.",
    "p1-title": "Kalabuan sa Pinansyal", "p1-desc": "Nagbabayad ang mga maybahay ng buwanang dues ngunit hindi nakikita kung saan napupunta ang pera. Ang mga financial statement ay hindi inilalathala, sinasadyang malabo, o imposibleng suriin.",
    "p1-stat1": "Walang inilalathalang financials", "p1-stat2": "Walang independiyenteng audit",
    "p2-title": "Pagkakaisa ng Kapangyarihan", "p2-desc": "Ang maliit na grupo ng mga opisyal ay may lahat ng awtoridad nang walang desentralisadong tseke. Walang representasyon sa antas ng purok, walang lokal na konseho, walang grassroots na pangangasiwa.",
    "p2-stat1": "Walang pamamahala sa antas ng purok", "p2-stat2": "Parehong opisyal muling nahalal nang walang kalaban",
    "p3-title": "Manipulasyon sa Halalan", "p3-desc": "Ang mga halalan ay isinasagawa nang walang independiyenteng tagamasid, ang sikretong balota ay hindi garantisado, ang pagbibilang ng boto ay kulang sa transparency. Ang parehong grupo ang kumokontrol sa lupon sa loob ng mga taon.",
    "p3-stat1": "Walang independiyenteng tagamasid", "p3-stat2": "Hindi alam ng mga maybahay ang iskedyul",
    "p4-title": "Walang Resolusyon ng Alitan", "p4-desc": "Walang istruktura ng medyasyn. Ang mga alitan ay tumatagal ng buwan at tumataas direkta sa mahal na litigasyon sa halip na malutas sa loob ng komunidad.",
    "p4-stat1": "Walang internal na medyasyn", "p4-stat2": "Umakyat sa litigasyon",
    "p5-title": "Pagbubukod sa mga Desisyon", "p5-desc": "Ang mga espesyal na assessment, imprastraktura na proyekto, at pagbabago ng patakaran ay pinagdedesisyonan ng lupon mag-isa. Ang mga maybahay ay impormado pagkatapos ng pangyayari — hindi kumunsulta bago.",
    "p5-stat1": "Walang konsulta bago ang desisyon", "p5-stat2": "Naramdaman ng mga maybahay ang kawalang kapangyarihan",
    "p6-title": "Walang Nagkakaisang Kasunduan", "p6-desc": "Walang pact sa buong komunidad na nagbubuklod sa lupon at mga maybahay sa isang shared na pamantayan ng pamamahala. Nang walang Manipesto, ang accountability ay opsyonal.",
    "p6-stat1": "Walang pact ng pamamahala", "p6-stat2": "Hindi alam ang kanilang mga karapatan",
    "problems-summary1": "Mga Sistematikong Problema na Natukoy", "problems-summary2": "Ang mga Maybahay ay Nakakaranas ng Kahit Isa", "problems-summary3": "Ang solusyon ng eAbante ay tumutugon sa anim",
    "pillars-label": "Aming Pundasyon", "pillars-title": "Apat na Haligi ng <span class=\"text-gradient\">Maayos na Pamamahala</span>",
    "pillar1-title": "Transparency", "pillar1-desc": "Ang mga financial record, meeting minutes, at mga desisyon ng lupon ay dapat na bukas na ma-access ng bawat maybahay.",
    "pillar2-title": "Accountability", "pillar2-desc": "Ang mga opisyal ng HOA ay dapat managot sa kanilang mga aksyon sa pamamagitan ng regular na audit, performance review, at proseso ng recall.",
    "pillar3-title": "Participation", "pillar3-desc": "Bawat maybahay ay may karapatang marinig — mula sa mga konseho ng purok hanggang sa pangkalahatang asemblea — upang walang maiiwan.",
    "pillar4-title": "Rule of Law", "pillar4-desc": "Ang pamamahala ng HOA ay dapat sumunod sa batas — mula sa Condominium Act hanggang sa mga lokal na ordinansa.",
    "programs-label": "Ano ang Aming Ginagawa", "programs-title": "Aming mga <span class=\"text-gradient\">Programa</span>", "programs-desc": "Ang bawat programa ay direktang tumutugon sa mga sistematikong problema na natukoy sa aming buod ng ehekutibo.",
    "prog1-label": "Edukasyon", "prog1-title": "Governance Academy", "prog1-desc": "Libreng workshop tungkol sa mga batas ng HOA, financial literacy, at mga karapatan ng maybahay.", "prog1-solves": "Solusyon: Problema 06",
    "prog2-badge": "Flagship", "prog2-label": "Pagsusuri", "prog2-title": "Transparency Watch", "prog2-desc": "Ang aming koponan ay naga-audit ng pagsunod ng HOA at naglalathala ng transparency scorecards.", "prog2-solves": "Solusyon: Problema 01",
    "prog3-label": "Tulong Legal", "prog3-title": "Legal Support Network", "prog3-desc": "Ang mga kaanib na kumpanya ng abogasyong nagbibigay ng pro-bono na tulong legal para sa mga isyu ng pamamahala.", "prog3-solves": "Solusyon: Problema 05",
    "prog4-label": "Teknolohiya", "prog4-title": "eAbante Platform", "prog4-desc": "Isang digital na platform para sa financial data, transparent na halalan, at digital na pakikilahok.", "prog4-solves": "Solusyon: Problema 03",
    "prog5-badge": "Bago", "prog5-label": "Modelo ng Pamamahala", "prog5-title": "Purok Self-Governance", "prog5-desc": "Ang bawat purok ay hinihikayat na bumuo ng sarili nitong Council of Elders upang pamahalaan ang sarili sa ilalim ng isang nagkakaisang Manipesto.", "prog5-solves": "Solusyon: Problema 02 & 04",
    "manifesto-label": "The Citizen's Promise", "manifesto-title": "The <span class=\"text-gradient\">Manifesto</span>", "manifesto-desc": "This is the unified document of every resident — the pact that binds the entire community.",
    "manifesto-doc-title": "MANIFESTO NG MAMAMAYAN", "manifesto-doc-subtitle": "Citizen's Governance Pact", "manifesto-version": "Version 2.1", "manifesto-effective": "Effective: January 2025", "manifesto-signers": "1,247 signatories",
    "manifesto-preamble": "Preamble Disclaimer", "manifesto-purpose": "Purpose", "manifesto-principles": "Principles of Governance",
    "manifesto-sign-btn": "Sign the Manifesto", "manifesto-signers-count": "1,247 residents have signed",
    "manifesto-sidebar-structure": "Governance Structure", "manifesto-sidebar-manifesto": "Manifesto", "manifesto-sidebar-manifesto-desc": "The pact that binds everyone",
    "manifesto-sidebar-assembly": "General Assembly", "manifesto-sidebar-assembly-desc": "All residents + delegates",
    "manifesto-sidebar-purok": "Purok", "manifesto-sidebar-council": "Council",
    "manifesto-sidebar-footnote": "Ang pagtatag ng Sanggunian ng Matatanda sa bawat purok ay isang rekomendasyon lamang, hindi ipinag-uutos. Bawat purok ay malayang magpasiya kung nais nitong bumuo ng sariling konseho. Ang Manipesto ay nagbibigay-gabay, hindi puwersa.",
    "manifesto-council-title": "Sanggunian ng Matatanda", "manifesto-council-desc": "Hinihikayat ang bawat purok na maghalal* ng 3–5 na iginagalang residente na siyang sisilbi bilang Sanggunian. Hindi sila mga politiko — sila ang kapitbahay na pinagkakatiwalaan dahil sa kanilang karunungan at katarungan.",
    "manifesto-council-footnote": "*Rekomendasyon lamang – boluntaryo bawat purok",
    "manifesto-council-role1": "Lulutas ng Alitan", "manifesto-council-role1-desc": "Pag-ayusin ang mga gulo sa purok bago lumala",
    "manifesto-council-role2": "Pamahalaan ang Pondong Purok", "manifesto-council-role2-desc": "Alagaan ang budget ng zona nang bukas at malinaw",
    "manifesto-council-role3": "Katawanin sa Asemblea", "manifesto-council-role3-desc": "Dalhin ang boses ng purok sa pagpupulong",
    "manifesto-council-role4": "Igalang ang Manipesto", "manifesto-council-role4-desc": "Siguruhin na ang lahat ng kilos ay ayon sa paktang ito",
    "manifesto-effective-title": "Bakit ito Epektibo",
    "manifesto-effective-1": "Malapit sa tao.", "manifesto-effective-1-desc": "Ang sanggunian ng purok ay kilala ang bawat pamilya — ang mga problema ay nahaharap agad, hindi pinabubula.",
    "manifesto-effective-2": "Walang politika.", "manifesto-effective-2-desc": "Ang mga matatanda ay pinili dahil sa kanilang ugali, hindi sa kampanya. Walang poster, walang pangako — track record lang.",
    "manifesto-effective-3": "Manipesto ay di-negotiable.", "manifesto-effective-3-desc": "Ang paktang ito ay nakabigkis sa lahat — mula Purok 1 hanggang sa pangunahing lupon. Walang eksepsyon.",
    "steering-label": "Gabay sa Loob ng Kilusan", "steering-title": "Gabay sa Halalan ng <span class=\"text-gradient\">Steering Committee</span>",
    "steering-desc": "Isang gabay para sa mga nagpirma upang maghalal ng maliit na steering committee na mangasiwa ng mga desisyon sa araw-araw sa pagitan ng mga pangkalahatang asemblea.",
    "steering-purpose-title": "Layunin (Purpose)", "steering-purpose-desc": "Ang Steering Committee (Lupong Tagapagpatupad) ay isang maliit na grupo ng mga boluntaryo na inihalal ng pangkalahatang asemblea (lahat ng nagpirma sa Manipesto) upang pamahalaan ang mga regular na desisyon, iugnay ang mga programa, at maghanda ng mga ulat para sa susunod na asemblea. Ang Komite ay mananagot sa asemblea at maaaring mapabalik anumang oras.",
    "steering-composition-title": "Komposisyon (Composition)",
    "steering-comp1": "Inirerekomendang sukat: <strong class=\"text-slate-300\">3 hanggang 7 miyembro</strong> (odd number para makapag-break ng ties)",
    "steering-comp2": "Kahit isang miyembro ay dapat nakatira sa ibang purok upang siguraduhin ang representasyon",
    "steering-comp3": "Walang opisyal ng HOA o barangay official ang maaaring maglingkod maliban kung sila ay magpaalam muna sa kanilang opisyal na posisyon (upang iwas conflict of interest)",
    "steering-election-title": "Proseso ng Halalan", "steering-step": "Hakbang", "steering-action": "Kilos",
    "steering-step1-title": "Anunsyo", "steering-step1-desc": "I-post ang petsa ng halalan nang 2 linggo nang mas maaga sa pamamagitan ng website, email list, at mga representante ng purok.",
    "steering-step2-title": "Nominasyon", "steering-step2-desc": "Anumang nagpirma sa Manipesto ay maaaring mag-nominate ng sarili o nominahin ng iba. Ang nominasyon ay nagsasara 3 araw bago ang halalan.",
    "steering-step3-title": "Pagboto", "steering-step3-desc": "Isagawa ang pagboto sa pamamagitan ng secure at ma-verify na paraan (hal. Google Forms na may voter email tracking, o personal na sikretong balota). Bawat nagpirma ay may isang boto.",
    "steering-step4-title": "Independiyenteng Tagamasid", "steering-step4-desc": "Mag-anyaya ng neutral na tao (hal. lokal na guro o relihiyosong lider) upang obserbahan ang pagbibilang ng boto.",
    "steering-step5-title": "Pag-anunsyo ng Resulta", "steering-step5-desc": "Ilathala ang mga pangalan ng mga nahalal na miyembro at ang kanilang bilang ng boto sa loob ng 24 oras.",
    "steering-term-title": "Panahon (Term)",
    "steering-term1": "<strong class=\"text-slate-300\">1 taon</strong> (o 6 na buwan para sa pilot phase)",
    "steering-term2": "Maaaring muling ihalal para sa isa pang termino",
    "steering-recall-title": "Pagpapabalik (Recall)",
    "steering-recall1": "Anumang nagpirma ay maaaring mag-petisyon para sa recall election na may mga pirma ng <strong class=\"text-red-400\">20% ng lahat ng nagpirma</strong>",
    "steering-recall2": "Ang recall vote ay isasagawa sa loob ng <strong class=\"text-slate-300\">30 araw</strong>",
    "steering-responsibilities-title": "Mga Pananagutan (Responsibilities)",
    "steering-resp1-title": "Ipapatupad ang Mga Desisyon ng Asemblea", "steering-resp1-desc": "Ipapatupad ang mga desisyong napag-approvehan ng pangkalahatang asemblea.",
    "steering-resp2-title": "Pamahalaan ang Operasyon", "steering-resp2-desc": "Pamahalaan ang mga araw-araw na operasyon (iskedyul ng workshop, tumugon sa mga inquiry).",
    "steering-resp3-title": "Maghanda ng Mga Ulat", "steering-resp3-desc": "Maghanda ng financial at activity reports para sa bawat pangkalahatang asemblea.",
    "steering-resp4-title": "Tumawag ng Pangkalahatang Asemblea", "steering-resp4-desc": "Tumawag ng pangkalahatang asemblea kapag kinakailangan ng malaking desisyon (badyet, pagbabago ng manipesto, pagtanggal ng opisyal).",
    "steering-checklist-title": "First Election Checklist",
    "steering-check1": "Magtalaga ng temporaryong election committee (3 boluntaryo na hindi tumatakbo para sa Steering Committee)",
    "steering-check2": "Gumawa ng master list ng lahat ng nagpirma sa Manipesto (may email/contact)",
    "steering-check3": "Maghanda ng ballot template", "steering-check4": "Magtakda ng petsa, oras, at voting platform",
    "steering-check5": "I-anunsyo sa lahat ng nagpirma", "steering-check6": "Bilangin ang boto na may observer",
    "steering-check7": "I-anunsyo ang resulta", "steering-check8": "Magdaos ng unang pulong ng Steering Committee upang maghalal ng Chair, Secretary, at Treasurer",
    "howto-label": "Paano Sumali", "howto-title": "Paano <span class=\"text-gradient\">Makilahok</span>",
    "howto-step1-title": "Basahin", "howto-step1-desc": "Pag-aralan ang Manipesto at unawain ang mga karapatan at pananagutang nakapaloob dito",
    "howto-step2-title": "Pirmahan", "howto-step2-desc": "Idagdag ang iyong pangalan sa lumalaking listahan ng mga residente na nakatayo para sa maayos na pamamahala",
    "howto-step3-title": "Organisahin", "howto-step3-desc": "Tumulong na magtatag (kung nais ng iyong purok) ng Council of Elders sa iyong purok",
    "howto-step4-title": "Pamahalaan", "howto-step4-desc": "Pamahalaan ang iyong purok sa pamamagitan ng Council, mag-ulat sa Asemblea, at panagutin ang lupon",
    "sign-label": "Pirmahan ang Pakta", "sign-title": "Pirmahan ang <span class=\"text-gradient\">Manipesto</span>", "sign-desc": "Pirmahan ang iyong pangako na sundin ang Manipesto. Ang iyong pirma ay isang deklarasyon na naniniwala ka sa maayos na pamamahala.",
    "sign-name-label": "Buong Pangalan", "sign-email-label": "Email", "sign-address-label": "Block & Lot / Address", "sign-phone-label": "Numero ng Telepono",
    "sign-purok-label": "Purok", "sign-purok-select": "Pumili ng iyong purok", "sign-purok-na": "Hindi Kasama sa purok system",
    "sign-comment-label": "Komento (Opsyonal)", "sign-privacy-title": "Paunawa sa Pagkapribado",
    "sign-privacy-act": "Alinsunod sa <strong class=\"text-slate-300\">Data Privacy Act ng Pilipinas (RA 10173)</strong>, ipinapaalam namin na:",
    "sign-privacy-1": "Ang inyong pangalan, email, address, at iba pang impormasyon ay kokolektahin lamang para sa layunin ng pagpirma sa Manipesto at pakikipag-ugnayan sa inyo bilang bahagi ng eAbante movement.",
    "sign-privacy-2": "Hindi namin ibebenta, ipamamahagi, o gagamitin ang inyong personal na impormasyon para sa komersyal na layunin nang wala ang inyong pahintulot.",
    "sign-privacy-3": "Ang inyong pirma at pangalan ay maaaring ipakita sa pampublikong listahan ng mga sumusuporta maliban kung humiling kayo ng pagiging anonymous (mag-email sa privacy@eabante.org).",
    "sign-privacy-4": "Maari ninyong bawiin ang inyong pahintulot o humiling ng pagbura ng inyong datos sa pamamagitan ng pag-email sa amin.",
    "sign-privacy-agree": "Sa pagpirma sa Manipesto, kayo ay sumasang-ayon sa mga tuntuning ito.",
    "sign-manifesto-agree": "<strong class=\"text-brand-400\">Nababasa ko na ang buong Manipesto</strong> at sumasang-ayon ako na susundin ang mga layunin at prinsipyong nito. Ako ay magiging tapat na mamamahala nang may transparency, accountability, at patas na pamamahala sa aking komunidad.",
    "sign-privacy-agree2": "Sumasang-ayon ako na ang aking personal na impormasyon ay kokolektahin at gagamitin lamang para sa eAbante movement alinsunod sa <strong class=\"text-brand-400\">Data Privacy Act</strong>. Hindi ito ibebenta o ibabahagi nang walang pahintulot ko.",
    "sign-btn": "Ipirma ang Manipesto",
    "champions-label": "Mga Kabalikat", "champions-title": "eAbante <span class=\"text-gradient\">Champions</span>",
    "champions-desc": "Hindi sapat ang magreklamo — kailangan may mga liderong kayang tumakbo sa posisyon para palitan ang sistem mula loob. Ang mga Champion ay mga residenteng handang lumalaban sa HOA at Barangay elections — na pinagtataguyod ng eAbante at ng Manipesto.",
    "champions-badge": "Priority",
    "champions-card1-title": "Tumakbo sa HOA Election", "champions-card1-desc": "Maging kandidato sa lupon ng inyong HOA bilang Champion. Ang eAbante ang magbibigay ng backbone ng suporta — mula sa kampanya hanggang sa legal assistance.",
    "champions-card1-li1": "Backed by Manifesto signatories sa inyong komunidad", "champions-card1-li2": "Free campaign materials at strategy guidance", "champions-card1-li3": "Legal support kung may dispute sa resulta ng halalan",
    "champions-card2-title": "Tumakbo sa Barangay Election", "champions-card2-desc": "Magdalawa sa Barangay level bilang Kagawad — pinangunahin ng layunin ng Manipesto sa mas malawak na sakop. Ang pagbabago ay nagsisimula sa ating mga sariling nayon.",
    "champions-card2-li1": "Endorsed by eAbante network ng mga residente", "champions-card2-li2": "Governance training at community organizing support", "champions-card2-li3": "Coalition with other eAbante Champions nationwide",
    "champions-card3-title": "Maging Champion", "champions-card3-desc": "Hindi ka kailang tumakbo — kailangan mo lang maging tapat sa Manipesto at maging modelo ng maayos na pamamahala. Maging inspirasyon sa iyong komunidad.",
    "champions-card3-li1": "Listahan bilang certified Champion sa aming directory", "champions-card3-li2": "Priority access sa aming programs at events", "champions-card3-li3": "Connected to a network of reform-minded leaders",
    "champions-cta-title": "Handa Ka Na Maging Champion?", "champions-cta-desc": "Kumuha ng aming Champion assessment para malaman kung handa ka na lumaban. I-contact ka ng aming team para sa susunod na hakbang.",
    "champions-cta-btn": "Suportahan ang Layunin",
    "donate-label": "Suportahan ang Kilusan", "donate-title": "Mag-donate sa <span class=\"text-gradient\">eAbante</span>",
    "donate-desc": "Ang bawat piso ay tumutulong pagpalawak ng mga programang nagbibigay-boses sa mga komunidad na nangangailangan ng maayos na pamamahala.",
    "donate-btn": "Donate", "donate-receipt": "Ang lahat ng donasyon ay tx-receipt ang ire-receceived. Magpadala kay info@eabante.org para sa confirmation.",
    "join-label": "Sumali Ka", "join-title": "Maging Bahagi ng <span class=\"text-gradient\">Kilusan</span>",
    "join-desc": "May puwesto ka dito sa eAbante — residente, abogado, audidor, o sinumang naniniwala sa maayos na pamamahala.",
    "join-card1-title": "Magpirma bilang Residente", "join-card1-desc": "Pirmahan ang Manipesto at sumali sa pagtulak ng self-governance sa iyong purok.",
    "join-card2-title": "Propesyonal", "join-card2-desc": "Mga abogado, auditors, at edukador — mag-alok ng iyong kasanayan bilang boluntaryo sa movement.",
    "join-card3-title": "Donor", "join-card3-desc": "Sustentuhan ang aming mga programa at tulungang makarating sa mas maraming pamayanan.",
    "join-newsletter-title": "Manatiling Impormado", "join-newsletter-desc": "Makatanggap ng mga tips sa pamamahala, update sa Manipesto, at kwento ng pamayanan sa iyong inbox.",
    "join-newsletter-btn": "Mag-subscribe",
    "footer-desc": "Isang non-profit movement na nagtataguyod ng maayos na pamamahala at transparency sa mga homeowners associations — isang purok sa bawat oras.",
    "footer-movement": "Kilusan", "footer-about": "Tungkol Sa Amin", "footer-problems": "Mga Problema", "footer-programs": "Mga Programa",
    "footer-gov-academy": "Governance Academy", "footer-transparency": "Transparency Watch", "footer-legal": "Legal Support", "footer-platform": "eAbante Platform",
    "footer-resources": "Resources", "footer-manifesto": "Ang Manipesto", "footer-election-guide": "Election Guide",
    "footer-sign": "Pirmahan ang Pakta", "footer-champions": "eAbante Champions", "footer-copyright": "© 2025 eAbante Movement. Lahat ng karapatan ay nakalaan."
  }
};

export default function App() {
  const [currentLang, setCurrentLang] = useState(() => localStorage.getItem('eAbante_lang') || 'en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, title: '', message: '' });
  const [barsAnimated, setBarsAnimated] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const problemsRef = useRef(null);
  const signFormRef = useRef(null);
  const newsletterFormRef = useRef(null);

  const t = (key) => {
    const lang = translations[currentLang];
    if (currentLang === 'en') {
      const enKey = key + '-en';
      if (lang[enKey]) return lang[enKey];
    }
    return lang[key] || translations.en[key] || key;
  };

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'tl' : 'en';
    setCurrentLang(newLang);
    localStorage.setItem('eAbante_lang', newLang);
  };

  const showToast = (title, message) => {
    setToast({ show: true, title, message });
    setTimeout(() => setToast({ show: false, title: '', message: '' }), 5000);
  };

  const handleCustomDonation = () => {
    const val = document.getElementById('customAmount')?.value;
    if (val && parseInt(val) >= 100) {
      showToast('Salamat sa iyong donasyon!', '₱' + parseInt(val).toLocaleString() + ' ang naibigay. Magpadala sa info@eabante.org para sa tx-receipt.');
      document.getElementById('customAmount').value = '';
    } else {
      showToast('Invalid amount', 'Maglagay ng hindi bababa sa ₱100.');
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting && !barsAnimated) setBarsAnimated(true); });
    }, { threshold: 0.2 });
    if (problemsRef.current) observer.observe(problemsRef.current);
    return () => observer.disconnect();
  }, [barsAnimated]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const problemBars = [
    { icon: 'lucide:eye-off', title: 'p1-title', desc: 'p1-desc', stat1: 'p1-stat1', stat2: 'p1-stat2', w1: '67%', w2: '82%', l1: '67% of HOAs', l2: '82% of HOAs' },
    { icon: 'lucide:crown', title: 'p2-title', desc: 'p2-desc', stat1: 'p2-stat1', stat2: 'p2-stat2', w1: '91%', w2: '74%', l1: '91% of HOAs', l2: '74% of HOAs' },
    { icon: 'lucide:vote', title: 'p3-title', desc: 'p3-desc', stat1: 'p3-stat1', stat2: 'p3-stat2', w1: '78%', w2: '56%', l1: '78% of HOAs', l2: '56% of HOAs' },
    { icon: 'lucide:swords', title: 'p4-title', desc: 'p4-desc', stat1: 'p4-stat1', stat2: 'p4-stat2', w1: '88%', w2: '43%', l1: '88% of HOAs', l2: '43% of cases' },
    { icon: 'lucide:ban', title: 'p5-title', desc: 'p5-desc', stat1: 'p5-stat1', stat2: 'p5-stat2', w1: '85%', w2: '92%', l1: '85% of HOAs', l2: '92% surveyed' },
    { icon: 'lucide:file-x', title: 'p6-title', desc: 'p6-desc', stat1: 'p6-stat1', stat2: 'p6-stat2', w1: '96%', w2: '79%', l1: '96% of HOAs', l2: '79% surveyed' }
  ];

  return (
    <div className={`bg-slate-950 text-white font-sans overflow-x-hidden ${currentLang === 'tl' ? 'lang-tl' : 'lang-en'}`}>
      <svg className="grain"><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#grain)"/></svg>
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-brand-500/10 rounded-full blur-[100px] animate-blob mix-blend-screen"></div>
        <div className="absolute top-3/4 -right-48 w-96 h-96 bg-brand-600/10 rounded-full blur-[100px] animate-blob mix-blend-screen" style={{animationDelay:'3s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-400/5 rounded-full blur-[100px] animate-blob mix-blend-screen" style={{animationDelay:'6s'}}></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center" style={{background:'rgba(10,10,10,0.8)',backdropFilter:'blur(12px)',borderBottom:scrolled?'1px solid rgba(30,30,30,0.6)':'none'}}>
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-brand-500 flex items-center justify-center shadow-[0_0_10px_rgba(34,197,94,0.3)] group-hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-all duration-300">
              <iconify-icon icon="lucide:shield-check" width="22" className="text-slate-950"></iconify-icon>
            </div>
            <span className="text-xl font-bold tracking-tight">e<span className="text-gradient">Abante</span></span>
          </a>
          <div className="hidden lg:flex items-center gap-7">
            {['nav-about','nav-problems','nav-pillars','nav-programs','nav-manifesto','nav-guide','nav-sign','nav-champions','nav-donate'].map((key,i) => (
              <a key={i} href={['#about','#problems','#pillars','#programs','#manifesto','#steering-committee','#sign','#champions','#donate'][i]} className="text-xs uppercase tracking-widest text-slate-400 hover:text-brand-400 transition-colors duration-300">{t(key)}</a>
            ))}
            <button onClick={toggleLanguage} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/50 text-xs font-mono hover:border-brand-500/50 transition-colors">
              <iconify-icon icon="lucide:languages" width="14" className="text-brand-400"></iconify-icon>
              <span className="text-slate-300">{currentLang==='en'?'TL':'EN'}</span>
            </button>
          </div>
          <button onClick={()=>setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-slate-400 hover:text-white transition-colors">
            <iconify-icon icon={mobileMenuOpen?'lucide:x':'lucide:menu'} width="24"></iconify-icon>
          </button>
        </div>
        <div className="absolute top-20 left-0 right-0 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 lg:hidden" style={{maxHeight:mobileMenuOpen?'600px':'0',overflow:'hidden',transition:'max-height 0.3s ease'}}>
          <div className="px-4 py-6 flex flex-col gap-4">
            {['nav-about','nav-problems','nav-pillars','nav-programs','nav-manifesto','nav-guide','nav-sign','nav-champions','nav-donate'].map((key,i) => (
              <a key={i} href={['#about','#problems','#pillars','#programs','#manifesto','#steering-committee','#sign','#champions','#donate'][i]} onClick={()=>setMobileMenuOpen(false)} className="text-sm uppercase tracking-widest text-slate-400 hover:text-brand-400 transition-colors py-2">{t(key)}</a>
            ))}
            <button onClick={()=>{toggleLanguage();setMobileMenuOpen(false);}} className="flex items-center gap-2 px-4 py-3 rounded-lg border border-slate-700 bg-slate-800/50 text-sm font-mono hover:border-brand-500/50 transition-colors mt-2">
              <iconify-icon icon="lucide:languages" width="16" className="text-brand-400"></iconify-icon>
              <span className="text-slate-300">{currentLang==='en'?'Tagalog':'English'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-36 lg:pt-48 pb-24 lg:pb-32 px-4 overflow-hidden scanlines">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse2"></span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400 font-mono">{t('hero-badge')}</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.9] tracking-tightest mb-8">
            <span className="block">{t('hero-title1')}</span>
            <span className="block text-gradient text-glow">{t('hero-title2')}</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 font-mono leading-relaxed mb-10">{t('hero-desc')}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#sign" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-brand-500 text-slate-950 text-xs font-bold uppercase tracking-wide hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all duration-300">
              <span>{t('hero-btn1')}</span><iconify-icon icon="lucide:pen-line" width="16"></iconify-icon>
            </a>
            <a href="#problems" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wide hover:border-brand-500/50 hover:text-white transition-all duration-300">
              <span>{t('hero-btn2')}</span><iconify-icon icon="lucide:chevron-down" width="16"></iconify-icon>
            </a>
          </div>
          <div className="mt-16 animate-float"><iconify-icon icon="lucide:chevrons-down" width="24" className="text-slate-600"></iconify-icon></div>
        </div>
      </section>
      <div className="line-gradient h-px max-w-3xl mx-auto"></div>

      {/* About */}
      <section id="about" className="relative py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-500 font-mono">{t('about-label')}</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-6" dangerouslySetInnerHTML={{__html:t('about-title')}}></h2>
          <div className="space-y-4 text-sm text-slate-300 font-mono leading-relaxed text-left">
            <p dangerouslySetInnerHTML={{__html:t('about-p1')}}></p>
            <p dangerouslySetInnerHTML={{__html:t('about-p2')}}></p>
            <p dangerouslySetInnerHTML={{__html:t('about-p3')}}></p>
          </div>
        </div>
      </section>
      <div className="line-gradient h-px max-w-3xl mx-auto"></div>

      {/* Problems */}
      <section id="problems" ref={problemsRef} className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-500 font-mono">{t('problems-label')}</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-4" dangerouslySetInnerHTML={{__html:t('problems-title')}}></h2>
            <p className="max-w-2xl mx-auto text-sm text-slate-400 font-mono">{t('problems-desc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problemBars.map((p,idx) => (
              <div key={idx} className="group rounded-xl border border-red-500/20 bg-red-500/[0.03] backdrop-blur-sm p-6 hover:border-red-500/40 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0"><iconify-icon icon={p.icon} width="20" className="text-red-400"></iconify-icon></div>
                  <div><span className="text-[9px] font-bold uppercase tracking-wider text-red-500/60 font-mono">Problem 0{idx+1}</span><h3 className="text-sm font-bold font-mono">{t(p.title)}</h3></div>
                </div>
                <p className="text-xs text-slate-400 font-mono leading-relaxed mb-4">{t(p.desc)}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono"><span className="text-slate-500">{t(p.stat1)}</span><span className="text-red-400 font-bold">{p.l1}</span></div>
                  <div className="problem-bar"><div className="problem-bar-fill bg-red-500/60" style={{width:barsAnimated?p.w1:'0%'}}></div></div>
                  <div className="flex items-center justify-between text-[10px] font-mono"><span className="text-slate-500">{t(p.stat2)}</span><span className="text-red-400 font-bold">{p.l2}</span></div>
                  <div className="problem-bar"><div className="problem-bar-fill bg-red-500/60" style={{width:barsAnimated?p.w2:'0%'}}></div></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0"><iconify-icon icon="lucide:alert-triangle" width="20" className="text-red-400"></iconify-icon></div><div><div className="text-lg font-bold font-mono text-red-400">6</div><div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">{t('problems-summary1')}</div></div></div>
              <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center flex-shrink-0"><iconify-icon icon="lucide:users" width="20" className="text-yellow-400"></iconify-icon></div><div><div className="text-lg font-bold font-mono text-yellow-400">9 in 10</div><div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">{t('problems-summary2')}</div></div></div>
              <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center flex-shrink-0"><iconify-icon icon="lucide:lightbulb" width="20" className="text-brand-400"></iconify-icon></div><div><div className="text-lg font-bold font-mono text-brand-400">1 System</div><div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">{t('problems-summary3')}</div></div></div>
            </div>
          </div>
        </div>
      </section>
      <div className="line-gradient h-px max-w-3xl mx-auto"></div>

      {/* Pillars */}
      <section id="pillars" className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-500 font-mono">{t('pillars-label')}</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-4" dangerouslySetInnerHTML={{__html:t('pillars-title')}}></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[{icon:'lucide:eye',t:'pillar1-title',d:'pillar1-desc'},{icon:'lucide:scale',t:'pillar2-title',d:'pillar2-desc'},{icon:'lucide:users',t:'pillar3-title',d:'pillar3-desc'},{icon:'lucide:book-open',t:'pillar4-title',d:'pillar4-desc'}].map((x,i)=>(
              <div key={i} className="group relative rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-8 hover:border-brand-500/50 hover:shadow-[0_0_15px_rgba(34,197,94,0.1)] transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center mb-5 group-hover:border-brand-500/30 transition-colors duration-300"><iconify-icon icon={x.icon} width="24" className="text-brand-400 group-hover:scale-110 transition-transform duration-300"></iconify-icon></div>
                <h3 className="text-xl font-bold font-mono mb-3">{t(x.t)}</h3>
                <p className="text-sm text-slate-400 font-mono leading-relaxed">{t(x.d)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="line-gradient h-px max-w-3xl mx-auto"></div>

      {/* Programs */}
      <section id="programs" className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-500 font-mono">{t('programs-label')}</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-4" dangerouslySetInnerHTML={{__html:t('programs-title')}}></h2>
            <p className="max-w-2xl mx-auto text-sm text-slate-500 font-mono">{t('programs-desc')}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[{icon:'lucide:graduation-cap',l:'prog1-label',t:'prog1-title',d:'prog1-desc',s:'prog1-solves'},{icon:'lucide:search',l:'prog2-label',t:'prog2-title',d:'prog2-desc',s:'prog2-solves',badge:'prog2-badge',featured:true},{icon:'lucide:gavel',l:'prog3-label',t:'prog3-title',d:'prog3-desc',s:'prog3-solves'}].map((x,i)=>(
              <div key={i} className={`group rounded-xl border ${x.featured?'border-brand-500/30 shadow-[0_0_30px_rgba(34,197,94,0.1)]':'border-slate-800'} bg-slate-900/50 backdrop-blur-sm p-8 hover:border-brand-500/50 transition-all duration-300 relative`}>
                {x.badge && <div className="absolute -top-3 right-6"><span className="px-3 py-1 rounded-full bg-brand-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider">{t(x.badge)}</span></div>}
                <div className="flex items-center gap-3 mb-5"><div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center"><iconify-icon icon={x.icon} width="20" className="text-brand-400"></iconify-icon></div><span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">{t(x.l)}</span></div>
                <h3 className="text-xl font-bold font-mono mb-3">{t(x.t)}</h3>
                <p className="text-sm text-slate-400 font-mono leading-relaxed mb-3">{t(x.d)}</p>
                <div className="text-[10px] text-slate-600 font-mono">{t(x.s)}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {[{icon:'lucide:monitor-smartphone',l:'prog4-label',t:'prog4-title',d:'prog4-desc',s:'prog4-solves'},{icon:'lucide:landmark',l:'prog5-label',t:'prog5-title',d:'prog5-desc',s:'prog5-solves',badge:'prog5-badge',featured:true}].map((x,i)=>(
              <div key={i} className={`group rounded-xl border ${x.featured?'border-brand-500/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]':'border-slate-800'} bg-slate-900/50 backdrop-blur-sm p-8 hover:border-brand-500/50 transition-all duration-300 relative`}>
                {x.badge && <div className="absolute -top-3 right-6"><span className="px-3 py-1 rounded-full bg-slate-900 border border-brand-500/50 text-brand-400 text-[10px] font-bold uppercase tracking-wider">{t(x.badge)}</span></div>}
                <div className="flex items-center gap-3 mb-5"><div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center"><iconify-icon icon={x.icon} width="20" className="text-brand-400"></iconify-icon></div><span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">{t(x.l)}</span></div>
                <h3 className="text-xl font-bold font-mono mb-3">{t(x.t)}</h3>
                <p className="text-sm text-slate-400 font-mono leading-relaxed mb-3">{t(x.d)}</p>
                <div className="text-[10px] text-slate-600 font-mono">{t(x.s)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="line-gradient h-px max-w-3xl mx-auto"></div>

      {/* Manifesto, Steering Committee, How It Works, Sign, Champions, Donate, Join, Footer - continued in next part */}
      <ManifestoSection t={t} />
      <div className="line-gradient h-px max-w-3xl mx-auto"></div>
      <SteeringCommitteeSection t={t} />
      <div className="line-gradient h-px max-w-3xl mx-auto"></div>
      <HowItWorksSection t={t} />
      <div className="line-gradient h-px max-w-3xl mx-auto"></div>
      <SignSection t={t} signFormRef={signFormRef} showToast={showToast} />
      <div className="line-gradient h-px max-w-3xl mx-auto"></div>
      <ChampionsSection t={t} />
      <div className="line-gradient h-px max-w-3xl mx-auto"></div>
      <DonateSection t={t} handleCustomDonation={handleCustomDonation} />
      <div className="line-gradient h-px max-w-3xl mx-auto"></div>
      <JoinSection t={t} newsletterFormRef={newsletterFormRef} showToast={showToast} />
      <Footer t={t} />

      {/* Toast */}
      <div className={`toast-notification fixed bottom-6 right-6 z-[9999] px-6 py-4 rounded-xl border border-brand-500/30 bg-slate-900/95 backdrop-blur-xl shadow-[0_0_30px_rgba(34,197,94,0.2)] max-w-sm ${toast.show?'show':''}`}>
        <div className="flex items-start gap-3">
          <iconify-icon icon="lucide:check-circle" width="20" className="text-brand-400 mt-0.5 flex-shrink-0"></iconify-icon>
          <div><p className="text-sm font-bold font-mono">{toast.title}</p><p className="text-xs text-slate-400 font-mono mt-1">{toast.message}</p></div>
          <button onClick={()=>setToast({show:false,title:'',message:''})} className="text-slate-500 hover:text-white transition-colors flex-shrink-0"><iconify-icon icon="lucide:x" width="16"></iconify-icon></button>
        </div>
      </div>
    </div>
  );
}

function ManifestoSection({t}) {
  return (
    <section id="manifesto" className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-500 font-mono">{t('manifesto-label')}</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-4" dangerouslySetInnerHTML={{__html:t('manifesto-title')}}></h2>
          <p className="max-w-2xl mx-auto text-sm text-slate-400 font-mono">{t('manifesto-desc')}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-brand-500/20 bg-slate-900/50 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
              <div className="px-8 pt-8 pb-6 border-b border-slate-800">
                <div className="flex items-center gap-3 mb-4"><iconify-icon icon="lucide:scroll-text" width="28" className="text-brand-400"></iconify-icon>
                  <div><h3 className="text-lg font-bold font-mono">{t('manifesto-doc-title')}</h3><p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">{t('manifesto-doc-subtitle')}</p></div>
                </div>
                <div className="flex items-center gap-4 text-[10px] text-slate-600 font-mono"><span>{t('manifesto-version')}</span><span>•</span><span>{t('manifesto-effective')}</span><span>•</span><span className="text-brand-500">{t('manifesto-signers')}</span></div>
              </div>
              <div className="px-8 py-6 manifesto-scroll space-y-8">
                <div className="rounded-lg bg-brand-500/5 border border-brand-500/20 p-4 mb-6">
                  <div className="flex items-start gap-3"><iconify-icon icon="lucide:info" width="18" className="text-brand-400 mt-0.5 flex-shrink-0"></iconify-icon>
                    <div><h4 className="text-xs font-bold text-brand-400 font-mono mb-2">{t('manifesto-preamble')}</h4><p className="text-xs text-slate-400 font-mono leading-[1.8]">{t('manifesto-preamble-content')}</p></div>
                  </div>
                </div>
                <div className="text-xs text-slate-300 font-mono leading-[1.8]"><p className="mb-3">{t('manifesto-intro1')}</p><p>{t('manifesto-intro2')}</p></div>
                <div>
                  <div className="flex items-center gap-2 mb-4"><div className="h-px flex-1 bg-brand-500/20"></div><h4 className="text-sm font-bold text-brand-400 font-mono uppercase tracking-wider">{t('manifesto-purpose')}</h4><div className="h-px flex-1 bg-brand-500/20"></div></div>
                  <div className="space-y-4">{[1,2,3,4].map(n=>(<div key={n} className="flex gap-3 items-start"><div className="layunin-num">{n}</div><p className="text-xs text-slate-300 font-mono leading-[1.8]">{t('manifesto-purpose'+n)}</p></div>))}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-4"><div className="h-px flex-1 bg-brand-500/20"></div><h4 className="text-sm font-bold text-brand-400 font-mono uppercase tracking-wider">{t('manifesto-principles')}</h4><div className="h-px flex-1 bg-brand-500/20"></div></div>
                  <p className="text-xs text-slate-400 font-mono leading-[1.8] mb-5">{t('manifesto-principles-intro')}</p>
                  <div className="space-y-6">{[{r:'I',t:'manifesto-p1-title',d:'manifesto-p1-desc'},{r:'II',t:'manifesto-p2-title',d:'manifesto-p2-desc'},{r:'III',t:'manifesto-p3-title',d:'manifesto-p3-desc'},{r:'IV',t:'manifesto-p4-title',d:'manifesto-p4-desc'},{r:'V',t:'manifesto-p5-title',d:'manifesto-p5-desc'},{r:'VI',t:'manifesto-p6-title',d:'manifesto-p6-desc'},{r:'VII',t:'manifesto-p7-title',d:'manifesto-p7-desc'}].map((x,i)=>(<div key={i} className="flex gap-4"><span className="text-xs font-bold text-brand-500 font-mono mt-0.5 flex-shrink-0 w-6">{x.r}.</span><div><h5 className="text-sm font-bold font-mono mb-1">{t(x.t)}</h5><p className="text-xs text-slate-400 font-mono leading-[1.8]">{t(x.d)}</p></div></div>))}</div>
                </div>
              </div>
              <div className="px-8 py-6 border-t border-slate-800">
                <a href="#sign" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-500 text-slate-950 text-xs font-bold uppercase tracking-wide hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all duration-300"><iconify-icon icon="lucide:pen-line" width="16"></iconify-icon>{t('manifesto-sign-btn')}</a>
                <p className="text-[10px] text-slate-600 font-mono mt-3">{t('manifesto-signers-count')}</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6">
              <h4 className="text-sm font-bold font-mono mb-5 flex items-center gap-2"><iconify-icon icon="lucide:network" width="16" className="text-brand-400"></iconify-icon>{t('manifesto-sidebar-structure')}</h4>
              <div className="space-y-3">
                <div className="flex justify-center"><div className="px-4 py-2.5 rounded-lg bg-brand-500/10 border border-brand-500/30 text-center"><div className="text-[10px] font-bold text-brand-400 font-mono uppercase tracking-wider">{t('manifesto-sidebar-manifesto')}</div><div className="text-[9px] text-slate-500 font-mono">{t('manifesto-sidebar-manifesto-desc')}</div></div></div>
                <div className="flex justify-center"><div className="w-px h-4 bg-brand-500/30"></div></div>
                <div className="flex justify-center"><div className="px-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700 text-center"><div className="text-[10px] font-bold text-white font-mono uppercase tracking-wider">{t('manifesto-sidebar-assembly')}</div><div className="text-[9px] text-slate-500 font-mono">{t('manifesto-sidebar-assembly-desc')}</div></div></div>
                <div className="flex justify-center"><div className="w-px h-4 bg-slate-700"></div></div>
                <div className="grid grid-cols-3 gap-2">{['SWAB','MEAB','CENTRAL'].map(name=>(<div key={name} className="px-3 py-3 rounded-lg bg-slate-950 border border-slate-800 text-center hover:border-brand-500/30 transition-colors"><iconify-icon icon="lucide:home" width="16" className="text-brand-500/60 mb-1"></iconify-icon><div className="text-[9px] font-bold text-slate-300 font-mono">{name}</div><div className="text-[8px] text-slate-600 font-mono">{t('manifesto-sidebar-council')}</div></div>))}</div>
                <div className="text-center text-[10px] text-slate-600 font-mono">• • •</div>
                <div className="grid grid-cols-3 gap-2">{['ABANTE','KAPITBAHAYAN','SEAB'].map(name=>(<div key={name} className="px-3 py-3 rounded-lg bg-slate-950 border border-slate-800 text-center hover:border-brand-500/30 transition-colors"><iconify-icon icon="lucide:home" width="16" className="text-brand-500/60 mb-1"></iconify-icon><div className="text-[9px] font-bold text-slate-300 font-mono">{name}</div><div className="text-[8px] text-slate-600 font-mono">{t('manifesto-sidebar-council')}</div></div>))}</div>
                <div className="text-center text-[10px] text-slate-600 font-mono">• • •</div>
                <div className="flex justify-center"><div className="px-3 py-3 rounded-lg bg-slate-950 border border-slate-800 text-center hover:border-brand-500/30 transition-colors"><iconify-icon icon="lucide:home" width="16" className="text-brand-500/60 mb-1"></iconify-icon><div className="text-[9px] font-bold text-slate-300 font-mono">ST. RAYMOND</div><div className="text-[8px] text-slate-600 font-mono">{t('manifesto-sidebar-council')}</div></div></div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-700/50">
                <p className="text-[9px] text-slate-500 font-mono leading-[1.6]"><span className="text-brand-500">*</span><strong className="text-slate-400">Footnote:</strong> {t('manifesto-sidebar-footnote')}</p>
              </div>
            </div>
            <div className="rounded-xl border border-brand-500/20 bg-brand-500/[0.05] backdrop-blur-sm p-6">
              <h4 className="text-sm font-bold font-mono mb-3">{t('manifesto-council-title')}</h4>
              <p className="text-xs text-slate-400 font-mono leading-relaxed mb-4">{t('manifesto-council-desc')}</p>
              <div className="grid grid-cols-2 gap-3">{[1,2,3,4].map(n=>(<div key={n} className="rounded-lg bg-slate-900/50 p-3"><div className="text-[10px] text-brand-400 font-mono mb-1">{t('manifesto-council-role'+n)}</div><div className="text-[9px] text-slate-500">{t('manifesto-council-role'+n+'-desc')}</div></div>))}</div>
              <p className="text-[9px] text-slate-600 font-mono mt-3">{t('manifesto-council-footnote')}</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6">
              <h4 className="text-sm font-bold font-mono mb-4">{t('manifesto-effective-title')}</h4>
              <div className="space-y-4">{[1,2,3].map(n=>(<div key={n} className="flex gap-3"><div className="w-6 h-6 rounded-full bg-brand-500/10 flex items-center justify-center flex-shrink-0"><span className="text-[10px] font-bold text-brand-400">{n}</span></div><div><div className="text-xs font-bold font-mono mb-1">{t('manifesto-effective-'+n)}</div><p className="text-[10px] text-slate-500 leading-relaxed">{t('manifesto-effective-'+n+'-desc')}</p></div></div>))}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SteeringCommitteeSection({t}) {
  return (
    <section id="steering-committee" className="relative py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-500 font-mono">{t('steering-label')}</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-4" dangerouslySetInnerHTML={{__html:t('steering-title')}}></h2>
          <p className="max-w-2xl mx-auto text-sm text-slate-400 font-mono">{t('steering-desc')}</p>
        </div>
        <div className="space-y-8">
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6">
            <h3 className="text-lg font-bold font-mono mb-3">{t('steering-purpose-title')}</h3>
            <p className="text-sm text-slate-400 font-mono leading-relaxed" dangerouslySetInnerHTML={{__html:t('steering-purpose-desc')}}></p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6">
            <h3 className="text-lg font-bold font-mono mb-4">{t('steering-composition-title')}</h3>
            <ul className="space-y-3">{[1,2,3].map(n=>(<li key={n} className="flex items-start gap-3 text-sm text-slate-400 font-mono"><iconify-icon icon="lucide:check" width="16" className="text-brand-400 mt-0.5 flex-shrink-0"></iconify-icon><span dangerouslySetInnerHTML={{__html:t('steering-comp'+n)}}></span></li>))}</ul>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6">
            <h3 className="text-lg font-bold font-mono mb-4">{t('steering-election-title')}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-slate-800"><th className="text-left py-3 px-4 text-[10px] uppercase tracking-wider text-slate-500 font-mono">{t('steering-step')}</th><th className="text-left py-3 px-4 text-[10px] uppercase tracking-wider text-slate-500 font-mono">{t('steering-action')}</th></tr></thead>
                <tbody className="text-slate-400 font-mono">{[1,2,3,4,5].map(n=>(<tr key={n} className="border-b border-slate-800/50 last:border-0"><td className="py-3 px-4 text-brand-400 font-bold">{n}</td><td className="py-3 px-4"><div className="text-white font-bold mb-1">{t('steering-step'+n+'-title')}</div><div className="text-xs">{t('steering-step'+n+'-desc')}</div></td></tr>))}</tbody>
              </table>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6">
              <h3 className="text-lg font-bold font-mono mb-4">{t('steering-term-title')}</h3>
              <ul className="space-y-3">{[1,2].map(n=>(<li key={n} className="flex items-start gap-3 text-sm text-slate-400 font-mono"><iconify-icon icon="lucide:circle-check" width="16" className="text-brand-400 mt-0.5 flex-shrink-0"></iconify-icon><span dangerouslySetInnerHTML={{__html:t('steering-term'+n)}}></span></li>))}</ul>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6">
              <h3 className="text-lg font-bold font-mono mb-4">{t('steering-recall-title')}</h3>
              <ul className="space-y-3">{[1,2].map(n=>(<li key={n} className="flex items-start gap-3 text-sm text-slate-400 font-mono"><iconify-icon icon="lucide:circle-alert" width="16" className="text-red-400 mt-0.5 flex-shrink-0"></iconify-icon><span dangerouslySetInnerHTML={{__html:t('steering-recall'+n)}}></span></li>))}</ul>
            </div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6">
            <h3 className="text-lg font-bold font-mono mb-4">{t('steering-responsibilities-title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{[1,2,3,4].map(n=>(<div key={n} className="rounded-lg bg-slate-950/50 p-4"><div className="text-sm font-bold font-mono mb-2">{t('steering-resp'+n+'-title')}</div><p className="text-xs text-slate-500 font-mono">{t('steering-resp'+n+'-desc')}</p></div>))}</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6">
            <h3 className="text-lg font-bold font-mono mb-4">{t('steering-checklist-title')}</h3>
            <ul className="space-y-2">{[1,2,3,4,5,6,7,8].map(n=>(<li key={n} className="flex items-start gap-3 text-sm text-slate-400 font-mono"><iconify-icon icon="lucide:check-circle-2" width="16" className="text-brand-400 mt-0.5 flex-shrink-0"></iconify-icon><span>{t('steering-check'+n)}</span></li>))}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection({t}) {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-500 font-mono">{t('howto-label')}</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-4" dangerouslySetInnerHTML={{__html:t('howto-title')}}></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[{n:'01',t:'howto-step1-title',d:'howto-step1-desc'},{n:'02',t:'howto-step2-title',d:'howto-step2-desc'},{n:'03',t:'howto-step3-title',d:'howto-step3-desc'},{n:'04',t:'howto-step4-title',d:'howto-step4-desc'}].map((x,i)=>(
            <div key={i} className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6">
              <div className="text-4xl font-bold text-brand-500/20 font-mono mb-3">{x.n}</div>
              <h3 className="text-lg font-bold font-mono mb-2">{t(x.t)}</h3>
              <p className="text-sm text-slate-400 font-mono leading-relaxed">{t(x.d)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SignSection({t,signFormRef,showToast}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const data = {
      full_name: formData.get('full_name'),
      email: formData.get('email'),
      phone_number: formData.get('phone_number'),
      address_block_lot: formData.get('address_block_lot'),
      purok: formData.get('purok'),
      comment: formData.get('comment'),
      manifesto_agreement: formData.get('manifesto_agreement') === 'on',
      privacy_policy_agreement: formData.get('privacy_policy_agreement') === 'on',
    };

    // Save to Supabase
    const { data: result, error } = await supabase
      .from('manifesto_signatures')
      .insert([data])
      .select()
      .single();

    if (error) {
      showToast('May Error', 'Hindi ma-save ang pirma. Subukan ulit.');
      console.error('Supabase error:', error);
    } else {
      // Call Edge Function to send email with PDF
      try {
        await fetch('https://wozhsunyhxvankwvztwc.supabase.co/functions/v1/send-manifesto-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvemhzdW55aHh2YW5rd3Z6dHdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5MzgyODUsImV4cCI6MjA5MDUxNDI4NX0.enanYMDsXkY13-154YkqFRqzo2E7CDTfhuJ1Ci4xNsI',
          },
          body: JSON.stringify({
            record: result,
            type: 'INSERT',
          }),
        });
      } catch (err) {
        console.error('Email function error:', err);
        // Don't show error to user - signing was successful, email is optional
      }
      
      showToast('Nagpirma ka na!', `Ang iyong pirma ay #${result.signature_number}. Check your email for confirmation.`);
      e.target.reset();
    }

    setIsSubmitting(false);
  };

  return (
    <section id="sign" className="relative py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-500 font-mono">{t('sign-label')}</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-4" dangerouslySetInnerHTML={{__html:t('sign-title')}}></h2>
          <p className="max-w-2xl mx-auto text-sm text-slate-400 font-mono">{t('sign-desc')}</p>
        </div>
        <div className="rounded-2xl border border-brand-500/20 bg-slate-900/50 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.5)] p-8">
          <form ref={signFormRef} onSubmit={handleSubmit} className="space-y-4">
            <div><label className="block text-xs text-slate-500 font-mono uppercase tracking-wider mb-2">{t('sign-name-label')}</label><input name="full_name" type="text" placeholder="Juan Dela Cruz" required className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-sm font-mono text-white placeholder:text-slate-600 focus:border-brand-500/50 focus:outline-none focus:ring-1 focus:ring-brand-500/50 transition-colors"/></div>
            <div><label className="block text-xs text-slate-500 font-mono uppercase tracking-wider mb-2">{t('sign-email-label')}</label><input name="email" type="email" placeholder="you@email.com" required className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-sm font-mono text-white placeholder:text-slate-600 focus:border-brand-500/50 focus:outline-none focus:ring-1 focus:ring-brand-500/50 transition-colors"/></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-xs text-slate-500 font-mono uppercase tracking-wider mb-2">{t('sign-address-label')}</label><input name="address_block_lot" type="text" placeholder="Blk 5 Lot 12, Phase 2" required className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-sm font-mono text-white placeholder:text-slate-600 focus:border-brand-500/50 focus:outline-none focus:ring-1 focus:ring-brand-500/50 transition-colors"/></div>
              <div><label className="block text-xs text-slate-500 font-mono uppercase tracking-wider mb-2">{t('sign-phone-label')}</label><input name="phone_number" type="tel" placeholder="+63 9XX XXX XXXX" required className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-sm font-mono text-white placeholder:text-slate-600 focus:border-brand-500/50 focus:outline-none focus:ring-1 focus:ring-brand-500/50 transition-colors"/></div>
            </div>
            <div><label className="block text-xs text-slate-500 font-mono uppercase tracking-wider mb-2">{t('sign-purok-label')}</label>
              <select name="purok" required className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-sm font-mono text-slate-400 focus:border-brand-500/50 focus:outline-none focus:ring-1 focus:ring-brand-500/50 transition-colors appearance-none" style={{backgroundImage:`url('data:image/svg+xml;utf8,<svg fill=\'%2364748b\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'><path fill-rule=\'evenodd\' d=\'M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z\' clip-rule=\'evenodd\'/></svg>')`,backgroundPosition:'right 12px center',backgroundRepeat:'no-repeat',backgroundSize:'16px'}}>
                <option value="" disabled selected>{t('sign-purok-select')}</option><option>SWAB</option><option>MEAB</option><option>CENTRAL</option><option>ABANTE</option><option>KAPITBAHAYAN</option><option>SEAB</option><option>ST. RAYMOND</option><option>{t('sign-purok-na')}</option>
              </select>
            </div>
            <div><label className="block text-xs text-slate-500 font-mono uppercase tracking-wider mb-2">{t('sign-comment-label')}</label><textarea name="comment" rows="3" placeholder="Ano ang dahilan kung bakit ka sumasang-ayon sa Manipesto?" className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-sm font-mono text-white placeholder:text-slate-600 focus:border-brand-500/50 focus:outline-none focus:ring-1 focus:ring-brand-500/50 transition-colors resize-y"></textarea></div>
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <div className="flex items-start gap-2 mb-2"><iconify-icon icon="lucide:shield-check" width="16" className="text-brand-400 mt-0.5 flex-shrink-0"></iconify-icon><h5 className="text-xs font-bold text-slate-300 font-mono">{t('sign-privacy-title')}</h5></div>
              <div className="text-[9px] text-slate-400 font-mono leading-[1.7] space-y-1">
                <p dangerouslySetInnerHTML={{__html:t('sign-privacy-act')}}></p>
                <ul className="list-disc list-inside space-y-1 ml-1"><li>{t('sign-privacy-1')}</li><li>{t('sign-privacy-2')}</li><li>{t('sign-privacy-3')}</li><li>{t('sign-privacy-4')}</li></ul>
                <p className="text-slate-500 italic mt-2">{t('sign-privacy-agree')}</p>
              </div>
            </div>
            <div className="flex items-start gap-3"><input type="checkbox" name="manifesto_agreement" id="agreeManifesto" required className="mt-1 accent-brand-500"/><label htmlFor="agreeManifesto" className="text-xs text-slate-300 font-mono leading-relaxed" dangerouslySetInnerHTML={{__html:t('sign-manifesto-agree')}}></label></div>
            <div className="flex items-start gap-3"><input type="checkbox" name="privacy_policy_agreement" id="agreePrivacy" required className="mt-1 accent-brand-500"/><label htmlFor="agreePrivacy" className="text-xs text-slate-300 font-mono leading-relaxed" dangerouslySetInnerHTML={{__html:t('sign-privacy-agree2')}}></label></div>
            <button type="submit" disabled={isSubmitting} className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-brand-500 text-slate-950 text-xs font-bold uppercase tracking-wide hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">{t('sign-btn')}<iconify-icon icon="lucide:pen-line" width="16"></iconify-icon></button>
            <p className="text-[10px] text-slate-600 font-mono text-center mt-4"><iconify-icon icon="lucide:lock" width="10" className="inline"></iconify-icon> Ang iyong pirma ay naka-encrypt at ligtas na itinatabi. Hindi ipapakita sa publiko nang walang iyong permiso.</p>
          </form>
        </div>
      </div>
    </section>
  );
}

function ChampionsSection({t}) {
  return (
    <section id="champions" className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-500 font-mono">{t('champions-label')}</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-4" dangerouslySetInnerHTML={{__html:t('champions-title')}}></h2>
          <p className="max-w-2xl mx-auto text-sm text-slate-400 font-mono">{t('champions-desc')}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {[{icon:'lucide:swords',t:'champions-card1-title',d:'champions-card1-desc',lis:['champions-card1-li1','champions-card1-li2','champions-card1-li3']},{icon:'lucide:landmark',t:'champions-card2-title',d:'champions-card2-desc',lis:['champions-card2-li1','champions-card2-li2','champions-card2-li3'],featured:true,badge:'champions-badge'},{icon:'lucide:users',t:'champions-card3-title',d:'champions-card3-desc',lis:['champions-card3-li1','champions-card3-li2','champions-card3-li3']}].map((x,i)=>(
            <div key={i} className={`rounded-xl border ${x.featured?'border-brand-500/30 bg-brand-500/[0.05] shadow-[0_0_30px_rgba(34,197,94,0.1)]':'border-slate-800 bg-slate-900/50'} backdrop-blur-sm p-6 relative`}>
              {x.badge && <div className="absolute -top-3 right-6"><span className="px-3 py-1 rounded-full bg-brand-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider">{t(x.badge)}</span></div>}
              <div className="w-12 h-12 rounded-lg bg-brand-500/10 border border-brand-500/30 flex items-center justify-center mb-5"><iconify-icon icon={x.icon} width="24" className="text-brand-400"></iconify-icon></div>
              <h3 className="text-lg font-bold font-mono mb-2">{t(x.t)}</h3>
              <p className="text-xs text-slate-400 font-mono leading-relaxed mb-4">{t(x.d)}</p>
              <ul className="space-y-2">{x.lis.map((l,j)=>(<li key={j} className="flex items-center gap-2 text-xs text-slate-500 font-mono"><iconify-icon icon="lucide:check" width="12" className="text-brand-500"></iconify-icon><span>{t(l)}</span></li>))}</ul>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-brand-500/20 bg-brand-500/[0.05] backdrop-blur-sm p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-brand-500/10 border border-brand-500/30 flex items-center justify-center mx-auto mb-4"><iconify-icon icon="lucide:flame" width="28" className="text-brand-400"></iconify-icon></div>
          <h3 className="text-xl font-bold font-mono mb-2">{t('champions-cta-title')}</h3>
          <p className="text-xs text-slate-400 font-mono leading-relaxed mb-6 max-w-lg mx-auto">{t('champions-cta-desc')}</p>
          <a href="#donate" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-brand-500 text-slate-950 text-xs font-bold uppercase tracking-wide hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all duration-300">{t('champions-cta-btn')}<iconify-icon icon="lucide:heart" width="16"></iconify-icon></a>
        </div>
      </div>
    </section>
  );
}

function DonateSection({t,handleCustomDonation}) {
  return (
    <section id="donate" className="relative py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-500 font-mono">{t('donate-label')}</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-4" dangerouslySetInnerHTML={{__html:t('donate-title')}}></h2>
          <p className="max-w-xl mx-auto text-sm text-slate-400 font-mono">{t('donate-desc')}</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 font-mono text-sm">₱</span><input type="number" id="customAmount" placeholder="Enter amount" min="100" step="100" className="w-full pl-8 py-4 rounded-lg bg-slate-950 border border-slate-800 text-base font-mono text-white placeholder:text-slate-600 focus:border-brand-500/50 focus:outline-none focus:ring-1 focus:ring-brand-500/50 transition-colors"/></div>
            <button type="button" onClick={handleCustomDonation} className="px-10 py-4 rounded-lg bg-brand-500 text-slate-950 text-sm font-bold uppercase tracking-wide hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all duration-300 whitespace-nowrap flex items-center justify-center gap-2">{t('donate-btn')}<iconify-icon icon="lucide:heart" width="18"></iconify-icon></button>
          </div>
          <p className="text-[10px] text-slate-600 font-mono text-center mt-4"><iconify-icon icon="lucide:shield-check" width="10" className="inline"></iconify-icon> {t('donate-receipt')}</p>
        </div>
      </div>
    </section>
  );
}

function JoinSection({t,newsletterFormRef,showToast}) {
  return (
    <section id="join" className="relative py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-500 font-mono">{t('join-label')}</span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-4" dangerouslySetInnerHTML={{__html:t('join-title')}}></h2>
        <p className="max-w-xl mx-auto text-sm text-slate-400 font-mono mb-10">{t('join-desc')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[{icon:'lucide:pen-line',t:'join-card1-title',d:'join-card1-desc'},{icon:'lucide:briefcase',t:'join-card2-title',d:'join-card2-desc'},{icon:'lucide:heart-handshake',t:'join-card3-title',d:'join-card3-desc'}].map((x,i)=>(
            <div key={i} className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 hover:border-brand-500/30 transition-all duration-300"><iconify-icon icon={x.icon} width="28" className="text-brand-400 mb-3"></iconify-icon><h4 className="text-sm font-bold font-mono mb-2">{t(x.t)}</h4><p className="text-xs text-slate-500 font-mono">{t(x.d)}</p></div>
          ))}
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-8">
          <h3 className="text-lg font-bold font-mono mb-2">{t('join-newsletter-title')}</h3>
          <p className="text-xs text-slate-500 font-mono mb-6">{t('join-newsletter-desc')}</p>
          <form ref={newsletterFormRef} onSubmit={(e)=>{e.preventDefault();showToast('Na-subscribe na!','Maligayang pagdating sa eAbante. Tingnan ang iyong inbox.');e.target.reset();}} className="flex flex-col sm:flex-row gap-3">
            <input type="email" placeholder="your@email.com" required className="flex-1 px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-sm font-mono text-white placeholder:text-slate-600 focus:border-brand-500/50 focus:outline-none focus:ring-1 focus:ring-brand-500/50 transition-colors"/>
            <button type="submit" className="px-8 py-3 rounded-lg bg-brand-500 text-slate-950 text-xs font-bold uppercase tracking-wide hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all duration-300 whitespace-nowrap">{t('join-newsletter-btn')}</button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer({t}) {
  return (
    <footer className="relative border-t border-slate-800 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4"><div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center"><iconify-icon icon="lucide:shield-check" width="16" className="text-slate-950"></iconify-icon></div><span className="text-lg font-bold tracking-tight">e<span className="text-gradient">Abante</span></span></div>
            <p className="text-xs text-slate-500 font-mono leading-relaxed">{t('footer-desc')}</p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">{t('footer-movement')}</h4>
            <ul className="space-y-2"><li><a href="#about" className="text-xs text-slate-500 font-mono hover:text-brand-400 transition-colors">{t('footer-about')}</a></li><li><a href="#problems" className="text-xs text-slate-500 font-mono hover:text-brand-400 transition-colors">{t('footer-problems')}</a></li></ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">{t('footer-programs')}</h4>
            <ul className="space-y-2"><li><a href="#programs" className="text-xs text-slate-500 font-mono hover:text-brand-400 transition-colors">{t('footer-gov-academy')}</a></li><li><a href="#programs" className="text-xs text-slate-500 font-mono hover:text-brand-400 transition-colors">{t('footer-transparency')}</a></li><li><a href="#programs" className="text-xs text-slate-500 font-mono hover:text-brand-400 transition-colors">{t('footer-legal')}</a></li><li><a href="#programs" className="text-xs text-slate-500 font-mono hover:text-brand-400 transition-colors">{t('footer-platform')}</a></li></ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">{t('footer-resources')}</h4>
            <ul className="space-y-2"><li><a href="#manifesto" className="text-xs text-slate-500 font-mono hover:text-brand-400 transition-colors">{t('footer-manifesto')}</a></li><li><a href="#steering-committee" className="text-xs text-slate-500 font-mono hover:text-brand-400 transition-colors">{t('footer-election-guide')}</a></li><li><a href="#sign" className="text-xs text-slate-500 font-mono hover:text-brand-400 transition-colors">{t('footer-sign')}</a></li><li><a href="#champions" className="text-xs text-slate-500 font-mono hover:text-brand-400 transition-colors">{t('footer-champions')}</a></li></ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-slate-600 font-mono">{t('footer-copyright')}</p>
          <div className="flex items-center gap-4"><a href="#" className="text-slate-600 hover:text-brand-400 transition-colors"><iconify-icon icon="lucide:facebook" width="18"></iconify-icon></a><a href="#" className="text-slate-600 hover:text-brand-400 transition-colors"><iconify-icon icon="lucide:twitter" width="18"></iconify-icon></a><a href="#" className="text-slate-600 hover:text-brand-400 transition-colors"><iconify-icon icon="lucide:linkedin" width="18"></iconify-icon></a><a href="#" className="text-slate-600 hover:text-brand-400 transition-colors"><iconify-icon icon="lucide:mail" width="18"></iconify-icon></a></div>
        </div>
      </div>
    </footer>
  );
}
