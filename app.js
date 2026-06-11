/* ==========================================================================
   THE OBJECT CANVAS — CORE ENGINE (app.js)
   Vanilla JS, ES6+, Responsive Pan & Zoom, Search & Filter, Memory Storage
   ========================================================================== */

// --- INITIAL CRISIS ARCHIVE DATA MODEL ---
const INITIAL_OBJECTS = [
  {
    id: "rice",
    title: "Rice Bag",
    memoriesCount: 0,
    x: 900,
    y: 450,
    category: "food",
    about: `<p>During the peak of the 2022 economic crisis, Sri Lanka faced food inflation exceeding 90%. Chemical fertilizer bans collapsed crop yields, making staple grains scarce and incredibly expensive.</p>
            <blockquote>"Rice became a precious commodity. Every meal was budgeted down to the gram, and for the first time in our lives, we had to worry if we would have enough to eat tomorrow."</blockquote>
            <p>Families moved away from premium varieties to whatever broken grain was affordable, cooking simple meals to make stocks last.</p>`,
    stats: [
      { label: "Food Inflation Peak", value: "94.9%", desc: "Recorded in September 2022, making basic food items unaffordable for millions." },
      { label: "Domestic Harvest Drop", value: "-37%", desc: "Reduction in domestic rice production during the 2021/2022 Maha season due to sudden fertilizer bans." }
    ],
    svg: "assets/Rice bag.png",
    memories: []
  },
  {
    id: "broken-phone",
    title: "Smart Phone",
    memoriesCount: 0,
    x: 1200,
    y: 400,
    category: "utility",
    about: `<p>During the active months of the protest campaigns and nationwide blackouts, smartphones were absolute lifelines. They were used to coordinate protests, share news of fuel shipments, and verify information during social media bans.</p>
            <blockquote>"My screen shattered when the police charged the crowd at Galle Face. I couldn't afford to fix it, so I tapped through the cracks for the rest of the year to check power cut rosters."</blockquote>
            <p>High import tariffs and currency collapse made electronic parts and phone repairs practically unaffordable, meaning cracked and damaged screens were seen everywhere.</p>`,
    stats: [
      { label: "Rupee Depreciation", value: "80%+", desc: "The Sri Lankan Rupee collapsed in early 2022, causing electronic import costs to skyrocket." },
      { label: "Social Media Bans", value: "16h", desc: "A military-enforced blanket ban on WhatsApp, Facebook, and Twitter on April 3, 2022." }
    ],
    svg: "assets/Smart phone.png",
    memories: []
  },
  {
    id: "painkillers",
    title: "Medicine Bottle",
    memoriesCount: 0,
    x: 1500,
    y: 420,
    category: "medical",
    about: `<p>Sri Lanka's healthcare system collapsed as foreign reserves depleted, leading to a catastrophic shortage of imported essential pharmaceuticals. Painkillers, saline, surgical equipment, and specialized cancer medications were virtually unobtainable.</p>
            <blockquote>"My father had a chronic back issue. We spent four days walking to eight different pharmacies in Colombo just to find one strip of Paracetamol."</blockquote>
            <p>State hospital doctors had to reuse basic items and beg international donors for supplies, warn of complete system failures, and rely on citizens purchasing medicine from black markets.</p>`,
    stats: [
      { label: "Medicine Shortages", value: "80%+", desc: "Nearly four out of five basic imported medicines were out of stock in state clinics by mid-2022." },
      { label: "Import Costs Surge", value: "3x", desc: "Prices of basic over-the-counter painkillers increased threefold due to currency devaluations." }
    ],
    svg: "assets/Medicine bottle.png",
    memories: []
  },
  {
    id: "kerosene-lamp",
    title: "Kerosene Lamp",
    memoriesCount: 0,
    x: 1800,
    y: 400,
    category: "fuel",
    about: `<p>As power grid failures triggered rolling 13-hour blackouts across the island and cooking gas cylinders vanished, ancient kerosene-wick lamps were dusted off from cellars and attics.</p>
            <blockquote>"The smell of kerosene is the smell of my 2022. It meant hot tea on a small camping stove and studying under a dim flickering green lantern."</blockquote>
            <p>However, kerosene itself quickly became scarce, forcing elderly citizens and children to stand in separate, slow-moving kerosene queues for entire days with yellow canisters.</p>`,
    stats: [
      { label: "Kerosene Price Increase", value: "280%+", desc: "Subsidies were cut, making fuel expensive even if families waited in queue to buy it." },
      { label: "Longest Power Blackout", value: "13 hours", desc: "Enforced on March 31, 2022, due to hydro-reservoir levels depleting and zero thermal fuel." }
    ],
    svg: "assets/Kerosene lamp.png",
    memories: []
  },
  {
    id: "power-cut-candle",
    title: "Candle",
    memoriesCount: 0,
    x: 2100,
    y: 430,
    category: "utility",
    about: `<p>Wax candles became basic household items in every Sri Lankan room. During the grueling daily power cuts, family circles, candlelit dinners, and kid study sessions occurred around their gentle, flickering glow.</p>
            <blockquote>"We spent evenings playing shadow puppets on the living room wall. It was the only way to keep the toddlers calm in the stifling 32-degree heat without fans."</blockquote>
            <p>Due to massive demand, candle prices surged, and supermarkets completely ran out, leading to local vendors hand-pouring crude paraffin blocks to sell in neighborhoods.</p>`,
    stats: [
      { label: "Peak Blackout Duration", value: "13 hrs/day", desc: "Implemented at the end of March 2022 as hydro reservoirs went dry." },
      { label: "Candle Price Hike", value: "350%", desc: "A simple pack of candles rose from 80 LKR to over 350 LKR within a few months." }
    ],
    svg: "assets/Candle.png",
    memories: []
  },
  {
    id: "petrol",
    title: "Fuel Can",
    memoriesCount: 0,
    x: 650,
    y: 750,
    category: "fuel",
    about: `<p>The 20-litre plastic jerrycan is perhaps the most iconic physical symbol of the crisis. Fuel queues stretched for several kilometers outside stations, with citizens waiting for up to six days in their vehicles.</p>
            <blockquote>"People died in those queues. We set up shifts—my brother stood in line during the day, I took over at night. The green petrol can was our ticket to work."</blockquote>
            <p>Because fuel was strictly rationed via QR codes later on, stockpiling petrol in these containers became an underground currency used to power generators and medical transport.</p>`,
    stats: [
      { label: "Queue Waiting Times", value: "48 - 120 hrs", desc: "Average wait times at CPC fuel pumps during the peak crisis months of June-July 2022." },
      { label: "Deaths in Queues", value: "16+", desc: "Tragic number of citizens who collapsed and died from heat exhaustion and heart attacks while waiting." }
    ],
    svg: "assets/Fuel can.png",
    memories: []
  },
  {
    id: "cooking-gas",
    title: "Gas Cylinder",
    memoriesCount: 0,
    x: 1050,
    y: 800,
    category: "fuel",
    about: `<p>Liquefied Petroleum Gas (LPG) cylinders, primarily Litro Gas (blue) and Laugfs Gas (yellow), vanished overnight. Households were paralyzed as stoves went cold, driving a mass return to charcoal and firewood cooking.</p>
            <blockquote>"People brought their cylinders and lined up at dealer shops. These lines didn't move for weeks. We wrote numbers in chalk on the gas cylinders to keep our spots."</blockquote>
            <p>A tragic wave of household kitchen explosions occurred due to changes in propane-butane gas mixtures in late 2021, heightening anxiety during the shortages.</p>`,
    stats: [
      { label: "LPG Price Increase", value: "300%+", desc: "The price of a standard 12.5kg cylinder shot up from 1,500 LKR to over 4,900 LKR." },
      { label: "Queue Lengths", value: "3 - 5 km", desc: "Long gas queues snaked through neighborhood intersections for months." }
    ],
    svg: "assets/Gas cylinder.png",
    memories: []
  },
  {
    id: "gotagohome",
    title: "Placard",
    memoriesCount: 0,
    x: 1500,
    y: 950,
    category: "protest",
    about: `<p>The unifying rallying cry of the historic, organic "Aragalaya" (The Struggle) protest movement in Sri Lanka. It demanded the resignation of President Gotabaya Rajapaksa and a systemic change in national governance.</p>
            <blockquote>"This hashtag was painted on cardboard, printed on banners, shouted in massive street marches, and projected onto the Presidential Secretariat walls. It belonged to no political party; it belonged to all of us."</blockquote>
            <p>Galle Face Green in Colombo transformed into a massive permanent protest camp named 'GotaGoGama' (Gota Go Village), complete with free kitchens, a library, medical tents, and street theater.</p>`,
    stats: [
      { label: "GotaGoGama Occupancy", value: "123 days", desc: "The permanent citizen occupation at Galle Face lasted from April 9 until police clearances in August 2022." },
      { label: "Historical Outcome", value: "Resignation", desc: "The movement culminated on July 9, 2022, when millions stormed the residence, forcing the President to flee and resign." }
    ],
    svg: "assets/Placard.png",
    memories: []
  },
  {
    id: "plastic-chair",
    title: "Plastic Chair",
    memoriesCount: 0,
    x: 1850,
    y: 820,
    category: "utility",
    about: `<p>The ubiquitous white plastic monobloc chair, usually reserved for garden parties and local meetings, became an essential tool of endurance during the economic crisis.</p>
            <blockquote>"My grandfather sat on this plastic chair at the edge of our street, holding our spot in the kerosene queue for eight hours a day. It became a throne of resilience."</blockquote>
            <p>Citizens queuing for fuel, passports, or cash brought these lightweight chairs to survive the blistering tropical sun during the days of waiting.</p>`,
    stats: [
      { label: "Queue Standing Time", value: "8 - 14 hrs", desc: "Average daily queue time spent by citizens waiting for basic services." },
      { label: "Passport Queues", value: "24h waiting", desc: "Passports applications surged, causing crowds to camp overnight outside the immigration office on plastic chairs." }
    ],
    svg: "assets/Plastic Chair.png",
    memories: []
  },
  {
    id: "umbrella",
    title: "Umbrella",
    memoriesCount: 0,
    x: 2200,
    y: 850,
    category: "utility",
    about: `<p>A colorful multi-colored umbrella became a shield against the elements—the brutal midday tropical sun and sudden torrential monsoon downpours during long, exposed queues.</p>
            <blockquote>"My rainbow umbrella was my only shelter. It saved me from sunstroke during the 6-hour pharmacy line, and then kept me dry in the night."</blockquote>
            <p>During the GotaGoGama protests at Galle Face, thousands of umbrellas created a majestic sea of colors against police water cannons and rainy weather.</p>`,
    stats: [
      { label: "Daily Sunshine Peak", value: "33 °C", desc: "Intense tropical heat index recorded during March-May queue lines." },
      { label: "Monsoon Rainfall", value: "Heavy", desc: "Sudden tropical rainstorms frequently drenched exposed citizens waiting in open streets." }
    ],
    svg: "assets/Umbrella.png",
    memories: []
  },
  {
    id: "torch",
    title: "Torch",
    memoriesCount: 0,
    x: 700,
    y: 1150,
    category: "utility",
    about: `<p>The hand-held flashlight or LED torch, usually yellow or orange plastic, became a required night companion. During blackouts, navigating unlit stairs and dark streets required a torch.</p>
            <blockquote>"The government switched off the streetlights to save power. Walking home in Colombo was walking in pitch blackness. My yellow torch saved me from countless open drains."</blockquote>
            <p>Rechargeable torches were prized but difficult to power, leading to a massive rush on double-A (AA) and triple-A (AAA) batteries, which also became scarce.</p>`,
    stats: [
      { label: "Streetlights Shutdown", value: "100%", desc: "Local councils turned off municipal streetlighting during national blackouts to save fuel." },
      { label: "Battery Price Spike", value: "2.5x", desc: "Shortages in dry-cell batteries caused prices of local brands to more than double." }
    ],
    svg: "assets/Torch.png",
    memories: []
  },
  {
    id: "extension-board",
    title: "Extension Cord",
    memoriesCount: 0,
    x: 1080,
    y: 1200,
    category: "utility",
    about: `<p>During the brief hours of electricity supply, a mad rush erupted in households to charge all electronic devices. Extension boards became high-demand hubs where family members plugged in laptops, power banks, and torches simultaneously.</p>
            <blockquote>"As soon as the grid hummed back to life, we rushed. Plugs were precious. My extension board was stacked with cords like a medical life support machine."</blockquote>
            <p>Voltage fluctuations damaged home appliances, leading to high consumer demand for surge protectors and multi-plug adaptors.</p>`,
    stats: [
      { label: "Charge-Window Duration", value: "3 - 5 hrs", desc: "Short intervals when electricity was restored between scheduled blackouts." },
      { label: "Appliance Failures", value: "High", desc: "Voltage drops and sudden grid surges destroyed domestic electronics." }
    ],
    svg: "assets/Extension cord.png",
    memories: []
  },
  {
    id: "prescription",
    title: "Prescription",
    memoriesCount: 0,
    x: 1450,
    y: 1220,
    category: "medical",
    about: `<p>A doctor's prescription slip, historically a simple sheet for dispensing care, became a desperate scavenger hunt document. Chemist shops faced severe inventory drops, leading to scribbled notes and alternatives.</p>
            <blockquote>"My mother's insulin was unavailable anywhere. Pharmacists would take the prescription, shake their heads, and write down random phone numbers of black market sellers."</blockquote>
            <p>Families shared lists of medications on social media, begging anyone flying into Sri Lanka from India or the UK to bring matching drugs in their luggage.</p>`,
    stats: [
      { label: "Import Medicine Decline", value: "-85%", desc: "Decline in physical pharmaceutical imports during mid-2022 due to lack of letters of credit." },
      { label: "Active Drug Substitution", value: "Frequent", desc: "Chemists substituted generic local compound formulas due to branded stock depletion." }
    ],
    svg: "assets/Doctor's Prescription.png",
    memories: []
  },
  {
    id: "saline-drip",
    title: "IV bag",
    memoriesCount: 0,
    x: 1850,
    y: 1210,
    category: "medical",
    about: `<p>A chilling reality of the healthcare shutdown was the depletion of basic intravenous (IV) saline fluid bags in government hospitals. Doctors warned of complete ward closures as supplies drained.</p>
            <blockquote>"My sister went into labor during the power cut. The hospital asked us to buy our own saline bag, sterile gloves, and syringes from outside. They didn't have anything."</blockquote>
            <p>Private citizens and charity bodies formed volunteer groups to buy medical equipment abroad, donating bulk saline pallets directly to pediatric and cancer hospitals.</p>`,
    stats: [
      { label: "Medical Equipment Deficit", value: "70%", desc: "Shortfalls in basic surgical tools, IV fluids, and anesthetics in state medical warehouses." },
      { label: "Public Donations", value: "Millions", desc: "Citizen networks financed direct imports of essential clinical goods." }
    ],
    svg: "assets/IV bag.png",
    memories: []
  },
  {
    id: "milk-powder",
    title: "Milk Powder Tin",
    memoriesCount: 0,
    x: 2200,
    y: 1230,
    category: "food",
    about: `<p>Imported powdered milk (a household staple for Sri Lanka's beloved milk tea) completely disappeared as letters of credit were declined. Long, chaotic milk powder queues formed outside retail shops, usually dissolving in disappointment.</p>
            <blockquote>"Reminds me of waking up at 4 AM to wait for a milk powder truck. The shopkeeper had only 20 packets, and 200 of us were standing. I went home empty-handed."</blockquote>
            <p>Fresh milk was also unavailable and expensive, forcing mothers to feed babies sweetened black tea or diluted rice water instead of milk formula.</p>`,
    stats: [
      { label: "Price Increase Metric", value: "260%+", desc: "The cost of a standard 400g pack of milk powder shot up from 380 LKR to over 1,000 LKR." },
      { label: "Child Malnutrition Rise", value: "30%", desc: "Sharp rise in nutritional deficiencies among toddlers due to lack of dairy foods." }
    ],
    svg: "assets/Milk powder tin.png",
    memories: []
  },
  {
    id: "measuring-cup",
    title: "Rice Measuring Cup",
    memoriesCount: 0,
    x: 650,
    y: 1600,
    category: "food",
    about: `<p>A simple aluminium or plastic measuring cup, traditionally used in Sri Lankan kitchens to measure out raw rice grains, became an instrument of severe portion control.</p>
            <blockquote>"We used to cook five cups of rice. During the worst of 2022, my mother reduced it to three cups. Every grain was scraped clean from the pot."</blockquote>
            <p>Portion sizing shrank, vegetables were rationed, and double-cooking vanished. Meals were cooked once a day to conserve gas and firewood.</p>`,
    stats: [
      { label: "Calorie Intake Drop", value: "-25%", desc: "Average calorie intake decline in urban low-income families due to skyrocketing food prices." },
      { label: "Skipped Meals", value: "37%", desc: "Percentage of households who skipped at least one meal a day to stretch budgets." }
    ],
    svg: "assets/Rice measuring cup.png",
    memories: []
  },
  {
    id: "generator",
    title: "Generator",
    memoriesCount: 0,
    x: 1050,
    y: 1580,
    category: "utility",
    about: `<p>A portable petrol generator, historically an expensive backup machine for commercial factories, became a coveted prize for shops and offices trying to survive the power blackouts.</p>
            <blockquote>"The constant roaring hum of generators in the streets of Colombo was deafening. It was the sound of businesses fighting to keep their doors open."</blockquote>
            <p>But generator owners faced a double crisis: petrol shortages. Generators required constant jerrycans of fuel, turning gas stations into flashpoints of conflict.</p>`,
    stats: [
      { label: "Generator Import Surge", value: "+400%", desc: "Increase in demand for diesel/petrol generators during early 2022 before import bans." },
      { label: "Average Fuel Burn", value: "2.5 L/hr", desc: "Average fuel required to power a small office generator, costing thousands in inflated rupees." }
    ],
    svg: "assets/Generator.png",
    memories: []
  },
  {
    id: "power-bank",
    title: "Power Bank",
    memoriesCount: 0,
    x: 1450,
    y: 1610,
    category: "utility",
    about: `<p>A portable power bank went from a travel luxury to a crucial survival item. As blackouts dragged on for half a day, laptops and smartphones required backup charge reservoirs to continue working.</p>
            <blockquote>"Reminds me of sitting in the dark with my phone connected to a power bank. I turned off my screen between text checks to save every single percent of charge."</blockquote>
            <p>Power banks were charged at offices, cafes with generators, or during short power restoration hours, keeping freelancers and IT workers connected to remote jobs.</p>`,
    stats: [
      { label: "Freelancer Downtime", value: "-45%", desc: "Average decline in productivity for Sri Lankan IT freelancers during the blackout peak." },
      { label: "Power Bank Demand Hike", value: "3x", desc: "Sudden spike in retail prices for portable backup batteries due to skyrocketing demand." }
    ],
    svg: "assets/Power bank.png",
    memories: []
  },
  {
    id: "big-pot",
    title: "Cooking Pot",
    memoriesCount: 0,
    x: 1850,
    y: 1600,
    category: "food",
    about: `<p>A massive aluminium cooking pot, traditionally brought out for weddings and family gatherings, became a vital community asset. Neighborhoods pooled food stocks to cook massive hot meals for vulnerable families.</p>
            <blockquote>"We formed a community kitchen on our street. Everyone brought whatever vegetables or dhal they had, and we cooked a massive pot of rice to feed 80 people every Sunday."</blockquote>
            <p>These kitchens provided vital community support networks, ensuring no child went hungry during the height of the food crisis.</p>`,
    stats: [
      { label: "Community Kitchens Established", value: "100+", desc: "Formed in Colombo and surrounding suburbs by citizen volunteer networks in 2022." },
      { label: "Staple Dhal Price hike", value: "320%", desc: "Average price increase for red dhal, forcing communities to pool budgets to afford bulk purchases." }
    ],
    svg: "assets/Cooking pot.png",
    memories: []
  },
  {
    id: "power-schedule",
    title: "Power Cut Schedule",
    memoriesCount: 0,
    x: 2250,
    y: 1620,
    category: "utility",
    about: `<p>The daily power cut schedule, published by the Ceylon Electricity Board (CEB) in newspaper columns and PDF documents, was the most widely read document in the country.</p>
            <blockquote>"Our entire day was structured around this table. Group A: 8 AM to 12 PM blackout. Group B: 12 PM to 4 PM. We planned office work, cooking, and laundry schedules according to these letters."</blockquote>
            <p>But schedules were erratic, often changing mid-day due to fuel arrivals, causing massive confusion and disruption in daily lives.</p>`,
    stats: [
      { label: "CEB Roster Updates", value: "Daily", desc: "Published every evening online, dividing the country into lettered grid zones (A to W)." },
      { label: "Longest Blackout Roster", value: "13 hrs", desc: "Maximum scheduled blackout implemented on grid zones in March 2022." }
    ],
    svg: "assets/Power cut schedule.png",
    memories: []
  }
];

// CATEGORIES SVG templates for dynamically added objects
const CATEGORIES_SVGS = {
  fuel: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="25" y="25" width="50" height="60" rx="4" fill="#a0522d" stroke="#5a2e19" stroke-width="2"/>
    <rect x="35" y="15" width="30" height="10" fill="#cc3333" stroke="#222" stroke-width="1.2"/>
    <path d="M 45 40 L 45 70 M 35 55 L 65 55" stroke="#222" stroke-width="3"/>
  </svg>`,
  food: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 30 25 Q 50 15, 70 25 L 65 80 Q 50 85, 35 80 Z" fill="#deb887" stroke="#8b4513" stroke-width="2"/>
    <circle cx="50" cy="50" r="12" fill="#fff" stroke="#8b4513" stroke-width="1"/>
    <path d="M 46 50 H 54 M 50 46 V 54" stroke="#8b4513" stroke-width="1.5"/>
  </svg>`,
  medical: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="30" y="25" width="40" height="55" rx="5" fill="#e0f2f1" stroke="#00796b" stroke-width="2"/>
    <rect x="42" y="15" width="16" height="10" fill="#fff" stroke="#00796b" stroke-width="1.5"/>
    <path d="M 40 50 H 60 M 50 40 V 60" stroke="#d32f2f" stroke-width="4.5"/>
  </svg>`,
  utility: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="32" y="20" width="36" height="60" rx="3" fill="#cfd8dc" stroke="#37474f" stroke-width="2"/>
    <rect x="37" y="25" width="26" height="42" fill="#fff"/>
    <circle cx="50" cy="73" r="3" fill="#37474f"/>
  </svg>`,
  protest: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="25" width="70" height="40" fill="#ffeb3b" stroke="#f57f17" stroke-width="2"/>
    <line x1="50" y1="65" x2="50" y2="92" stroke="#5d4037" stroke-width="4"/>
    <text x="50" y="49" font-family="sans-serif" font-weight="bold" font-size="10" fill="#000" text-anchor="middle">UNITY</text>
  </svg>`
};

// Official asset file mappings to support flexible search inputs
const ASSET_MAPPINGS = [
  { id: "rice", keywords: ["rice", "rice bag", "broken rice", "staple grain", "grains"] },
  { id: "broken-phone", keywords: ["smart phone", "phone", "broken phone", "smartphone", "mobile", "cellphone"] },
  { id: "painkillers", keywords: ["medicine bottle", "painkillers", "medicine", "bottle", "panadol", "paracetamol", "tablets", "pills"] },
  { id: "kerosene-lamp", keywords: ["kerosene lamp", "lamp", "kerosene wick", "wick lamp", "lantern"] },
  { id: "power-cut-candle", keywords: ["candle", "power cut candle", "wax candle", "paraffin"] },
  { id: "petrol", keywords: ["fuel can", "petrol", "kerosene can", "can", "gasoline", "diesel", "jerrycan", "jerry can"] },
  { id: "cooking-gas", keywords: ["gas cylinder", "cooking gas", "gas", "cylinder", "lpg", "litro", "laugfs"] },
  { id: "gotagohome", keywords: ["placard", "gotagohome sign", "gotagohome", "aragalaya sign", "sign", "protest sign", "hashtag", "protest placard"] },
  { id: "plastic-chair", keywords: ["plastic chair", "chair", "white plastic chair", "monobloc"] },
  { id: "umbrella", keywords: ["umbrella", "rainbow umbrella", "parasol"] },
  { id: "torch", keywords: ["torch", "flashlight", "led torch"] },
  { id: "extension-board", keywords: ["extension cord", "extension board", "extension", "multiplug", "surge protector"] },
  { id: "prescription", keywords: ["doctor's prescription", "prescription", "medical prescription", "chemist slip", "doctors prescription"] },
  { id: "saline-drip", keywords: ["iv bag", "saline drip", "saline bag", "iv", "saline"] },
  { id: "milk-powder", keywords: ["milk powder tin", "milk powder", "milk tin", "powdered milk", "tin of milk"] },
  { id: "measuring-cup", keywords: ["rice measuring cup", "measuring cup", "cup", "rice cup"] },
  { id: "generator", keywords: ["generator", "petrol generator", "diesel generator", "power generator"] },
  { id: "power-bank", keywords: ["power bank", "portable charger", "battery bank", "portable power"] },
  { id: "big-pot", keywords: ["cooking pot", "big cooking pot", "big pot", "pot", "community pot"] },
  { id: "power-schedule", keywords: ["power cut schedule", "schedule", "timetable", "roster", "ceb schedule", "ceb roster", "power cut roster"] }
];


// --- APP ENGINE & STATE CONTROLLER ---
class AppEngine {
  constructor() {
    this.objects = JSON.parse(localStorage.getItem('object_canvas_data_v4')) || INITIAL_OBJECTS;
    this.activeObjectId = null;
    this.activeTab = 'memories';
    
    // Canvas Pan/Zoom variables
    this.panX = 0;
    this.panY = 0;
    this.zoomScale = 1.0;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.startPanX = 0;
    this.startPanY = 0;

    // Memories Pan/Zoom variables
    this.memPanX = 0;
    this.memPanY = 0;
    this.memZoomScale = 1.0;
    this.isMemDragging = false;
    this.memStartX = 0;
    this.memStartY = 0;
    this.memStartPanX = 0;
    this.memStartPanY = 0;
    this.memContentWidth = 0;
    this.memContentHeight = 0;

    // Cache DOM Elements
    this.initDOMElements();
    
    // Smart LocalStorage Migration: Ensure initial objects use the new PNG asset paths and names, while preserving user memories.
    let migrated = false;
    this.objects.forEach(obj => {
      const initial = INITIAL_OBJECTS.find(io => io.id === obj.id);
      if (initial) {
        if (obj.svg !== initial.svg) {
          obj.svg = initial.svg;
          migrated = true;
        }
        if (obj.title !== initial.title) {
          obj.title = initial.title;
          migrated = true;
        }
      }
    });
    if (migrated) {
      this.saveState();
    }
    
    // Initialize operations
    this.initCanvasCenter();
    this.renderCanvasObjects();
    this.renderRandomSpeckles();
    this.bindEvents();
    this.updateStatsCounters();
    
    // Intro sequence
    this.initIntroFlow();
    
    // Auth & Dashboard
    this.initAuthFlow();
    this.initDashboard();
  }

  initDOMElements() {
    this.viewport = document.getElementById('canvas-viewport');
    this.canvasSurface = document.getElementById('canvas-surface');
    this.objectsLayer = document.getElementById('canvas-objects-layer');
    this.dotsLayer = document.getElementById('canvas-dots-layer');
    
    // Intro Overlay Elements
    this.introOverlay = document.getElementById('intro-overlay');
    this.introStep1 = document.getElementById('intro-step-1');
    this.introStep2 = document.getElementById('intro-step-2');
    this.introEnterBtn = document.getElementById('intro-enter-btn');
    this.introStartBtn = document.getElementById('intro-start-btn');
    this.introObjectDemoContainer = document.getElementById('intro-object-demo-container');
    
    // Header & Search
    this.searchInput = document.getElementById('search-input');
    this.clearSearchBtn = document.getElementById('clear-search-btn');
    
    // Auth & Dashboard
    this.authModal = document.getElementById('auth-modal');
    this.authViewOptions = document.getElementById('auth-view-options');
    this.authViewForm = document.getElementById('auth-view-form');
    this.authViewLoading = document.getElementById('auth-view-loading');
    this.authViewSuccess = document.getElementById('auth-view-success');
    this.headerAuthBtn = document.getElementById('header-auth-btn');
    this.dashboardModal = document.getElementById('dashboard-modal');
    
    // State
    this.currentUser = null;
    this.isAnonymous = false;
    this.pendingAuthAction = null;
    
    // Sidebar Drawer
    this.sideDrawer = document.getElementById('side-drawer');
    this.drawerResizer = document.getElementById('drawer-resizer');
    this.drawerCloseBtn = document.getElementById('drawer-close-btn');
    this.drawerBackdrop = document.getElementById('drawer-backdrop');
    this.drawerIllustration = document.getElementById('drawer-object-illustration-container');
    this.drawerTitle = document.getElementById('drawer-object-title');
    this.drawerMemoriesCount = document.getElementById('drawer-object-memories-count');
    this.tabButtons = document.querySelectorAll('.tab-btn');
    this.tabContents = document.querySelectorAll('.tab-content');
    this.memoriesViewport = document.getElementById('tab-content-memories');
    this.memoriesFeed = document.getElementById('memories-feed');
    
    // Stats counter
    this.statObjects = document.getElementById('stat-objects-count');
    this.statMemories = document.getElementById('stat-memories-count');
    
    // Modals
    this.modalBackdrop = document.getElementById('modal-backdrop');
    this.addObjectModal = document.getElementById('add-object-modal');
    // this.addMemoryModal = document.getElementById('add-memory-modal');
    this.addObjectError = document.getElementById('add-object-error');
    this.memoryPromptCard = document.getElementById('memory-prompt-card');
    this.memoryPromptCloseBtn = document.getElementById('memory-prompt-close-btn');
    this.addMemoryInlineForm = document.getElementById('add-memory-inline-form');
    this.skipMemoryBtn = document.getElementById('skip-memory-btn');
    this.floatingCalloutCard = document.getElementById('floating-callout-card');
    
    // Edit Modal
    this.editModal = document.getElementById('edit-modal');
    this.editForm = document.getElementById('edit-form');
    this.editTitleInput = document.getElementById('edit-title-input');
    this.editTextInputValue = document.getElementById('edit-text-input');
    this.editTitleGroup = document.getElementById('edit-title-group');
    this.editTextGroup = document.getElementById('edit-text-group');
    this.editModalTitle = document.getElementById('edit-modal-title');
    this.editWithdrawBtn = document.getElementById('edit-withdraw-btn');
    this.editCloseBtn = document.getElementById('edit-close-btn');
    
    // Edit Modal Image Preview
    this.editImageContainer = document.getElementById('edit-image-container');
    this.editImagePreview = document.getElementById('edit-image-preview');
    
    // Change Image Modal
    this.changeImageModal = document.getElementById('change-image-modal');
    this.changeImageCloseBtn = document.getElementById('change-image-close-btn');
    this.changeImageForm = document.getElementById('change-image-form');
    this.newImageNameInput = document.getElementById('new-image-name');
    this.changeImageLoading = document.getElementById('change-image-loading');
    
    this.editingItem = null; // { type: 'object'|'memory', id: string, objId?: string }
    
    // Triggers & Forms
    this.addObjectTrigger = document.getElementById('add-object-trigger-btn');
    this.addObjectForm = document.getElementById('add-object-form');
    this.addMemoryTrigger = document.getElementById('add-memory-trigger-btn');
    this.addMemoryForm = document.getElementById('add-memory-form');
    this.memoryTargetName = document.getElementById('memory-target-object-name');
    
    // Track the newly placed object id for step 2
    this.pendingNewObjectId = null;
    
    // Floating Zoom Controls
    this.zoomInBtn = document.getElementById('zoom-in-btn');
    this.zoomOutBtn = document.getElementById('zoom-out-btn');
    this.zoomResetBtn = document.getElementById('zoom-reset-btn');
  }

  // --- INTRO OVERLAY ---
  initIntroFlow() {
    this.introStep0 = document.getElementById('intro-step-0');
    
    if (!this.introOverlay) return;
    
    // Bind Language Buttons (Step 0)
    const langEnBtn = document.getElementById('lang-en-btn');
    const langSiBtn = document.getElementById('lang-si-btn');
    const langTaBtn = document.getElementById('lang-ta-btn');
    const langWarning = document.getElementById('lang-warning');
    
    if (langEnBtn) {
      langEnBtn.addEventListener('click', () => {
        this.introStep0.classList.remove('intro-visible');
        this.introStep0.classList.add('intro-hidden');
        
        this.introStep1.classList.remove('intro-hidden');
        this.introStep1.classList.add('intro-visible');
      });
    }
    
    const showWarning = () => {
      if (langWarning) langWarning.style.opacity = '1';
    };
    if (langSiBtn) langSiBtn.addEventListener('click', showWarning);
    if (langTaBtn) langTaBtn.addEventListener('click', showWarning);
    
    // Bind Enter Button (Step 1 -> Step 2)
    if (this.introEnterBtn) {
      this.introEnterBtn.addEventListener('click', () => {
        this.introStep1.classList.remove('intro-visible');
        this.introStep1.classList.add('intro-hidden');
          // Show Step 2
        this.introStep2.classList.remove('intro-hidden');
        this.introStep2.classList.add('intro-visible');
        
        // Render a random object
        this.renderIntroDemoObject();
      });
    }

    // Bind drag-to-start on Step 2
    if (this.introOverlay) {
      this.introOverlay.addEventListener('mousedown', (e) => {
        if (!this.introStep2.classList.contains('intro-visible')) return;
        if (e.button !== 0) return; // Left click only

        this.introOverlay.classList.remove('intro-active');
        this.introOverlay.classList.add('intro-dismissed');
        setTimeout(() => {
          this.introOverlay.style.display = 'none';
        }, 800);
        
        this.isDragging = true;
        this.canvasSurface.classList.add('grabbing');
        
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.startPanX = this.panX;
        this.startPanY = this.panY;
      });

      this.introOverlay.addEventListener('touchstart', (e) => {
        if (!this.introStep2.classList.contains('intro-visible')) return;
        
        this.introOverlay.classList.remove('intro-active');
        this.introOverlay.classList.add('intro-dismissed');
        setTimeout(() => {
          this.introOverlay.style.display = 'none';
        }, 800);
        
        if (e.touches.length === 1) {
          this.isDragging = true;
          this.startX = e.touches[0].clientX;
          this.startY = e.touches[0].clientY;
          this.startPanX = this.panX;
          this.startPanY = this.panY;
        }
      });
    }
  }

  // --- AUTH LOGIC ---
  initAuthFlow() {
    if (!this.authModal) return;
    
    const closeBtn = document.getElementById('auth-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => {
      this.closeModal(this.authModal);
      this.pendingAuthAction = null;
    });
    
    // Options
    const googleBtn = document.getElementById('auth-google-btn');
    const emailBtn = document.getElementById('auth-email-btn');
    const switchLink = document.getElementById('auth-switch-link');
    const optSignupLink = document.getElementById('auth-opt-signup-link');
    
    if (googleBtn) {
      googleBtn.addEventListener('click', () => {
        // Show loading state
        this.authViewOptions.classList.remove('active');
        this.authViewOptions.classList.add('hidden');
        if (this.authViewLoading) {
          this.authViewLoading.classList.remove('hidden');
          this.authViewLoading.classList.add('active');
        }
        
        setTimeout(() => {
          // Fake Google Auth
          const randomNames = ["Amal", "Kamal", "Nimal", "Sunil", "Ruwan", "Piyal", "Malani", "Samanthi", "Darshana", "Nuwan"];
          const selectedName = randomNames[Math.floor(Math.random() * randomNames.length)];
          
          this.currentUser = selectedName;
          this.isAnonymous = false;
          
          if (this.authViewLoading) {
            this.authViewLoading.classList.remove('active');
            this.authViewLoading.classList.add('hidden');
          }
          
          const successMsg = document.getElementById('auth-success-msg');
          if (successMsg) {
            successMsg.textContent = `You are now signed in as ${this.currentUser}`;
          }
          
          this.showAuthSuccess();
        }, 1000);
      });
    }
    
    if (emailBtn) {
      emailBtn.addEventListener('click', () => {
        const label = document.getElementById('auth-switch-label');
        const submitBtn = document.getElementById('auth-submit-btn');
        const title = document.getElementById('auth-modal-title');
        const usernameGroup = document.getElementById('auth-username-group');
        
        if (label) label.innerText = 'Need an account?';
        if (switchLink) switchLink.innerText = 'Sign up';
        if (submitBtn) submitBtn.innerText = 'Log In';
        if (title) title.innerText = 'Log In';
        if (usernameGroup) usernameGroup.style.display = 'none';

        this.authViewOptions.classList.remove('active');
        this.authViewOptions.classList.add('hidden');
        this.authViewForm.classList.remove('hidden');
        this.authViewForm.classList.add('active');
      });
    }

    if (optSignupLink) {
      optSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        const label = document.getElementById('auth-switch-label');
        const submitBtn = document.getElementById('auth-submit-btn');
        const title = document.getElementById('auth-modal-title');
        const usernameGroup = document.getElementById('auth-username-group');
        
        if (label) label.innerText = 'Already have an account?';
        if (switchLink) switchLink.innerText = 'Log in';
        if (submitBtn) submitBtn.innerText = 'Sign Up';
        if (title) title.innerText = 'Join the Archive';
        if (usernameGroup) usernameGroup.style.display = 'flex';

        this.authViewOptions.classList.remove('active');
        this.authViewOptions.classList.add('hidden');
        this.authViewForm.classList.remove('hidden');
        this.authViewForm.classList.add('active');
      });
    }
    
    if (switchLink) {
      switchLink.addEventListener('click', (e) => {
        e.preventDefault();
        const label = document.getElementById('auth-switch-label');
        const submitBtn = document.getElementById('auth-submit-btn');
        const title = document.getElementById('auth-modal-title');
        const usernameGroup = document.getElementById('auth-username-group');
        
        if (label.innerText.includes('Already')) {
          label.innerText = 'Need an account?';
          switchLink.innerText = 'Sign up';
          submitBtn.innerText = 'Log In';
          title.innerText = 'Log In';
          if (usernameGroup) usernameGroup.style.display = 'none';
        } else {
          label.innerText = 'Already have an account?';
          switchLink.innerText = 'Log in';
          submitBtn.innerText = 'Sign Up';
          title.innerText = 'Join the Archive';
          if (usernameGroup) usernameGroup.style.display = 'flex';
        }
      });
    }
    
    // Form Submit
    const authForm = document.getElementById('auth-form');
    if (authForm) {
      authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const usernameInput = document.getElementById('auth-username');
        const anonCheck = document.getElementById('auth-anonymous-check');
        const submitBtn = document.getElementById('auth-submit-btn');
        
        let username = "Contributor";
        if (submitBtn.innerText === 'Sign Up' && usernameInput && usernameInput.value.trim()) {
          username = usernameInput.value.trim();
        } else if (submitBtn.innerText === 'Log In') {
          const randomNames = ["Amal", "Kamal", "Nimal", "Sunil", "Ruwan", "Piyal", "Malani", "Samanthi", "Darshana", "Nuwan"];
          username = randomNames[Math.floor(Math.random() * randomNames.length)];
        }
        
        this.currentUser = username;
        this.isAnonymous = anonCheck ? anonCheck.checked : false;
        
        const successMsg = document.getElementById('auth-success-msg');
        if (successMsg) {
          successMsg.textContent = `You are now signed in as ${this.currentUser}`;
        }
        
        this.showAuthSuccess();
      });
    }
    
    // Done Button
    const doneBtn = document.getElementById('auth-done-btn');
    if (doneBtn) {
      doneBtn.addEventListener('click', () => {
        this.closeModal(this.authModal);
        
        // Update Header UI
        if (this.headerAuthBtn) {
          this.headerAuthBtn.innerText = 'Dashboard';
        }
        
        // Execute pending action
        if (this.pendingAuthAction) {
          const action = this.pendingAuthAction;
          this.pendingAuthAction = null;
          action();
        }
      });
    }
  }
  
  openAuthModal(pendingAction = null) {
    this.pendingAuthAction = pendingAction;
    
    // Reset views
    this.authViewOptions.classList.remove('hidden');
    this.authViewOptions.classList.add('active');
    
    this.authViewForm.classList.remove('active');
    this.authViewForm.classList.add('hidden');
    
    if (this.authViewLoading) {
      this.authViewLoading.classList.remove('active');
      this.authViewLoading.classList.add('hidden');
    }
    
    this.authViewSuccess.classList.remove('active');
    this.authViewSuccess.classList.add('hidden');
    
    const form = document.getElementById('auth-form');
    if (form) form.reset();
    
    this.openModal(this.authModal);
  }
  
  showAuthSuccess() {
    this.authViewOptions.classList.remove('active');
    this.authViewOptions.classList.add('hidden');
    this.authViewForm.classList.remove('active');
    this.authViewForm.classList.add('hidden');
    
    if (this.authViewLoading) {
      this.authViewLoading.classList.remove('active');
      this.authViewLoading.classList.add('hidden');
    }
    
    this.authViewSuccess.classList.remove('hidden');
    this.authViewSuccess.classList.add('active');
  }

  // --- DASHBOARD LOGIC ---
  initDashboard() {
    if (!this.dashboardModal) return;
    
    const closeBtn = document.getElementById('dashboard-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => {
      this.closeModal(this.dashboardModal);
    });
    
    if (this.headerAuthBtn) {
      this.headerAuthBtn.addEventListener('click', () => {
        if (!this.currentUser) {
          this.openAuthModal();
        } else {
          this.renderDashboard();
          this.openModal(this.dashboardModal);
        }
      });
    }
    
    const logoutBtn = document.getElementById('dashboard-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        if (!this.currentUser) {
          // User is logged out, clicking "Log In"
          this.closeModal(this.dashboardModal);
          this.openAuthModal();
        } else {
          // User is logged in, clicking "Log Out"
          this.currentUser = null;
          this.isAnonymous = false;
          if (this.headerAuthBtn) {
            this.headerAuthBtn.innerText = 'Sign In';
          }
          this.closeModal(this.dashboardModal);
        }
      });
    }

    if (this.editCloseBtn) {
      this.editCloseBtn.addEventListener('click', () => {
        this.closeModal(this.editModal);
      });
    }
    if (this.editImageContainer) {
      this.editImageContainer.addEventListener('click', () => {
        if (!this.editingItem || this.editingItem.type !== 'object') return;
        const inlineSection = document.getElementById('inline-change-image-section');
        if (inlineSection) {
          inlineSection.classList.add('slide-in');
          if (this.newImageNameInput) this.newImageNameInput.focus();
        }
      });
    }

    const cancelInlineBtn = document.getElementById('inline-change-cancel-btn');
    if (cancelInlineBtn) {
      cancelInlineBtn.addEventListener('click', () => {
        const inlineSection = document.getElementById('inline-change-image-section');
        if (inlineSection) inlineSection.classList.remove('slide-in');
        if (this.newImageNameInput) this.newImageNameInput.value = '';
      });
    }

    const changeInlineBtn = document.getElementById('inline-change-image-btn');
    if (changeInlineBtn) {
      changeInlineBtn.addEventListener('click', async () => {
        if (!this.editingItem || this.editingItem.type !== 'object') return;
        
        const newTitle = this.newImageNameInput.value.trim() || "Untitled Object";
        const obj = this.objects.find(o => o.id === this.editingItem.id);
        if (!obj) return;
        
        const loadingOverlay = document.getElementById('inline-change-loading');
        const loadingText = document.getElementById('inline-change-loading-text');
        if (loadingText) loadingText.textContent = "Please wait...";
        if (loadingOverlay) loadingOverlay.classList.remove('hidden');
        changeInlineBtn.disabled = true;
        this.newImageNameInput.disabled = true;
        
        try {
          const finalUrl = await this.fetchOrGenerateImage(newTitle);
          
          obj.svg = finalUrl;
          obj.title = newTitle;
          obj.userLabel = newTitle;
          
          this.editImagePreview.src = finalUrl;
          this.editTitleInput.value = newTitle;
          
          this.saveState();
          this.renderCanvasObjects();
          if (this.activeObjectId === obj.id) this.renderDrawerTabsContent(obj);
          this.renderDashboard();
          
          document.getElementById('inline-change-image-section').classList.remove('slide-in');
          this.newImageNameInput.value = '';
        } catch (err) {
          console.error("Change Image failed", err);
          alert("Failed to fetch or generate the image. Please try again.");
        } finally {
          if (loadingOverlay) loadingOverlay.classList.add('hidden');
          changeInlineBtn.disabled = false;
          this.newImageNameInput.disabled = false;
        }
      });
    }

    if (this.editForm) {
      this.editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!this.editingItem) return;
        
        if (this.editingItem.type === 'object') {
          const obj = this.objects.find(o => o.id === this.editingItem.id);
          if (obj) {
            const newTitle = this.editTitleInput.value.trim() || "Untitled Object";
            if (newTitle !== obj.title) {
              obj.title = newTitle;
              obj.userLabel = newTitle;
              // We do not await here because it's inside a sync block, but we can instantly update if it's in the hardcoded list
              const assets = ["Candle.png", "Cooking pot.png", "Doctor's Prescription.png", "Extension cord.png", "Fuel can.png", "Gas cylinder.png", "Generator.png", "IV bag.png", "Kerosene lamp.png", "Medicine bottle.png", "Milk powder tin.png", "Placard.png", "Plastic Chair.png", "Power bank.png", "Power cut schedule.png", "Rice bag.png", "Rice measuring cup.png", "Smart phone.png", "Torch.png", "Umbrella.png"];
              const match = assets.find(a => a.toLowerCase().replace('.png', '').includes(newTitle.trim().toLowerCase()));
              if (match) {
                obj.svg = `assets/${match}`;
              }
            }
            
            // Also update memory if it exists
            const userMem = obj.memories.find(m => m.actualAuthor === this.currentUser);
            const mediaTypeInput = document.getElementById('edit-media-type');
            if (userMem) {
              userMem.text = this.editTextInputValue.value.trim();
              if (mediaTypeInput) userMem.type = mediaTypeInput.value;
            } else if (this.editTextInputValue.value.trim().length > 0) {
              // Add a new memory if they typed one
              const displayName = this.isAnonymous ? "Anonymous" : this.currentUser;
              const newMemory = {
                id: `mem-${obj.id}-${Date.now()}`,
                author: displayName,
                actualAuthor: this.currentUser,
                text: this.editTextInputValue.value.trim(),
                type: mediaTypeInput ? mediaTypeInput.value : 'text',
                likes: 0,
                timeAgo: "Just now"
              };
              obj.memories.unshift(newMemory);
              obj.memoriesCount = obj.memories.length;
            }
          }
        } else if (this.editingItem.type === 'memory') {
          const obj = this.objects.find(o => o.id === this.editingItem.objId);
          if (obj) {
            const mem = obj.memories.find(m => m.id === this.editingItem.id);
            const mediaTypeInput = document.getElementById('edit-media-type');
            if (mem) {
              mem.text = this.editTextInputValue.value.trim();
              if (mediaTypeInput) mem.type = mediaTypeInput.value;
            }
          }
        }
        
        this.saveState();
        this.renderCanvasObjects();
        if (this.activeObjectId) {
          const activeObj = this.objects.find(o => o.id === this.activeObjectId);
          if (activeObj) this.renderDrawerTabsContent(activeObj);
        }
        this.renderDashboard();
        this.closeModal(this.editModal);
      });
    }

    if (this.editWithdrawBtn) {
      this.editWithdrawBtn.addEventListener('click', () => {
        if (!this.editingItem) return;
        
        if (confirm("Are you sure you want to completely withdraw this contribution? This cannot be undone.")) {
          if (this.editingItem.type === 'object') {
            this.objects = this.objects.filter(o => o.id !== this.editingItem.id);
          } else if (this.editingItem.type === 'memory') {
            const obj = this.objects.find(o => o.id === this.editingItem.objId);
            if (obj) {
              obj.memories = obj.memories.filter(m => m.id !== this.editingItem.id);
              obj.memoriesCount = obj.memories.length;
            }
          }
          
          this.saveState();
          this.renderCanvasObjects();
          if (this.activeObjectId && this.editingItem.type === 'object' && this.activeObjectId === this.editingItem.id) {
            this.closeDrawer();
          } else if (this.activeObjectId) {
            const activeObj = this.objects.find(o => o.id === this.activeObjectId);
            if (activeObj) this.renderDrawerTabsContent(activeObj);
          }
          
          this.renderDashboard();
          this.closeModal(this.editModal);
        }
      });
    }
  }
  
  renderDashboard() {
    const objectsList = document.getElementById('dashboard-objects-list');
    const memoriesList = document.getElementById('dashboard-memories-list');
    const logoutBtn = document.getElementById('dashboard-logout-btn');
    if (!objectsList || !memoriesList) return;
    
    objectsList.innerHTML = '';
    memoriesList.innerHTML = '';
    
    if (!this.currentUser) {
      if (logoutBtn) {
        logoutBtn.innerText = 'Log In';
        logoutBtn.style.color = 'var(--color-primary)';
        logoutBtn.style.borderColor = 'var(--color-primary)';
      }
      objectsList.innerHTML = '<p class="dashboard-empty">Sign in to see your objects.</p>';
      memoriesList.innerHTML = '<p class="dashboard-empty">Sign in to see your memories.</p>';
      return;
    }
    
    if (logoutBtn) {
      logoutBtn.innerText = 'Log Out';
      logoutBtn.style.color = 'var(--color-brand-red)';
      logoutBtn.style.borderColor = 'var(--color-brand-red)';
    }
    
    const authorName = this.isAnonymous ? "Anonymous" : this.currentUser;
    
    // Find objects authored by this user
    const userObjects = this.objects.filter(obj => obj.actualAuthor === this.currentUser);
    
    if (userObjects.length === 0) {
      objectsList.innerHTML = '<p class="dashboard-empty">You haven\'t added any objects yet.</p>';
    } else {
      userObjects.forEach(obj => {
        const item = document.createElement('div');
        item.className = 'dashboard-item';
        item.style.cursor = 'pointer';
        item.innerHTML = `
          <div class="dashboard-item-info">
            <span class="dashboard-item-title">${obj.title}</span>
            <span class="dashboard-item-meta">Placed on ${new Date().toLocaleDateString()}</span>
          </div>
          <div class="dashboard-item-actions">
            <button class="dashboard-action-btn edit-btn" data-type="object" data-id="${obj.id}">Edit</button>
          </div>
        `;
        
        item.addEventListener('click', (e) => {
          if (e.target.closest('.edit-btn')) return;
          
          this.closeModal(this.dashboardModal);
          this.centerCameraOn(obj.x, obj.y);
          this.selectObject(obj.id);
        });
        
        objectsList.appendChild(item);
      });
    }
    
    // Find memories authored by this user (only on objects they didn't author)
    let userMemories = [];
    this.objects.forEach(obj => {
      if (obj.actualAuthor !== this.currentUser) {
        obj.memories.forEach(mem => {
          if (mem.actualAuthor === this.currentUser) {
            userMemories.push({ objId: obj.id, objTitle: obj.title, mem: mem });
          }
        });
      }
    });
    
    if (userMemories.length === 0) {
      memoriesList.innerHTML = '<p class="dashboard-empty">You haven\'t added any memories yet.</p>';
    } else {
      userMemories.forEach(item => {
        const div = document.createElement('div');
        div.className = 'dashboard-item';
        div.innerHTML = `
          <div class="dashboard-item-info">
            <span class="dashboard-item-title">On: ${item.objTitle}</span>
            <span class="dashboard-item-meta">${item.mem.text.substring(0, 40)}...</span>
          </div>
          <div class="dashboard-item-actions">
            <button class="dashboard-action-btn edit-btn" data-type="memory" data-id="${item.mem.id}" data-obj-id="${item.objId}">Edit</button>
          </div>
        `;
        memoriesList.appendChild(div);
      });
    }
    
    // Bind Edit Actions
    const populateEditMediaSelector = (mem) => {
      const selectorGroup = document.getElementById('edit-media-selector-group');
      if (!selectorGroup) return;
      const toggleBtn = selectorGroup.querySelector('.add-media-toggle-btn');
      const optionsDiv = selectorGroup.querySelector('.media-options');
      const selectedStateDiv = selectorGroup.querySelector('.media-selected-state');
      const selectedLabel = selectorGroup.querySelector('.media-selected-label');
      const hiddenInput = document.getElementById('edit-media-type');
      
      selectorGroup.style.display = 'flex';
      
      if (mem && mem.type && mem.type !== 'text') {
        hiddenInput.value = mem.type;
        let labelText = "Attached Media";
        if (mem.type === 'image') labelText = "🖼️ Image attached";
        if (mem.type === 'video') labelText = "🎬 Video attached";
        if (mem.type === 'audio') labelText = "🎵 Audio attached";
        
        selectedLabel.textContent = labelText;
        toggleBtn.classList.add('hidden');
        optionsDiv.classList.add('hidden');
        selectedStateDiv.classList.remove('hidden');
      } else {
        hiddenInput.value = 'text';
        toggleBtn.classList.remove('hidden');
        optionsDiv.classList.add('hidden');
        selectedStateDiv.classList.add('hidden');
      }
    };

    document.querySelectorAll('.dashboard-action-btn.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const type = e.target.getAttribute('data-type');
        const id = e.target.getAttribute('data-id');
        
        if (type === 'object') {
          const obj = this.objects.find(o => o.id === id);
          if (!obj) return;
          this.editingItem = { type: 'object', id: obj.id };
          this.editModalTitle.textContent = "Edit Object";
          this.editTitleGroup.style.display = 'flex';
          this.editTextGroup.style.display = 'flex';
          this.editTitleInput.value = obj.title;
          this.editTitleInput.disabled = false;
          this.editTitleInput.style.opacity = '1';
          this.editImagePreview.src = obj.svg;
          this.editImageContainer.style.display = 'block';
          
          const overlay = document.getElementById('edit-image-overlay');
          if (overlay) overlay.style.display = 'flex';
          
          const userMem = obj.memories.find(m => m.actualAuthor === this.currentUser);
          this.editTextInputValue.value = userMem ? userMem.text : "";
          
          populateEditMediaSelector(userMem);
          
          this.closeModal(this.dashboardModal);
          this.openModal(this.editModal);
        } else if (type === 'memory') {
          const objId = e.target.getAttribute('data-obj-id');
          const obj = this.objects.find(o => o.id === objId);
          if (!obj) return;
          const mem = obj.memories.find(m => m.id === id);
          if (!mem) return;
          
          this.editingItem = { type: 'memory', id: mem.id, objId: obj.id };
          this.editModalTitle.textContent = "Edit Memory";
          
          // Show the object preview but disable the tap-to-change feature
          this.editImageContainer.style.display = 'block';
          this.editImagePreview.src = obj.svg;
          const overlay = document.getElementById('edit-image-overlay');
          if (overlay) overlay.style.display = 'none';
          
          // Disable title editing
          this.editTitleGroup.style.display = 'flex';
          this.editTitleInput.value = obj.title;
          this.editTitleInput.disabled = true;
          this.editTitleInput.style.opacity = '0.6';
          
          // Enable text editing
          this.editTextGroup.style.display = 'flex';
          this.editTextInputValue.value = mem.text;
          
          populateEditMediaSelector(mem);
          
          this.closeModal(this.dashboardModal);
          this.openModal(this.editModal);
        }
      });
    });
  }

  renderIntroDemoObject() {
    if (!this.introObjectDemoContainer) return;
    
    // Find objects with memories
    const objectsWithMemories = this.objects.filter(o => o.memories && o.memories.length > 0);
    
    let displayObject = null;
    let displayMemory = null;
    
    if (objectsWithMemories.length > 0) {
      // Pick random object
      displayObject = objectsWithMemories[Math.floor(Math.random() * objectsWithMemories.length)];
      // Pick random memory from it
      displayMemory = displayObject.memories[Math.floor(Math.random() * displayObject.memories.length)];
    } else {
      // Fallback placeholder
      displayObject = {
        title: "Gas Cylinder",
        memoriesCount: 1,
        svg: "assets/objects/cooking-gas.png" 
      };
      displayMemory = {
        text: "My family queued for hours for a gas refill. That wait is something I'll never forget.",
        author: "Anusha",
        location: "Colombo",
        date: "May 2022"
      };
    }
    
    // Resolve image source
    let imgSource = displayObject.svg;
    if (imgSource && imgSource.startsWith('<svg')) {
      imgSource = "data:image/svg+xml;base64," + btoa(imgSource);
    } else if (!imgSource) {
      imgSource = "assets/objects/cooking-gas.png";
    }
    
    const html = `
      <div class="intro-demo-wrapper">
        <div class="intro-demo-object">
          <div class="intro-demo-card">
            <img src="${imgSource}" alt="${displayObject.title}">
          </div>
          <div class="intro-demo-label">${displayObject.title}</div>
          <div class="intro-demo-meta">1 memory</div>
        </div>
        
        <div class="intro-demo-memory fade-in-delayed">
          <div class="intro-demo-memory-header">
            <span class="intro-demo-memory-title">${displayObject.title}</span>
          </div>
          <div class="intro-demo-memory-text">
            ${displayMemory.text}
          </div>
          <div class="intro-demo-memory-author">- ${displayMemory.author}</div>
        </div>
      </div>
    `;
    
    this.introObjectDemoContainer.innerHTML = html;
  }

  // --- STATE MANAGEMENT ---

  // --- CAMERA PAN & ZOOM LOGIC ---
  initCanvasCenter() {
    // Canvas dimensions are 3000x2000. Center it inside the current viewport.
    const vpWidth = this.viewport.clientWidth;
    const vpHeight = this.viewport.clientHeight;
    
    // Set initial scale based on viewport size (mobile gets smaller scale)
    this.zoomScale = vpWidth < 600 ? 0.45 : 0.75;
    
    // Center of the canvas is X=1500, Y=1000. Calculate translations.
    this.panX = (vpWidth / 2) - (1500 * this.zoomScale);
    this.panY = (vpHeight / 2) - (950 * this.zoomScale); // Offset slightly to account for floating elements
    
    this.applyTransform(true);
  }

  applyTransform(animate = false) {
    if (animate) {
      this.canvasSurface.classList.add('canvas-smooth-transition');
    } else {
      this.canvasSurface.classList.remove('canvas-smooth-transition');
    }
    
    this.canvasSurface.style.transform = `translate(${this.panX}px, ${this.panY}px) scale(${this.zoomScale})`;
    
    if (animate) {
      setTimeout(() => {
        this.canvasSurface.classList.remove('canvas-smooth-transition');
      }, 350);
    }
  }

  // Center Camera smoothly on a specific canvas coordinate
  centerCameraOn(x, y, scale = this.zoomScale) {
    const vpWidth = this.viewport.clientWidth;
    const vpHeight = this.viewport.clientHeight;
    
    this.zoomScale = scale;
    this.panX = (vpWidth / 2) - (x * this.zoomScale);
    this.panY = (vpHeight / 2) - (y * this.zoomScale);
    
    this.applyTransform(true);
  }

  // Handle zooming at a pivot point (typically mouse cursor coordinates)
  zoomAtPivot(pivotX, pivotY, factor) {
    const minScale = 0.3;
    const maxScale = 2.0;
    
    const oldScale = this.zoomScale;
    let newScale = oldScale * factor;
    
    // Clamp scale
    if (newScale < minScale) newScale = minScale;
    if (newScale > maxScale) newScale = maxScale;
    
    if (newScale === oldScale) return;
    
    // Math to zoom into the mouse cursor:
    // Translate = Pivot - (Pivot - Translate) * (newScale / oldScale)
    this.panX = pivotX - (pivotX - this.panX) * (newScale / oldScale);
    this.panY = pivotY - (pivotY - this.panY) * (newScale / oldScale);
    this.zoomScale = newScale;
    
    this.applyTransform(false); // Direct updates for interactive fluid feel
  }

  // --- MEMORIES CANVAS PAN/ZOOM ---
  applyMemTransform() {
    this.clampMemPan();
    this.memoriesFeed.style.transform = `translate(${this.memPanX}px, ${this.memPanY}px) scale(${this.memZoomScale})`;
  }

  clampMemPan() {
    if (!this.memContentWidth) return;
    
    const vpWidth = this.memoriesViewport.clientWidth;
    const vpHeight = this.memoriesViewport.clientHeight;
    
    const scaledWidth = this.memContentWidth * this.memZoomScale;
    const scaledHeight = this.memContentHeight * this.memZoomScale;
    
    // Determine the padding from the edge (how far the content can drift out of view)
    // We restrict it so at least `paddingX` pixels remain visible.
    const paddingX = Math.min(200, vpWidth / 2);
    const paddingY = Math.min(200, vpHeight / 2);
    
    const minPanX = paddingX - scaledWidth;
    const maxPanX = vpWidth - paddingX;
    
    const minPanY = paddingY - scaledHeight;
    const maxPanY = vpHeight - paddingY;
    
    if (this.memPanX < minPanX) this.memPanX = minPanX;
    if (this.memPanX > maxPanX) this.memPanX = maxPanX;
    
    if (this.memPanY < minPanY) this.memPanY = minPanY;
    if (this.memPanY > maxPanY) this.memPanY = maxPanY;
  }

  zoomMemAtPivot(pivotX, pivotY, factor) {
    const minScale = 0.5;
    const maxScale = 2.5;
    
    const oldScale = this.memZoomScale;
    let newScale = oldScale * factor;
    
    if (newScale < minScale) newScale = minScale;
    if (newScale > maxScale) newScale = maxScale;
    if (newScale === oldScale) return;
    
    this.memPanX = pivotX - (pivotX - this.memPanX) * (newScale / oldScale);
    this.memPanY = pivotY - (pivotY - this.memPanY) * (newScale / oldScale);
    this.memZoomScale = newScale;
    
    this.applyMemTransform();
  }

  // --- RENDER FUNCTIONS ---
  renderCanvasObjects() {
    this.objectsLayer.innerHTML = '';
    
    this.objects.forEach(obj => {
      const card = document.createElement('article');
      card.id = `card-${obj.id}`;
      card.className = `object-card ${obj.id === 'gotagohome' ? 'centerpiece-sign' : ''}`;
      if (obj.isNew) {
        card.classList.add('falling-object');
        delete obj.isNew;
      }
      card.style.left = `${obj.x}px`;
      card.style.top = `${obj.y}px`;
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `${obj.title}, ${obj.memoriesCount} memories`);
      
      const illustrationMarkup = obj.svg.trim().startsWith('<svg') 
        ? obj.svg 
        : `<img src="${obj.svg}" alt="${obj.title}" class="object-png-image">`;
      
      card.innerHTML = `
        <div class="object-illustration-wrapper">
          ${illustrationMarkup}
        </div>
        <div class="object-info">
          <h3 class="object-title">${obj.title}</h3>
          <p class="object-memories">${obj.memoriesCount} memories</p>
        </div>
      `;
      
      // Select object on click
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectObject(obj.id);
      });
      
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.selectObject(obj.id);
        }
      });
      
      this.objectsLayer.appendChild(card);
    });
  }

  renderRandomSpeckles() {
    this.dotsLayer.innerHTML = '';
    const colors = ['#eadaaf', '#a83232', '#2c598f', '#c29546', '#8e887a'];
    
    // Scatter 250 memory speckles randomly across the 3000x2000 canvas
    for (let i = 0; i < 250; i++) {
      const dot = document.createElement('div');
      dot.className = 'canvas-speckle';
      
      const x = Math.random() * 3000;
      const y = Math.random() * 2000;
      const size = 3 + Math.random() * 4;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.backgroundColor = color;
      
      this.dotsLayer.appendChild(dot);
    }
  }

  // Update overall counters dynamically
  updateStatsCounters() {
    const totalObjects = this.objects.length;
    
    // Calculate sum of all object memory lengths
    const totalMemories = this.objects.reduce((sum, obj) => sum + obj.memories.length, 0); // Offset standard stats
    
    this.statObjects.textContent = totalObjects.toLocaleString();
    this.statMemories.textContent = totalMemories.toLocaleString();
  }

  // --- SEARCH & FILTER CONTROLLER ---
  filterObjects(query) {
    const sanitizedQuery = query.toLowerCase().trim();
    
    if (sanitizedQuery === '') {
      // Clear filters
      const cards = document.querySelectorAll('.object-card');
      cards.forEach(card => {
        card.classList.remove('faded-object', 'highlighted-object');
      });
      this.clearSearchBtn?.classList.add('hidden-btn');
      return;
    }
    
    this.clearSearchBtn?.classList.remove('hidden-btn');
    
    this.objects.forEach(obj => {
      const card = document.getElementById(`card-${obj.id}`);
      if (!card) return;
      
      // Match by title, descriptions, or memory logs
      const titleMatch = obj.title.toLowerCase().includes(sanitizedQuery);
      const aboutMatch = obj.about ? obj.about.toLowerCase().includes(sanitizedQuery) : false;
      const memoryMatch = obj.memories.some(m => m.text.toLowerCase().includes(sanitizedQuery) || m.author.toLowerCase().includes(sanitizedQuery));
      
      if (titleMatch || aboutMatch || memoryMatch) {
        card.classList.remove('faded-object');
        card.classList.add('highlighted-object');
      } else {
        card.classList.add('faded-object');
        card.classList.remove('highlighted-object');
      }
    });
  }

  // --- OBJECT SELECTION & DRAWER ---
  selectObject(id) {
    const obj = this.objects.find(o => o.id === id);
    if (!obj) return;
    
    // Active highlights on canvas
    const currentActive = document.querySelector('.object-card.active-object');
    if (currentActive) currentActive.classList.remove('active-object');
    
    const cardElement = document.getElementById(`card-${id}`);
    if (cardElement) cardElement.classList.add('active-object');
    
    this.activeObjectId = id;
    
    // Dynamic Drawer Populating
    const illustrationMarkup = obj.svg.trim().startsWith('<svg') 
      ? obj.svg 
      : `<img src="${obj.svg}" alt="${obj.title}" class="object-png-image">`;
      
    this.drawerIllustration.innerHTML = illustrationMarkup;
    
    // Show user's own label as the primary title, template title as subtitle
    const displayName = obj.userLabel || obj.title;
    const subtitleName = obj.userLabel && obj.userLabel.toLowerCase() !== obj.title.toLowerCase() ? obj.title : '';
    this.drawerTitle.textContent = displayName;
    
    // Set or clear subtitle
    let subtitleEl = document.getElementById('drawer-object-subtitle');
    if (subtitleName) {
      if (!subtitleEl) {
        subtitleEl = document.createElement('p');
        subtitleEl.id = 'drawer-object-subtitle';
        this.drawerTitle.insertAdjacentElement('afterend', subtitleEl);
      }
      subtitleEl.textContent = subtitleName;
    } else if (subtitleEl) {
      subtitleEl.remove();
    }
    
    // Recount memories
    const totalMem = obj.memories.length;
    this.drawerMemoriesCount.textContent = `${totalMem} memories of this object`;
    
    this.renderDrawerTabsContent(obj);
    
    // Slide drawer open
    this.sideDrawer.classList.remove('drawer-closed');
    this.sideDrawer.classList.add('drawer-open');
    this.sideDrawer.setAttribute('aria-hidden', 'false');
    this.drawerBackdrop.classList.add('backdrop-active');
    
    // Activate canvas split-screen visual state
    this.objectsLayer.classList.add('canvas-split-active');
    document.body.classList.add('drawer-open-state');
    if (this.floatingCalloutCard) this.floatingCalloutCard.classList.add('hidden-callout');
    
    // Center camera on object for premium feel 
    // Shift significantly right of center to place the object in the 360px visible canvas area on the left
    const isMobile = window.innerWidth < 600;
    const targetScale = isMobile ? 0.65 : 1.1;
    let centerOffset = 0;
    
    if (!isMobile) {
      // The visible canvas on the left is 360px wide (since drawer is 100vw - 360px).
      // We want the object to appear at x = 180px from the left screen edge.
      const targetScreenX = 180;
      centerOffset = (window.innerWidth / 2 - targetScreenX) / targetScale;
    }
    
    this.centerCameraOn(obj.x + centerOffset, obj.y, targetScale);
  }

  closeDrawer() {
    this.sideDrawer.classList.remove('drawer-open');
    this.sideDrawer.classList.add('drawer-closed');
    this.sideDrawer.setAttribute('aria-hidden', 'true');
    this.drawerBackdrop.classList.remove('backdrop-active');
    
    // Deactivate canvas split-screen visual state
    this.objectsLayer.classList.remove('canvas-split-active');
    document.body.classList.remove('drawer-open-state');
    if (this.floatingCalloutCard) this.floatingCalloutCard.classList.remove('hidden-callout');
    
    // Remove selected state
    const currentActive = document.querySelector('.object-card.active-object');
    if (currentActive) currentActive.classList.remove('active-object');
    
    this.activeObjectId = null;
    
    // Reset inline width from resizer drag instantly so CSS transition takes over
    this.sideDrawer.style.width = '';
  }

  // Render content in drawer body depending on active tab
  renderDrawerTabsContent(obj) {
    // 1. Memories Tab
    this.memoriesFeed.innerHTML = '';
    
    // Sort memories in descending order of likes (most interesting first)
    const sortedMemories = [...obj.memories].sort((a, b) => b.likes - a.likes);
    
    // Reset memories panning logic
    this.memPanX = 0;
    this.memPanY = 0;
    this.memZoomScale = 1.0;
    this.applyMemTransform();
    
    // Procedural layout constants for scattering sticky notes
    const COLUMNS = 3;
    const X_GAP = 280;
    const Y_GAP = 280;
    const START_OFFSET_X = 40;
    const START_OFFSET_Y = 40;

    let needsSave = false;

    sortedMemories.forEach((mem, index) => {
      const memoryCard = document.createElement('div');
      memoryCard.className = 'memory-card';
      memoryCard.dataset.memId = mem.id;
      
      // Use saved coordinates or generate procedural ones and save them
      if (mem.x === undefined || mem.y === undefined) {
        const col = index % COLUMNS;
        const row = Math.floor(index / COLUMNS);
        const randomX = Math.random() * 40 - 20; 
        const randomY = Math.random() * 40 - 20;
        mem.x = START_OFFSET_X + (col * X_GAP) + randomX;
        mem.y = START_OFFSET_Y + (row * Y_GAP) + randomY;
        needsSave = true;
      }
      
      memoryCard.style.left = `${mem.x}px`;
      memoryCard.style.top = `${mem.y}px`;
      
      // Draggable authorization check
      if (this.currentUser && mem.actualAuthor === this.currentUser) {
        memoryCard.classList.add('draggable-card');
        this.bindMemoryCardDrag(memoryCard, mem, obj);
      }
      
      // Check if user liked it in this session (persists in session)
      const likedClass = sessionStorage.getItem(`like_${mem.id}`) ? 'liked' : '';
      
      let mediaHtml = '';
      if (mem.type && mem.type !== 'text') {
        mediaHtml = `<div class="memory-media-placeholder"></div>`;
      }
      
      memoryCard.innerHTML = `
        <div class="drag-handle" title="Drag to move">
          <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
            <circle cx="9" cy="6" r="1.5"></circle>
            <circle cx="15" cy="6" r="1.5"></circle>
            <circle cx="9" cy="12" r="1.5"></circle>
            <circle cx="15" cy="12" r="1.5"></circle>
            <circle cx="9" cy="18" r="1.5"></circle>
            <circle cx="15" cy="18" r="1.5"></circle>
          </svg>
        </div>
        ${mediaHtml}
        <p class="memory-text">“${mem.text}”</p>
        <div class="memory-meta-row">
          <div class="memory-author-block">
            <span class="memory-author">${mem.author}</span>
            <span class="bullet-dot">•</span>
            <span class="memory-time">${mem.timeAgo}</span>
          </div>
        </div>
      `;
      
      this.memoriesFeed.appendChild(memoryCard);
      
      if (mem.type) {
        memoryCard.classList.add(`media-${mem.type}`);
      }
    });

    if (needsSave) {
      this.saveState();
    }

    // Calculate maximum content bounds based on actual positions
    if (sortedMemories.length > 0) {
      let maxX = 0;
      let maxY = 0;
      sortedMemories.forEach(mem => {
        if (mem.x > maxX) maxX = mem.x;
        if (mem.y > maxY) maxY = mem.y;
      });
      this.memContentWidth = maxX + 300; // 250 width + 50 padding
      this.memContentHeight = maxY + 300;
    } else {
      this.memContentWidth = 0;
      this.memContentHeight = 0;
    }
  }

  bindMemoryCardDrag(cardElement, mem, obj) {
    let isDragging = false;
    let startMouseX = 0;
    let startMouseY = 0;
    let initialX = mem.x;
    let initialY = mem.y;

    const onMouseDown = (e) => {
      // Don't drag if clicking a button (like the 'like' button)
      if (e.target.closest('button')) return;

      isDragging = true;
      startMouseX = e.clientX;
      startMouseY = e.clientY;
      initialX = mem.x;
      initialY = mem.y;

      cardElement.classList.add('is-dragging');
      
      // Prevent the memory canvas panning from triggering
      e.stopPropagation();
      e.preventDefault();

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      
      // Calculate delta mapped to current zoom scale
      const dx = (e.clientX - startMouseX) / this.memZoomScale;
      const dy = (e.clientY - startMouseY) / this.memZoomScale;
      
      mem.x = initialX + dx;
      mem.y = initialY + dy;
      
      cardElement.style.left = `${mem.x}px`;
      cardElement.style.top = `${mem.y}px`;
    };

    const onMouseUp = (e) => {
      if (!isDragging) return;
      isDragging = false;
      cardElement.classList.remove('is-dragging');
      
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      this.resolveMemoryCollision(mem, obj.memories);
      
      // Update DOM with resolved coordinates
      cardElement.style.left = `${mem.x}px`;
      cardElement.style.top = `${mem.y}px`;

      this.saveState();
      
      // Recalculate boundaries for panning
      let maxX = 0;
      let maxY = 0;
      obj.memories.forEach(m => {
        if (m.x > maxX) maxX = m.x;
        if (m.y > maxY) maxY = m.y;
      });
      this.memContentWidth = maxX + 300;
      this.memContentHeight = maxY + 300;
      this.clampMemPan();
    };

    cardElement.addEventListener('mousedown', onMouseDown);
  }

  resolveMemoryCollision(droppedMem, allMemories) {
    const CARD_SIZE = 250;
    
    // Simple relaxation loop to push the card out of overlaps
    let collisionDetected = true;
    let iterations = 0;
    const maxIterations = 50; // prevent infinite loops
    
    while (collisionDetected && iterations < maxIterations) {
      collisionDetected = false;
      
      for (const other of allMemories) {
        if (other.id === droppedMem.id) continue;
        
        // AABB Collision check
        const overlapX = CARD_SIZE - Math.abs(droppedMem.x - other.x);
        const overlapY = CARD_SIZE - Math.abs(droppedMem.y - other.y);
        
        if (overlapX > 0 && overlapY > 0) {
          // Collision! 
          collisionDetected = true;
          
          // Push out in the direction of least resistance
          // Include the "off-setting" gap required by the user
          const randomOffset = Math.random() * 20 + 15; // 15px to 35px gap
          
          if (overlapX < overlapY) {
            // Push horizontally
            if (droppedMem.x < other.x) {
              droppedMem.x = other.x - CARD_SIZE - randomOffset;
            } else {
              droppedMem.x = other.x + CARD_SIZE + randomOffset;
            }
          } else {
            // Push vertically
            if (droppedMem.y < other.y) {
              droppedMem.y = other.y - CARD_SIZE - randomOffset;
            } else {
              droppedMem.y = other.y + CARD_SIZE + randomOffset;
            }
          }
          
          // Apply a slight offset on the *other* axis so it doesn't align perfectly edge-to-edge
          const antiSnapOffset = (Math.random() * 60) - 30; // -30px to 30px offset
          if (overlapX < overlapY) {
            droppedMem.y += antiSnapOffset;
          } else {
            droppedMem.x += antiSnapOffset;
          }
        }
      }
      iterations++;
    }
  }

  bindMediaSelectors() {
    const selectors = document.querySelectorAll('.media-selector-container');
    selectors.forEach(container => {
      const toggleBtn = container.querySelector('.add-media-toggle-btn');
      const optionsDiv = container.querySelector('.media-options');
      const selectedStateDiv = container.querySelector('.media-selected-state');
      const selectedLabel = container.querySelector('.media-selected-label');
      const removeBtn = container.querySelector('.media-remove-btn');
      const hiddenInput = container.querySelector('input[type="hidden"]');
      
      if (!toggleBtn) return;
      
      toggleBtn.addEventListener('click', () => {
        toggleBtn.classList.add('hidden');
        optionsDiv.classList.remove('hidden');
      });
      
      const optionBtns = container.querySelectorAll('.media-option-btn');
      optionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const type = e.currentTarget.dataset.type;
          hiddenInput.value = type;
          
          let labelText = "Attached Media";
          if (type === 'image') labelText = "🖼️ Image attached";
          if (type === 'video') labelText = "🎬 Video attached";
          if (type === 'audio') labelText = "🎵 Audio attached";
          
          selectedLabel.textContent = labelText;
          optionsDiv.classList.add('hidden');
          selectedStateDiv.classList.remove('hidden');
        });
      });
      
      removeBtn.addEventListener('click', () => {
        hiddenInput.value = "text";
        selectedStateDiv.classList.add('hidden');
        toggleBtn.classList.remove('hidden');
      });
    });
  }

  toggleLikeMemory(objId, memId, btnElement) {
    const obj = this.objects.find(o => o.id === objId);
    if (!obj) return;
    
    const mem = obj.memories.find(m => m.id === memId);
    if (!mem) return;
    
    const sessionKey = `like_${memId}`;
    const countSpan = btnElement.querySelector('.like-count');
    
    if (btnElement.classList.contains('liked')) {
      // Unlike
      btnElement.classList.remove('liked');
      mem.likes = Math.max(0, mem.likes - 1);
      sessionStorage.removeItem(sessionKey);
    } else {
      // Like
      btnElement.classList.add('liked');
      mem.likes += 1;
      sessionStorage.setItem(sessionKey, 'true');
    }
    
    countSpan.textContent = mem.likes;
    
    // Save to LocalStorage
    this.saveState();
  }

  // --- STATE MANAGEMENT ---
  saveState() {
    try {
      localStorage.setItem('object_canvas_data_v4', JSON.stringify(this.objects));
      this.updateStatsCounters();
    } catch (e) {
      console.error("Failed to save state, attempting cleanup:", e);
      if (e.name === 'QuotaExceededError' || e.message.includes('quota') || e.message.includes('Quota')) {
         let freedSpace = false;
         for (let i = 0; i < this.objects.length; i++) {
            const obj = this.objects[i];
            if (obj.category === 'Generated' && obj.svg && obj.svg.length > 30000) {
               const cleanLabel = obj.title.replace(/[^a-zA-Z0-9 ]/g, '').substring(0, 20);
               obj.svg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" viewBox="0 0 250 250"><rect width="250" height="250" rx="30" fill="%23E8E4D9" stroke="%23c4bbb0" stroke-width="4"/><text x="125" y="125" font-family="Inter, sans-serif" font-size="24" font-weight="600" fill="%235e5a52" text-anchor="middle" dominant-baseline="middle">${encodeURIComponent(cleanLabel)}</text></svg>`;
               freedSpace = true;
               break; 
            }
         }
         
         if (freedSpace) {
           this.saveState(); 
         } else {
           alert("Local storage is completely full! Cannot save new objects.");
         }
      }
    }
  }
  // --- MODALS TOGGLERS ---
  openModal(modalElement) {
    if (modalElement.id === 'add-object-modal') {
      this.modalBackdrop.classList.add('backdrop-active-no-blur');
      if (this.floatingCalloutCard) this.floatingCalloutCard.classList.add('hidden-callout');
    } else {
      this.modalBackdrop.classList.add('backdrop-active');
    }
    modalElement.classList.remove('hidden-modal');
    // Force browser reflow to trigger CSS scale transitions
    modalElement.offsetHeight; 
    modalElement.classList.add('modal-open');
  }

  closeModal(modalElement, skipCalloutRestore = false, keepPendingObject = false) {
    modalElement.classList.remove('modal-open');
    this.modalBackdrop.classList.remove('backdrop-active');
    this.modalBackdrop.classList.remove('backdrop-active-no-blur');
    if (modalElement.id === 'add-object-modal') {
      if (this.floatingCalloutCard && !skipCalloutRestore) {
        setTimeout(() => {
          this.floatingCalloutCard.classList.remove('hidden-callout');
        }, 1000);
      }
      setTimeout(() => {
        modalElement.classList.add('hidden-modal');
        if (!keepPendingObject) this.pendingNewObjectId = null;
      }, 350);
    } else {
      setTimeout(() => {
        modalElement.classList.add('hidden-modal');
      }, 350);
    }
  }



  async getLocalAsset(newTitle) {
    if (!newTitle) return null;
    const cleanTitle = newTitle.trim();
    if (!cleanTitle) return null;
    
    // First try exact case matching for Windows case-insensitivity trick that worked before
    const assetName = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);
    const assetPath = `assets/${assetName}.png`;
    
    try {
      const res = await fetch(assetPath, { method: 'HEAD' });
      if (res.ok) return assetPath;
    } catch(e) {}
    
    // As a fallback, try some hardcoded known assets just in case it's a capitalization issue
    // on a strict server (even though user is on windows).
    const assets = [
      "Candle.png", "Cooking pot.png", "Doctor's Prescription.png", "Extension cord.png",
      "Fuel can.png", "Gas cylinder.png", "Generator.png", "IV bag.png", "Kerosene lamp.png",
      "Medicine bottle.png", "Milk powder tin.png", "Placard.png", "Plastic Chair.png",
      "Power bank.png", "Power cut schedule.png", "Rice bag.png", "Rice measuring cup.png",
      "Smart phone.png", "Torch.png", "Umbrella.png"
    ];
    const normalizedLabel = cleanTitle.toLowerCase();
    const match = assets.find(a => a.toLowerCase().replace('.png', '').includes(normalizedLabel));
    if (match) return `assets/${match}`;
    
    return null;
  }

  async fetchOrGenerateImage(newTitle) {
    const localAsset = await this.getLocalAsset(newTitle);
    if (localAsset) return localAsset;

    // Update loading text to indicate generation
    const loadingText = document.getElementById('inline-change-loading-text');
    if (loadingText) loadingText.textContent = "Generating object... please wait";

    // AI Generation fallback
    const promptText = [
      `A single ${newTitle}, isolated on a perfectly flat pure white #FFFFFF background.`,
      `Style: textured archival editorial object illustration, semi-realistic digital gouache rendering.`,
      `Rendering: layered pigment textures, dry-brush edges, subtle tonal pooling, soft pigment variation, imperfect hand-painted blending. Resembles museum specimen plate or field-guide documentation.`,
      `Surface: the object should look handled, aged, materially worn, with faded paint, scratches, softened edges, slight discoloration, subtle texture noise. It should feel lived-with, not new.`,
      `Lighting: flat studio lighting, perfectly even. ABSOLUTELY NO drop shadows, NO cast shadows, NO contact shadows beneath the object.`,
      `Colors: muted, slightly desaturated, archival in tone.`,
      `Edges: clear silhouette, organically imperfect.`,
      `Composition: single centered object. NO ground plane, NO surface, NO shadow.`,
      `Camera: straight-on frontal perspective or slightly elevated.`,
      `Background: PURE FLAT WHITE (#FFFFFF). NO gradient, NO vignette, NO shadow beneath the object.`,
      `This is NOT: 3D render, infographic, or product photography with shadows.`
    ].join(' ');
    
    const seed = Math.floor(Math.random() * 1000000);
    const aiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptText)}?width=512&height=512&nologo=true&seed=${seed}`;
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      const response = await fetch(aiUrl, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) throw new Error('Image generation failed');
      const blob = await response.blob();
      
      return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const rawBase64 = reader.result;
          const img = new Image();
          img.crossOrigin = "Anonymous";
          img.onerror = reject;
          img.onload = () => {
            try {
              const canvas = document.createElement('canvas');
              const targetSize = 256;
              canvas.width = targetSize; canvas.height = targetSize;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, targetSize, targetSize);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            const w = canvas.width, h = canvas.height;
            let sumR = 0, sumG = 0, sumB = 0, cnt = 0;
            for (let x = 0; x < w; x++) {
              for (let row = 0; row < 3; row++) {
                const sp = row * w + x;
                sumR += data[sp*4]; sumG += data[sp*4+1]; sumB += data[sp*4+2]; cnt++;
              }
            }
            const bgR = Math.round(sumR / cnt), bgG = Math.round(sumG / cnt), bgB = Math.round(sumB / cnt);
            const stack = [];
            for (let x = 0; x < w; x++) { stack.push(x, x + (h - 1) * w); }
            for (let y = 0; y < h; y++) { stack.push(y * w, y * w + w - 1); }
            const visited = new Uint8Array(w * h);
            const tolerance = 45;
            while (stack.length > 0) {
              const p = stack.pop();
              if (visited[p]) continue;
              visited[p] = 1;
              const idx = p * 4;
              const r = data[idx], g = data[idx+1], b = data[idx+2];
              if (Math.abs(r - bgR) < tolerance && Math.abs(g - bgG) < tolerance && Math.abs(b - bgB) < tolerance) {
                data[idx+3] = 0; // Make transparent
                const x = p % w, y = Math.floor(p / w);
                if (x > 0) stack.push(p - 1);
                if (x < w - 1) stack.push(p + 1);
                if (y > 0) stack.push(p - w);
                if (y < h - 1) stack.push(p + w);
              }
            }
            ctx.putImageData(imageData, 0, 0);
            resolve(canvas.toDataURL('image/webp', 0.8));
          } catch(e) {
            reject(e);
          }
        };
        img.src = rawBase64;
      };
      reader.onerror = reject;
    });
    } catch (error) {
      console.warn("Pollinations AI failed or timed out, using fallback SVG.", error);
      const cleanLabel = newTitle.replace(/[^a-zA-Z0-9 ]/g, '').substring(0, 20);
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" viewBox="0 0 250 250"><rect width="250" height="250" rx="30" fill="%23E8E4D9" stroke="%23c4bbb0" stroke-width="4"/><text x="125" y="125" font-family="Inter, sans-serif" font-size="24" font-weight="600" fill="%235e5a52" text-anchor="middle" dominant-baseline="middle">${encodeURIComponent(cleanLabel)}</text></svg>`;
    }
  }

  // Generate custom object using AI via pollinations.ai
  async generateCustomObject(userLabel) {
    const overlay = document.getElementById('generation-overlay');
    const submitBtn = document.getElementById('add-obj-submit-btn');
    const formInput = document.getElementById('new-obj-name');
    
    // Show loading overlay
    if (overlay) overlay.classList.remove('hidden');
    const loadingText = document.getElementById('generation-overlay-text');
    if (loadingText) loadingText.textContent = "Please wait...";
    
    if (submitBtn) submitBtn.disabled = true;
    if (formInput) formInput.disabled = true;
    
    try {
      const finalUrl = await this.fetchOrGenerateImage(userLabel);
      
      const newId = `obj-${Date.now()}`;
      const centerX = this.pendingPlacementX || 1500;
      const centerY = this.pendingPlacementY || 1000;
      
      const newObject = {
        id: newId,
        title: userLabel.charAt(0).toUpperCase() + userLabel.slice(1),
        userLabel: userLabel.trim(),
        memoriesCount: 0,
        x: centerX,
        y: centerY,
        category: 'Generated',
        about: 'Archive Object.',
        stats: { "Category": "Generated", "Acquired": "AI/Asset", "Origin": "Citizen Request" },
        svg: finalUrl, 
        memories: [],
        isNew: true
      };
      
      this.objects.push(newObject);
      this.saveState();
      this.renderCanvasObjects();
      this.addObjectForm.reset();
      this.pendingNewObjectId = newId;
      
      const displayLabel = userLabel.trim();
      
      setTimeout(() => {
        const firstInput = document.getElementById('mem2-text');
        if (firstInput) firstInput.focus();
      }, 420);
      
      if (overlay) overlay.classList.add('hidden');
      if (submitBtn) submitBtn.disabled = false;
      if (formInput) formInput.disabled = false;
      
      this.closeModal(this.addObjectModal, true, true);
      setTimeout(() => {
        if (this.memoryPromptCard) {
          this.memoryPromptCard.classList.remove('hidden');
          this.memoryPromptCard.offsetHeight;
          this.memoryPromptCard.classList.add('active');
        }
      }, 1200);
      
    } catch (err) {
      console.error("Generation error:", err);
      if (this.addObjectError) {
        this.addObjectError.classList.remove('hidden');
        this.addObjectError.innerHTML = `<strong>Error.</strong> Failed to fetch or generate object: ${err.message || err.toString()}`;
      }
      if (overlay) overlay.classList.add('hidden-modal');
      if (submitBtn) submitBtn.disabled = false;
      if (formInput) formInput.disabled = false;
    }
  }

  // --- EVENTS BINDER ---
  bindEvents() {
    this.bindMediaSelectors();
    
    const cancelAddObjectFlow = () => {
      if (!this.addObjectModal.classList.contains('hidden-modal')) {
        this.closeModal(this.addObjectModal);
      }
    };

    // --- Canvas Panning (Mouse Drag) ---
    this.viewport.addEventListener('mousedown', (e) => {
      // Ignore drags initiating on floating boxes
      if (e.target.closest('.floating-panel') || e.target.closest('#side-drawer') || e.target.closest('.bottom-panel')) return;
      
      // Block navigation if an object is being placed and awaiting memory input
      if (this.pendingNewObjectId) return;
      
      cancelAddObjectFlow();
      
      // Dismiss intro overlay if active
      if (this.introOverlay && this.introOverlay.classList.contains('intro-active')) {
        this.introOverlay.classList.remove('intro-active');
        this.introOverlay.classList.add('intro-dismissed');
        setTimeout(() => {
          this.introOverlay.style.display = 'none';
        }, 800);
      }
      
      this.isDragging = true;
      this.canvasSurface.classList.add('grabbing');
      
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.startPanX = this.panX;
      this.startPanY = this.panY;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      
      const dx = e.clientX - this.startX;
      const dy = e.clientY - this.startY;
      
      this.panX = this.startPanX + dx;
      this.panY = this.startPanY + dy;
      
      this.applyTransform(false); // Extreme raw 60fps pan updates
    });

    window.addEventListener('mouseup', () => {
      if (this.isDragging) {
        this.isDragging = false;
        this.canvasSurface.classList.remove('grabbing');
      }
    });

    // --- Canvas Panning (Touch Support) ---
    let touchStartDist = 0;
    let touchStartScale = 1.0;

    this.viewport.addEventListener('touchstart', (e) => {
      if (e.target.closest('.floating-panel') || e.target.closest('#side-drawer') || e.target.closest('.bottom-panel')) return;
      
      // Block navigation if an object is being placed and awaiting memory input
      if (this.pendingNewObjectId) return;
      
      cancelAddObjectFlow();
      
      // Dismiss intro overlay if active
      if (this.introOverlay && this.introOverlay.classList.contains('intro-active')) {
        this.introOverlay.classList.remove('intro-active');
        this.introOverlay.classList.add('intro-dismissed');
        setTimeout(() => {
          this.introOverlay.style.display = 'none';
        }, 800);
      }
      
      if (e.touches.length === 1) {
        // Single finger pan
        this.isDragging = true;
        this.startX = e.touches[0].clientX;
        this.startY = e.touches[0].clientY;
        this.startPanX = this.panX;
        this.startPanY = this.panY;
      } else if (e.touches.length === 2) {
        // Pinch to Zoom
        this.isDragging = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        touchStartDist = Math.hypot(dx, dy);
        touchStartScale = this.zoomScale;
      }
    });

    this.viewport.addEventListener('touchmove', (e) => {
      if (this.isDragging && e.touches.length === 1) {
        const dx = e.touches[0].clientX - this.startX;
        const dy = e.touches[0].clientY - this.startY;
        this.panX = this.startPanX + dx;
        this.panY = this.startPanY + dy;
        this.applyTransform(false);
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        const factor = dist / touchStartDist;
        
        // Pinch center point
        const pivotX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const pivotY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        
        const rect = this.viewport.getBoundingClientRect();
        const localPivotX = pivotX - rect.left;
        const localPivotY = pivotY - rect.top;
        
        this.zoomAtPivot(localPivotX, localPivotY, factor / (this.zoomScale / touchStartScale));
        touchStartDist = dist;
        touchStartScale = this.zoomScale;
      }
    });

    this.viewport.addEventListener('touchend', () => {
      this.isDragging = false;
    });

    // --- Canvas Zoom (Mousewheel centered on cursor) ---
    this.viewport.addEventListener('wheel', (e) => {
      e.preventDefault();
      
      // Block navigation if an object is being placed and awaiting memory input
      if (this.pendingNewObjectId) return;
      
      cancelAddObjectFlow();
      
      const factor = e.deltaY < 0 ? 1.08 : 0.92;
      
      // Pivot coordinates relative to viewport bounds
      const rect = this.viewport.getBoundingClientRect();
      const pivotX = e.clientX - rect.left;
      const pivotY = e.clientY - rect.top;
      
      this.zoomAtPivot(pivotX, pivotY, factor);
    }, { passive: false });

    // --- Memories Canvas Panning & Zooming ---
    this.memoriesViewport.addEventListener('mousedown', (e) => {
      // Ensure we're not interfering with inputs or buttons
      if (e.target.tagName.toLowerCase() === 'button' || e.target.tagName.toLowerCase() === 'input') return;

      this.isMemDragging = true;
      
      this.memStartX = e.clientX;
      this.memStartY = e.clientY;
      this.memStartPanX = this.memPanX;
      this.memStartPanY = this.memPanY;
      e.stopPropagation();
    });

    this.memoriesViewport.addEventListener('mousemove', (e) => {
      if (!this.isMemDragging) return;
      
      const dx = e.clientX - this.memStartX;
      const dy = e.clientY - this.memStartY;
      
      this.memPanX = this.memStartPanX + dx;
      this.memPanY = this.memStartPanY + dy;
      
      this.applyMemTransform();
      e.stopPropagation();
    });

    window.addEventListener('mouseup', () => {
      if (this.isMemDragging) {
        this.isMemDragging = false;
      }
    });

    this.memoriesViewport.addEventListener('wheel', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const factor = e.deltaY < 0 ? 1.08 : 0.92;
      const rect = this.memoriesViewport.getBoundingClientRect();
      const pivotX = e.clientX - rect.left;
      const pivotY = e.clientY - rect.top;
      
      this.zoomMemAtPivot(pivotX, pivotY, factor);
    }, { passive: false });

    // --- Search input binding ---
    this.searchInput.addEventListener('input', (e) => {
      this.filterObjects(e.target.value);
    });

    this.clearSearchBtn?.addEventListener('click', () => {
      this.searchInput.value = '';
      this.filterObjects('');
    });

    // --- Drawer Toggles & Tabs ---
    this.drawerCloseBtn.addEventListener('click', () => this.closeDrawer());
    this.drawerBackdrop.addEventListener('click', () => this.closeDrawer());
    
    // --- Drawer Resizer Drag Logic ---
    if (this.drawerResizer) {
      let isDraggingResizer = false;
      this.drawerResizer.addEventListener('mousedown', (e) => {
        isDraggingResizer = true;
        document.body.classList.add('drawer-dragging');
        e.preventDefault(); // Prevent text selection
      });
      
      document.addEventListener('mousemove', (e) => {
        if (!isDraggingResizer) return;
        
        // Calculate new drawer width
        const minWidth = 400;
        const maxWidth = window.innerWidth - 300; // Leave 300px for object
        let newWidth = window.innerWidth - e.clientX;
        
        // Clamp width
        if (newWidth < minWidth) newWidth = minWidth;
        if (newWidth > maxWidth) newWidth = maxWidth;
        
        this.sideDrawer.style.width = `${newWidth}px`;
        
        // Pan the camera dynamically to keep the active object visible
        if (this.activeObjectId) {
          const activeObj = this.objects.find(o => o.id === this.activeObjectId);
          if (activeObj) {
            // Formula: object screen pos = remainingSpace / 2 = (innerWidth - newWidth) / 2
            // this.panX = S - obj.x * scale => targetX = obj.x + (newWidth / 2) / scale
            const targetX = activeObj.x + (newWidth / 2) / this.zoomScale;
            this.centerCameraOn(targetX, activeObj.y, this.zoomScale);
          }
        }
      });
      
      document.addEventListener('mouseup', () => {
        if (isDraggingResizer) {
          isDraggingResizer = false;
          document.body.classList.remove('drawer-dragging');
        }
      });
    }
    
    this.tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        
        // Tab Headers toggles
        this.tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Tab Content pages toggles
        this.tabContents.forEach(c => c.classList.remove('active-content'));
        const activeContent = document.getElementById(`tab-content-${targetTab}`);
        if (activeContent) activeContent.classList.add('active-content');
        
        this.activeTab = targetTab;
      });
    });

    // --- Floating Zoom Navigation triggers ---
    this.zoomInBtn.addEventListener('click', () => {
      // Zoom from screen center coordinates
      const cx = this.viewport.clientWidth / 2;
      const cy = this.viewport.clientHeight / 2;
      this.zoomAtPivot(cx, cy, 1.25);
    });

    this.zoomOutBtn.addEventListener('click', () => {
      const cx = this.viewport.clientWidth / 2;
      const cy = this.viewport.clientHeight / 2;
      this.zoomAtPivot(cx, cy, 0.8);
    });

    this.zoomResetBtn.addEventListener('click', () => {
      this.initCanvasCenter();
    });

    // --- Add Object Modals binds ---
    this.addObjectTrigger.addEventListener('click', () => {
      const handleOpenObjectModal = () => {
        if (this.addObjectError) {
          this.addObjectError.classList.add('hidden');
          this.addObjectError.innerHTML = '';
        }
        
        // Calculate and reserve placement coordinates before the modal opens
        let centerX, centerY;
        if (this.objects.length === 0) {
          centerX = 1500;
          centerY = 1000;
        } else {
          const MIN_DISTANCE = 180;
          let placed = false;
          let radius = MIN_DISTANCE;
          let angle = Math.random() * Math.PI * 2; // Random starting angle to prevent uniform lines
          
          // Outward spiraling packing algorithm to ensure dense clustering from the center
          while (!placed && radius < 2000) {
            const tempX = 1500 + Math.cos(angle) * radius;
            const tempY = 1000 + Math.sin(angle) * radius;
            
            let hasClash = false;
            for (const obj of this.objects) {
              const dx = obj.x - tempX;
              const dy = obj.y - tempY;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < MIN_DISTANCE) {
                hasClash = true;
                break;
              }
            }
            
            if (!hasClash && tempX > 150 && tempX < 2850 && tempY > 150 && tempY < 1850) {
              centerX = tempX;
              centerY = tempY;
              placed = true;
            }
            
            // Spiral outward: slowly rotate and push the radius outwards
            angle += 0.5; // Rotate by ~28 degrees
            radius += 10; // Slowly increase radius to pack tightly
          }
          
          if (!placed) {
            centerX = 150 + Math.random() * 2700;
            centerY = 150 + Math.random() * 1700;
          }
        }
        
        this.pendingPlacementX = centerX;
        this.pendingPlacementY = centerY;
        
        // Pan camera slowly to the reserved spot to prepare for the falling object
        // If zoom is below 75%, smoothly zoom in to 75%. If already above 75%, keep current zoom.
        const targetZoom = Math.max(this.zoomScale, 0.75);
        
        this.canvasSurface.classList.add('canvas-placement-transition');
        this.centerCameraOn(centerX, centerY, targetZoom);
        
        setTimeout(() => {
          this.canvasSurface.classList.remove('canvas-placement-transition');
        }, 1500);

        this.openModal(this.addObjectModal);
      };

      if (!this.currentUser) {
        this.openAuthModal(() => handleOpenObjectModal());
        return;
      }
      handleOpenObjectModal();
    });

    // Event delegation on error suggestions for premium prefill UX
    if (this.addObjectError) {
      this.addObjectError.addEventListener('click', (e) => {
        const tag = e.target.closest('.suggestion-tag');
        if (tag) {
          const inputField = document.getElementById('new-obj-name');
          if (inputField) {
            inputField.value = tag.textContent;
            inputField.focus();
            this.addObjectError.classList.add('hidden');
            this.addObjectError.innerHTML = '';
          }
        }
      });
    }

    // Close Modals on click of X or backdrop click
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = e.target.closest('.bottom-panel, .side-panel');
        if (modal) this.closeModal(modal);
      });
    });

    this.modalBackdrop.addEventListener('click', () => {
      document.querySelectorAll('.bottom-panel, .side-panel').forEach(modal => {
        if (!modal.classList.contains('hidden-modal')) {
          this.closeModal(modal);
        }
      });
    });

    // Enter to Submit for textareas (Shift+Enter for new line)
    ['mem2-text', 'mem-text', 'edit-text-input'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const form = e.target.closest('form');
            if (form) form.requestSubmit();
          }
        });
      }
    });

    // Form Submissions
    // 1. Submit Add Object Form
    this.addObjectForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('new-obj-name');
      const name = nameInput ? nameInput.value : '';
      
      // Perform case-insensitive, typo-tolerant search and matching
      const query = name.toLowerCase().trim().replace(/[^a-z0-9\s]/g, '');
      if (!query) return;
      
      // Handle "Reset" command to clear all objects from the canvas
      if (query === 'reset') {
        this.objects = [];
        this.saveState();
        this.renderCanvasObjects();
        this.addObjectForm.reset();
        this.closeModal(this.addObjectModal);
        
        // Clear any validation error
        if (this.addObjectError) {
          this.addObjectError.classList.add('hidden');
          this.addObjectError.innerHTML = '';
        }
        
        // Reset camera to center
        setTimeout(() => {
          this.initCanvasCenter();
        }, 500);
        
        return;
      }
      
      // Handle "Populate" command to auto-generate mock objects and memories
      if (query === 'populate') {
        const mockUsers = ["Kamal", "Nuwan", "Priya", "Ashan", "Malani", "Tharindu", "Saman", "Devmika", "Sanduni", "Roshan"];
        const mockTexts = [
          "I remember waiting in line for 14 hours just to get this.",
          "We had to share this with our neighbors.",
          "This became the most valuable thing in our house during the blackouts.",
          "I still keep this as a reminder of those tough times.",
          "We couldn't find this anywhere for weeks.",
          "A stranger gave this to me when we were desperate.",
          "Looking at this brings back a lot of anxiety, but also pride in how we survived.",
          "We had to ration this carefully every single day.",
          "It felt like the whole country was searching for this at the same time."
        ];
        
        this.objects = [];
        
        // Target 25 objects
        for (let i = 0; i < 25; i++) {
          const template = INITIAL_OBJECTS[i % INITIAL_OBJECTS.length];
          const memoryCount = Math.floor(Math.random() * 5) + 1; // 1 to 5
          const objMemories = [];
          
          for (let m = 0; m < memoryCount; m++) {
            const author = mockUsers[Math.floor(Math.random() * mockUsers.length)];
            const text = mockTexts[Math.floor(Math.random() * mockTexts.length)];
            objMemories.push({
              id: `mem-${Date.now()}-${i}-${m}`,
              author: author,
              actualAuthor: author,
              location: ["Colombo", "Kandy", "Galle", "Matara", "Negombo"][Math.floor(Math.random() * 5)],
              date: "2022",
              text: text,
              likes: Math.floor(Math.random() * 15),
              timeAgo: Math.floor(Math.random() * 30) + ' days ago'
            });
          }
          
          // Calculate placement using the outward spiraling packing algorithm
          let centerX, centerY;
          if (this.objects.length === 0) {
            centerX = 1500;
            centerY = 1000;
          } else {
            const MIN_DISTANCE = 180;
            let placed = false;
            let radius = MIN_DISTANCE;
            let angle = Math.random() * Math.PI * 2;
            
            while (!placed && radius < 2000) {
              const tempX = 1500 + Math.cos(angle) * radius;
              const tempY = 1000 + Math.sin(angle) * radius;
              
              let hasClash = false;
              for (const existing of this.objects) {
                const dx = existing.x - tempX;
                const dy = existing.y - tempY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MIN_DISTANCE) {
                  hasClash = true;
                  break;
                }
              }
              
              if (!hasClash && tempX > 150 && tempX < 2850 && tempY > 150 && tempY < 1850) {
                centerX = tempX;
                centerY = tempY;
                placed = true;
              }
              
              angle += 0.5;
              radius += 10;
            }
            
            if (!placed) {
              centerX = 150 + Math.random() * 2700;
              centerY = 150 + Math.random() * 1700;
            }
          }
          
          this.objects.push({
            id: `obj-${Date.now()}-${i}`,
            title: template.title,
            userLabel: template.title,
            memoriesCount: objMemories.length,
            x: centerX,
            y: centerY,
            category: template.category,
            about: template.about,
            stats: JSON.parse(JSON.stringify(template.stats || [])),
            svg: template.svg,
            memories: objMemories,
            isNew: false
          });
        }
        
        this.saveState();
        this.renderCanvasObjects();
        this.addObjectForm.reset();
        this.closeModal(this.addObjectModal);
        
        if (this.addObjectError) {
          this.addObjectError.classList.add('hidden');
          this.addObjectError.innerHTML = '';
        }
        
        setTimeout(() => {
          this.initCanvasCenter();
        }, 500);
        
        return;
      }
      
      let matchedTemplate = null;
      
      // First pass: Exact match or exact normalized match on title or keywords
      for (const mapping of ASSET_MAPPINGS) {
        const template = INITIAL_OBJECTS.find(o => o.id === mapping.id);
        if (!template) continue;
        
        const cleanTitle = template.title.toLowerCase().trim().replace(/[^a-z0-9\s]/g, '');
        if (cleanTitle === query || template.id === query) {
          matchedTemplate = template;
          break;
        }
        
        // Exact match with any keyword
        if (mapping.keywords.some(kw => kw.toLowerCase().trim().replace(/[^a-z0-9\s]/g, '') === query)) {
          matchedTemplate = template;
          break;
        }
      }
      
      // Second pass: Substring match if no exact match was found
      if (!matchedTemplate) {
        for (const mapping of ASSET_MAPPINGS) {
          const template = INITIAL_OBJECTS.find(o => o.id === mapping.id);
          if (!template) continue;
          
          const cleanTitle = template.title.toLowerCase().trim().replace(/[^a-z0-9\s]/g, '');
          if (cleanTitle.includes(query) || query.includes(cleanTitle)) {
            matchedTemplate = template;
            break;
          }
          
          // Check if any keyword is in the query, or query is in any keyword
          if (mapping.keywords.some(kw => {
            const cleanKw = kw.toLowerCase().trim().replace(/[^a-z0-9\s]/g, '');
            return cleanKw.includes(query) || query.includes(cleanKw);
          })) {
            matchedTemplate = template;
            break;
          }
        }
      }
      
      // Fallback Flow: generate custom object using AI if not recognized in archive
      if (!matchedTemplate) {
        // Clear any previous error
        if (this.addObjectError) {
          this.addObjectError.classList.add('hidden');
          this.addObjectError.innerHTML = '';
        }
        // Call AI Generation Flow
        this.generateCustomObject(name);
        return;
      }
      
      // Clear any validation error
      if (this.addObjectError) {
        this.addObjectError.classList.add('hidden');
        this.addObjectError.innerHTML = '';
      }
      
      // Generate ID
      const newId = `custom-${matchedTemplate.id}-${Date.now()}`;
      
      // Use pre-calculated placement coordinates
      const centerX = this.pendingPlacementX || 1500;
      const centerY = this.pendingPlacementY || 1000;
      
      // Deep clone matched template object state, placing it at the centered coordinates
      const newObject = {
        id: newId,
        title: matchedTemplate.title,
        userLabel: name.trim(),          // The exact name the user typed
        actualAuthor: this.currentUser,
        memoriesCount: matchedTemplate.memories.length,
        x: centerX,
        y: centerY,
        category: matchedTemplate.category,
        about: matchedTemplate.about,
        stats: JSON.parse(JSON.stringify(matchedTemplate.stats)),
        svg: matchedTemplate.svg,
        memories: JSON.parse(JSON.stringify(matchedTemplate.memories)),
        isNew: true
      };
      
      // Insert to State and Save
      this.objects.push(newObject);
      this.saveState();
      
      // Render the object on canvas
      this.renderCanvasObjects();
      
      // Clean step 1 form fields
      this.addObjectForm.reset();
      
      // Store pending object id for step 2
      this.pendingNewObjectId = newId;
      
      this.closeModal(this.addObjectModal, true, true);
      
      setTimeout(() => {
        if (this.memoryPromptCard) {
          this.memoryPromptCard.classList.remove('hidden');
          this.memoryPromptCard.offsetHeight;
          this.memoryPromptCard.classList.add('active');
          setTimeout(() => {
            const firstInput = document.getElementById('mem2-text');
            if (firstInput) firstInput.focus();
          }, 420);
        }
      }, 1200);
    });

    // 2. Submit Inline Memory Form (Step 2 of Add Object)
    this.addMemoryInlineForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const textInput = document.getElementById('mem2-text');
      const mediaTypeInput = document.getElementById('mem2-media-type');
      if (!textInput || !textInput.value.trim() || !this.pendingNewObjectId) return;
      
      const newMemory = {
        id: `mem-${Date.now()}`,
        author: this.isAnonymous ? "Anonymous" : this.currentUser,
        actualAuthor: this.currentUser,
        location: "Unknown", 
        date: "2026",
        text: textInput.value.trim(),
        type: mediaTypeInput ? mediaTypeInput.value : 'text',
        likes: 0,
        timeAgo: 'Just now'
      };
      
      const targetObj = this.objects.find(o => o.id === this.pendingNewObjectId);
      if (targetObj) {
        targetObj.memories.unshift(newMemory);
        targetObj.memoriesCount = targetObj.memories.length;
        this.saveState();
        this.renderCanvasObjects();
      }
      
      this.addMemoryInlineForm.reset();
      this.pendingNewObjectId = null;
      if (this.memoryPromptCard) {
        this.memoryPromptCard.classList.remove('active');
        setTimeout(() => this.memoryPromptCard.classList.add('hidden'), 350);
      }
      if (this.floatingCalloutCard) {
        setTimeout(() => {
          this.floatingCalloutCard.classList.remove('hidden-callout');
        }, 1000);
      }
    });

    // Step 2: Skip memory
    this.skipMemoryBtn.addEventListener('click', () => {
      this.addMemoryInlineForm.reset();
      this.pendingNewObjectId = null;
      if (this.memoryPromptCard) {
        this.memoryPromptCard.classList.remove('active');
        setTimeout(() => this.memoryPromptCard.classList.add('hidden'), 350);
      }
      if (this.floatingCalloutCard) {
        setTimeout(() => {
          this.floatingCalloutCard.classList.remove('hidden-callout');
        }, 1000);
      }
    });

    if (this.memoryPromptCloseBtn) {
      this.memoryPromptCloseBtn.addEventListener('click', () => {
        this.addMemoryInlineForm.reset();
        this.pendingNewObjectId = null;
        if (this.memoryPromptCard) {
          this.memoryPromptCard.classList.remove('active');
          setTimeout(() => this.memoryPromptCard.classList.add('hidden'), 350);
        }
        if (this.floatingCalloutCard) {
          setTimeout(() => {
            this.floatingCalloutCard.classList.remove('hidden-callout');
          }, 1000);
        }
      });
    }

    // --- Add Memory Trigger ---
    this.addMemoryTrigger.addEventListener('click', () => {
      const handleOpenMemory = () => {
        const activeObj = this.objects.find(o => o.id === this.activeObjectId);
        if (!activeObj) return;
        
        // Toggle inline card states
        document.getElementById('drawer-memory-cta-state').classList.add('hidden');
        document.getElementById('drawer-memory-form-state').classList.remove('hidden');
        
        this.addMemoryForm.reset();
      };

      if (!this.currentUser) {
        this.openAuthModal(() => handleOpenMemory());
        return;
      }
      handleOpenMemory();
    });
    
    // Cancel button for inline memory form
    document.getElementById('drawer-memory-cancel-btn').addEventListener('click', () => {
      document.getElementById('drawer-memory-form-state').classList.add('hidden');
      document.getElementById('drawer-memory-cta-state').classList.remove('hidden');
      this.addMemoryForm.reset();
    });

    // 3. Submit Add Memory Modal Form
    this.addMemoryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const activeObj = this.objects.find(o => o.id === this.activeObjectId);
      if (!activeObj) return;
      
      const text = document.getElementById('mem-text').value;
      const mediaTypeInput = document.getElementById('mem-media-type');
      
      const displayName = this.isAnonymous ? "Anonymous" : this.currentUser;

      const newMemory = {
        id: `mem-${this.activeObjectId}-${Date.now()}`,
        author: displayName,
        actualAuthor: this.currentUser,
        text: text,
        type: mediaTypeInput ? mediaTypeInput.value : 'text',
        likes: 0,
        timeAgo: "Just now"
      };
      
      // Append memory, update numbers
      activeObj.memories.unshift(newMemory); // Pushes at top of feed!
      activeObj.memoriesCount = activeObj.memories.length;
      
      this.saveState();
      
      // Re-render components
      this.renderCanvasObjects();
      this.renderDrawerTabsContent(activeObj);
      
      // Highlight card active state
      const card = document.getElementById(`card-${activeObj.id}`);
      if (card) card.classList.add('active-object');
      
      // Clean and close
      this.addMemoryForm.reset();
      // Switch back to CTA state instead of closing modal
      document.getElementById('drawer-memory-form-state').classList.add('hidden');
      document.getElementById('drawer-memory-cta-state').classList.remove('hidden');
    });

    // Close drawer on escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (!this.addObjectModal.classList.contains('hidden-modal')) {
          this.closeModal(this.addObjectModal);
          // No longer needed
        } else if (document.getElementById('drawer-memory-form-state') && !document.getElementById('drawer-memory-form-state').classList.contains('hidden')) {
          document.getElementById('drawer-memory-form-state').classList.add('hidden');
          document.getElementById('drawer-memory-cta-state').classList.remove('hidden');
        } else if (this.activeObjectId) {
          this.closeDrawer();
        }
      }
    });

    // Handle window resizing
    window.addEventListener('resize', () => {
      // Re-render camera translation so zoom boundaries don't snap
      this.applyTransform(false);
    });
  }
}

// --- BOOTSTRAP APP ---
document.addEventListener('DOMContentLoaded', () => {
  window.app = new AppEngine();
});

