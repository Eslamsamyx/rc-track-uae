const STYLE_BASE =
  "Editorial motorsport photograph, professional quality, cinematic lighting, sharp focus, premium feel. Brand palette uses Racing Blue (#0B2447) for deep architectural surfaces and Track Orange (#F26B1F) for accents, curbs, race numbers, and signage. Setting is the United Arab Emirates: Dubai or Abu Dhabi skyline cues are welcome but secondary. Hyper-detailed RC racing track that looks like a real, small-scale racing venue (not a toy floor): painted asphalt, scaled curbs, scaled cones, scaled tyre walls. RC cars are 1:10 or 1:8 scale with realistic livery. Modern, diverse UAE residents in the scene where people are present, dressed neatly and casually. NO text, NO captions, NO logos overlaid on the image. NO em dashes. Wide cinematic composition.";

const STYLE_PRODUCT =
  "Studio product photograph, top-down 3/4 angle, on a soft gradient background of cool grey and racing blue. Even diffused softbox lighting, sharp focus across the whole product, no harsh reflections, no clutter, no text, no watermarks, no shadows on text labels. Centered subject. Square crop ratio 1:1.";

const STYLE_GALLERY =
  "Documentary motorsport photograph in the RC Track UAE venue. Candid moment, authentic emotion, race-night atmosphere. Editorial color grading with deep blues and warm orange highlights from track lighting. Sharp main subject, soft background. NO text overlays.";

const STYLE_BLOG =
  "Editorial magazine cover photograph for a motorsport blog. 16:9 cinematic crop. Composition leaves room on the upper left for a headline (do not include text). Color grade with cool blues and warm orange highlights, premium magazine feel.";

const STYLE_EVENT =
  "Event poster style motorsport photograph, 16:9 cinematic, dramatic lighting, race-night atmosphere. Negative space at the top for headline overlay (do not include text). Brand colors: deep racing blue, vivid track orange, checkered accents.";

export const HERO_PROMPTS = [
  {
    id: "hero-home",
    aspect: "16:9",
    out: "hero/home.png",
    prompt: `${STYLE_BASE} Wide aerial three-quarter view of a sweeping RC racing circuit at golden hour, Dubai skyline at the horizon. Two 1:10 touring cars are mid-corner, motion blur trailing the wheels. Bright track-orange and racing-blue checkered curbs frame the asphalt. Soft lens flare from the setting sun. Composition leaves space on the upper third for future text overlay.`,
  },
  {
    id: "hero-about",
    aspect: "16:9",
    out: "hero/about.png",
    prompt: `${STYLE_BASE} Indoor scene inside an RC racing venue paddock at dusk. A diverse team of four people in branded racing-blue team shirts work on RC cars at a clean white workbench: a young Emirati man, a smiling Filipino woman, a South Asian father with his son, and a senior coach holding a clipboard. Pit-lane lighting overhead, soft warm fill from below, racing trophies on a shelf in the background.`,
  },
  {
    id: "hero-tracks",
    aspect: "16:9",
    out: "hero/tracks.png",
    prompt: `${STYLE_BASE} Top-down aerial view of two adjacent RC racing tracks: the technical city layout with tight hairpins on the left, and the high-speed village layout with a long straight and triple-jump on the right. Painted asphalt, racing-blue racing lines, track-orange curbs and rumble strips. Visible LED timing gantry between the two tracks. Late-afternoon UAE light.`,
  },
  {
    id: "track-city",
    aspect: "16:9",
    out: "hero/track-city.png",
    prompt: `${STYLE_BASE} Aerial drone perspective of the technical RC city track at twilight. Tight infield, two hairpins, an off-camber sweeper. 1:10 touring cars run in formation, headlights on, race numbers visible. Dubai skyline silhouette in the distance. Saturated racing blue and track orange checkered curbs.`,
  },
  {
    id: "track-village",
    aspect: "16:9",
    out: "hero/track-village.png",
    prompt: `${STYLE_BASE} Wide low-angle shot of the high-speed Village RC track at sunset. A 1:8 buggy launches off a triple-jump mid-frame, dust kicked up by the rear wheels. A long straight stretches to a wide carousel in the background. Track-orange skirts on the jumps, racing-blue branding on barriers. Golden-hour light.`,
  },
  {
    id: "hero-trial",
    aspect: "16:9",
    out: "hero/trial.png",
    prompt: `${STYLE_BASE} Close-up over-the-shoulder view of a confident Emirati girl about 9 years old wearing a small race helmet, controller in hand, eyes locked on a 1:10 RC touring car ahead. A friendly marshal in a track-orange polo coaches her from behind. Track-orange checkered curbs visible. Warm late-afternoon light.`,
  },
  {
    id: "hero-open-practice",
    aspect: "16:9",
    out: "hero/open-practice.png",
    prompt: `${STYLE_BASE} Wide shot of an empty RC track on a quiet evening, a lone serious adult driver, mid 30s, focused, racing his own carbon-chassis touring car on the city layout. Pit-lane lights cast warm pools, race timing screen glows in the distance. Single car on the track, atmospheric and meditative.`,
  },
  {
    id: "hero-birthday",
    aspect: "16:9",
    out: "hero/birthday.png",
    prompt: `${STYLE_BASE} Vibrant birthday party scene at the RC venue. Eight to ten kids of mixed UAE background aged 7 to 12 cheer at the podium where the birthday child (a Filipino boy with a paper crown) holds up a small trophy. Track-orange and racing-blue balloons, custom race-number signs on the wall, a long banquet table with a checkered tablecloth in the foreground. Cake on the table, no faces obscured.`,
  },
  {
    id: "hero-corporate",
    aspect: "16:9",
    out: "hero/corporate.png",
    prompt: `${STYLE_BASE} Corporate team-building event at the RC venue. Twelve professionals in smart-casual office wear, diverse Gulf workforce, ages 25 to 45, cheering around the pit-lane. Two team captains hold trophies, a tall man in a branded racing-blue polo announces the result. Catering setup blurred in the background, branded race-numbers on the wall.`,
  },
  {
    id: "hero-schools",
    aspect: "16:9",
    out: "hero/schools.png",
    prompt: `${STYLE_BASE} Classroom-like scene inside the venue's STEM lab. Eight students aged 10 to 14 in school uniforms (girls and boys, mixed UAE backgrounds, some in hijab) assemble 1:10 RC cars on white workbenches with magnifying lamps. A young female engineer in a branded racing-blue polo guides one team. Schematic on the whiteboard, books and tools tidy.`,
  },
  {
    id: "hero-tourist",
    aspect: "16:9",
    out: "hero/tourist.png",
    prompt: `${STYLE_BASE} Tourists on the podium with the iconic UAE skyline visible behind. A European couple in their 30s and an Indian family of four hold small trophies, smiling, with the venue host (Emirati man in kandura with a racing-blue scarf) handing over a certificate. Track-orange podium, racing-blue carpet, golden-hour sun. Realistic, joyful.`,
  },
  {
    id: "hero-memberships",
    aspect: "16:9",
    out: "hero/memberships.png",
    prompt: `${STYLE_BASE} Premium members lounge inside the RC venue. Floor-to-ceiling windows overlook the lit track at night. Three members chat over coffee at a leather banquette: an Emirati man in a thobe, a British expat woman in race-team apparel, and a Lebanese father with his teen son. Track-orange Eames-style stools at the bar, racing-blue accents, championship trophies behind glass.`,
  },
  {
    id: "hero-academy",
    aspect: "16:9",
    out: "hero/academy.png",
    prompt: `${STYLE_BASE} Coached academy session at the venue, late afternoon. Coach Layla, a confident Lebanese woman in her 30s in racing-blue team kit, kneels beside a young academy student (Indian boy, 11) to adjust his RC car between heats. Three more students wait at the start line in the background. Pit garage doors open. Late-afternoon UAE light.`,
  },
  {
    id: "hero-booking",
    aspect: "16:9",
    out: "hero/booking.png",
    prompt: `${STYLE_BASE} Eye-level view of the venue's bright reception desk: a Filipino host in a branded shirt smiles at the camera while a family checks in. A wall behind shows the live race schedule on a large screen. Soft natural light from a skylight, race trophies on the side shelf, comfortable atmosphere.`,
  },
  {
    id: "hero-contact",
    aspect: "16:9",
    out: "hero/contact.png",
    prompt: `${STYLE_BASE} Behind-the-scenes shot of two friendly venue staff (a Lebanese woman in her 20s and an Indian man in his 30s, both wearing racing-blue branded polos) at the help desk answering a WhatsApp chat on tablets. Phone, coffee cup, headset, and a small RC car displayed on the counter. Warm office lighting, modern and welcoming.`,
  },
];

export const PRODUCT_PROMPTS = [
  {
    id: "stampede-4x4",
    aspect: "1:1",
    out: "products/stampede-4x4.png",
    prompt: `${STYLE_PRODUCT} The product is a Traxxas Stampede 4x4 VXL monster truck, scale 1:10, finished in a bold orange and blue body shell with the team logo "RC TRACK UAE" subtly visible on the side (no readable text). Aggressive tread tyres, white wheels, raised suspension. The car is shot from a low-angle three-quarter view to emphasise stance.`,
  },
  {
    id: "xray-t4",
    aspect: "1:1",
    out: "products/xray-t4.png",
    prompt: `${STYLE_PRODUCT} The product is an XRAY T4 2024 RC touring car KIT laid out on the soft surface: carbon-fiber chassis, alloy hubs, suspension parts, ball-bearing kit, and an orange parts tray. Top-down view, clean parts spread out like a flat-lay, with the assembled chassis at the center of frame.`,
  },
  {
    id: "quicrun-1080",
    aspect: "1:1",
    out: "products/quicrun-1080.png",
    prompt: `${STYLE_PRODUCT} The product is a Hobbywing QuicRun 1080 brushed ESC: small black aluminum heatsink unit with cooling fan, three colored wires (red, black, yellow) coming out one end, a sensor port and a programming card connector. Top-down 3/4 view with a Mini gold race-cone next to it for scale.`,
  },
  {
    id: "trencher-tyres",
    aspect: "1:1",
    out: "products/trencher-tyres.png",
    prompt: `${STYLE_PRODUCT} The product is a pair of Pro-Line Trencher 1:10 RC tyres mounted on chrome rims. Aggressive deep tread for off-road. Studio shot, the two wheels stand upright next to each other on a soft grey surface, with a faint reflection.`,
  },
  {
    id: "much-more-vise",
    aspect: "1:1",
    out: "products/much-more-vise.png",
    prompt: `${STYLE_PRODUCT} The product is a Much More RC setup vise: a precision aluminium pit vise mounted on a heavy base, with adjustable jaws holding a small 1:10 RC car upside-down. The vise itself is the hero (the car is just dressing). Studio shot, 3/4 angle.`,
  },
  {
    id: "track-cap",
    aspect: "1:1",
    out: "products/track-cap.png",
    prompt: `${STYLE_PRODUCT} The product is a navy-blue snapback baseball cap with an embroidered orange checkered-flag patch on the front. Photographed at a 3/4 angle, structured front panel, flat brim, with a subtle "RC" monogram embroidered (kept as an abstract shape, not a readable word). Soft grey background.`,
  },
  {
    id: "tamiya-tt02",
    aspect: "1:1",
    out: "products/tamiya-tt02.png",
    prompt: `${STYLE_PRODUCT} The product is a Tamiya TT-02 1:10 RC car chassis kit: clear bodyshell, blue plastic suspension parts, white wheels, silver gearbox, all laid out in an orderly flat-lay. Cardboard kit box visible at the back of the frame slightly out of focus. Top-down view.`,
  },
  {
    id: "savox-1258tg",
    aspect: "1:1",
    out: "products/savox-1258tg.png",
    prompt: `${STYLE_PRODUCT} The product is a Savox SC-1258TG digital servo: small black aluminum-cased servo with titanium gear set visible through a cutaway in the marketing rendering. Two ribbon wires emerge from one end. Shot from a 3/4 angle at a slight tilt to show depth.`,
  },
  {
    id: "sweep-32r",
    aspect: "1:1",
    out: "products/sweep-32r.png",
    prompt: `${STYLE_PRODUCT} The product is a pair of foam pan-car tyres, soft pink-grey foam compound 32R for indoor RC racing, on white plastic wheels. The two wheels stand upright next to each other, top-down 3/4 view.`,
  },
  {
    id: "pit-tee",
    aspect: "1:1",
    out: "products/pit-tee.png",
    prompt: `${STYLE_PRODUCT} The product is a heavyweight navy cotton tee shirt laid flat. The front pocket has a small embroidered orange race-flag patch. The back panel (visible through a smaller inset photograph in the corner) shows a checkered race-flag print. Photographed from above, clean flat-lay.`,
  },
];

export const BLOG_PROMPTS = [
  {
    id: "blog-first-lap-tips",
    aspect: "16:9",
    out: "blog/first-lap-tips.png",
    prompt: `${STYLE_BLOG} Close-up shot from behind a child's perspective: small hands gripping an RC controller, an RC touring car blurred ahead going into a corner. Track-orange checkered curbing in the lower frame, racing-blue barrier behind. Late-afternoon shadows.`,
  },
  {
    id: "blog-budget-build",
    aspect: "16:9",
    out: "blog/budget-build.png",
    prompt: `${STYLE_BLOG} Workshop flat-lay: a partially assembled 1:10 RC touring car chassis surrounded by tools, a brushless motor, a spool of orange wire, an ESC, a small coffee cup, and a notebook with a pencil. Top-down view, warm tungsten lighting, premium magazine flat-lay quality.`,
  },
  {
    id: "blog-academy-graduation",
    aspect: "16:9",
    out: "blog/academy-graduation.png",
    prompt: `${STYLE_BLOG} Twelve academy graduates lined up on the racing track holding small trophies, wearing matching racing-blue team shirts. The coach (Lebanese woman with curly hair, mid 30s, in branded kit) stands at the center. Bright daytime, track-orange podium step in the background.`,
  },
  {
    id: "blog-tyres-uae-heat",
    aspect: "16:9",
    out: "blog/tyres-uae-heat.png",
    prompt: `${STYLE_BLOG} Macro close-up of an RC tyre with visible compound markings, sitting on hot asphalt with the slight shimmer of heat haze in the background. Track-orange curb visible at the edge of frame. Photographed in bright Gulf-summer light.`,
  },
];

export const EVENT_PROMPTS = [
  {
    id: "event-summer-night",
    aspect: "16:9",
    out: "events/summer-night.png",
    prompt: `${STYLE_EVENT} Night-time race scene at the venue with floodlights, multiple 1:10 cars on the grid lit by track-orange LED spotlights, audience silhouettes in the background. Aerial three-quarter angle. Dubai skyline distant. Cinematic, dramatic.`,
  },
  {
    id: "event-championship-r3",
    aspect: "16:9",
    out: "events/championship-r3.png",
    prompt: `${STYLE_EVENT} Trophy presentation moment: three drivers on a track-orange podium with their cars at their feet. Each holds a trophy. Racing-blue carpet, track-orange and silver trophies, sponsor banners (deliberately blurred so no text is readable). Bright stadium lighting from above.`,
  },
  {
    id: "event-traxxas-demo",
    aspect: "16:9",
    out: "events/traxxas-demo.png",
    prompt: `${STYLE_EVENT} Demo-day scene: a row of 1:8 buggies lined up on display tables under a marquee in racing-blue and track-orange livery, with a small crowd watching a demo car jump in the background. Sunny daytime atmosphere, premium expo feel.`,
  },
  {
    id: "event-academy-open-day",
    aspect: "16:9",
    out: "events/academy-open-day.png",
    prompt: `${STYLE_EVENT} Open-day welcome scene: a friendly coach kneels at eye-level with a curious 8-year-old girl, handing her a small RC controller, while other families look on encouragingly in the background. Bright daytime, track-orange "Welcome" arch visible.`,
  },
  {
    id: "event-winter-endurance",
    aspect: "16:9",
    out: "events/winter-endurance.png",
    prompt: `${STYLE_EVENT} Endurance race scene: a pit-lane tableau at dusk with a 4-person team (diverse) huddled around a car for a fast tyre change, mechanic gloves on, tools laid out, a digital lap-timer showing a long elapsed time in the background. Track-orange and racing-blue team livery.`,
  },
  {
    id: "event-open-race-night",
    aspect: "16:9",
    out: "events/open-race-night.png",
    prompt: `${STYLE_EVENT} Casual race-night crowd shot: drivers and friends standing at the trackside fence, controllers raised, smiling, cheering. Floodlights from above, motion blur on the cars sweeping past in the foreground. Friendly community vibe.`,
  },
];

export const GALLERY_PROMPTS = [
  {
    id: "gallery-podium-1",
    aspect: "1:1",
    out: "gallery/podium-1.png",
    prompt: `${STYLE_GALLERY} Three young winners on a small racing-blue podium step, each holding a small trophy, confetti mid-air. Track-orange checkered backdrop. Bright, joyful.`,
  },
  {
    id: "gallery-pitlane-1",
    aspect: "1:1",
    out: "gallery/pitlane-1.png",
    prompt: `${STYLE_GALLERY} Pit-lane wide shot: half a dozen RC cars on stands being worked on, a marshal walking through, tools and tyres on the benches. Warm working lights from above.`,
  },
  {
    id: "gallery-corner-1",
    aspect: "1:1",
    out: "gallery/corner-1.png",
    prompt: `${STYLE_GALLERY} Low-angle action shot through a fast right-hander, a 1:10 touring car at full lean, motion blur on the background. Track-orange curb in the foreground.`,
  },
  {
    id: "gallery-coach-1",
    aspect: "1:1",
    out: "gallery/coach-1.png",
    prompt: `${STYLE_GALLERY} Coach helping a young student adjust their RC car between heats, both intent, side-light from the pit overhead. Hands close-up, faces partially visible.`,
  },
  {
    id: "gallery-birthday-1",
    aspect: "1:1",
    out: "gallery/birthday-1.png",
    prompt: `${STYLE_GALLERY} Birthday boy holding a cake with sparklers, his racing friends around him cheering, party room behind. Track-orange race-flag decoration on the wall.`,
  },
  {
    id: "gallery-night-1",
    aspect: "1:1",
    out: "gallery/night-1.png",
    prompt: `${STYLE_GALLERY} Night race wide angle with multiple cars under floodlights, headlights blazing, motion trails on the wheels. Dubai-distant skyline as a soft silhouette.`,
  },
  {
    id: "gallery-corp-1",
    aspect: "1:1",
    out: "gallery/corp-1.png",
    prompt: `${STYLE_GALLERY} Corporate group cheering as their team-mate crosses the finish line. Smart-casual office wear, mixed Gulf workforce.`,
  },
  {
    id: "gallery-academy-1",
    aspect: "1:1",
    out: "gallery/academy-1.png",
    prompt: `${STYLE_GALLERY} Academy classroom moment: a student raises their hand while the instructor diagrams a racing line on a whiteboard. Soft natural daylight from a high window.`,
  },
  {
    id: "gallery-female-driver",
    aspect: "1:1",
    out: "gallery/female-driver.png",
    prompt: `${STYLE_GALLERY} Portrait of a confident female RC racer in racing-blue team kit, holding her controller, the track blurred behind her, late-afternoon sun lighting one side of her face.`,
  },
  {
    id: "gallery-jump-1",
    aspect: "1:1",
    out: "gallery/jump-1.png",
    prompt: `${STYLE_GALLERY} 1:8 buggy mid-air over the triple-jump, wheels spinning, suspension extended, dust kicked up. Action freeze-frame.`,
  },
  {
    id: "gallery-cars-line-1",
    aspect: "1:1",
    out: "gallery/cars-line-1.png",
    prompt: `${STYLE_GALLERY} Row of 1:10 race-prepped touring cars on a starting grid before launch, race numbers visible, each in a different livery, photographed in line.`,
  },
  {
    id: "gallery-marshal-1",
    aspect: "1:1",
    out: "gallery/marshal-1.png",
    prompt: `${STYLE_GALLERY} A marshal in a track-orange polo signals with a raised flag at trackside, focused face, race in motion behind. Dust haze.`,
  },
];

const STYLE_TEXTURE =
  "Editorial close-up product texture photograph. Macro detail, shallow depth of field, dramatic studio lighting. Brand palette: deep racing blue and vivid track orange. NO text, NO logos, NO captions. Composition allows the image to be used as a section background.";

const STYLE_PORTRAIT =
  "Studio headshot portrait, professional, friendly expression, clean off-white seamless backdrop with a subtle racing-blue gradient. Soft three-point lighting, gentle catch-light in the eyes, natural skin texture. No text, no logos.";

export const SECTION_PROMPTS = [
  {
    id: "section-paddock",
    aspect: "16:9",
    out: "sections/paddock.png",
    prompt: `${STYLE_BASE} Wide pan of a busy pit lane at the RC venue. Half a dozen 1:10 race cars on stands, mechanics adjusting setups, marshals walking behind, screens showing lap times in the distance. Strong directional warm pit-lane lighting, slight haze, depth of field. Composition leaves clean negative space on the right side.`,
  },
  {
    id: "section-controller-detail",
    aspect: "16:9",
    out: "sections/controller-detail.png",
    prompt: `${STYLE_TEXTURE} Hyper-detailed close-up of a modern RC pistol-grip controller in matte black with track-orange accents, held by a confident adult hand, finger on the trigger. Out-of-focus track lights bokeh in the background. Sharp focus on the trigger and dial. Cinematic moody lighting.`,
  },
  {
    id: "section-tyre-stack",
    aspect: "16:9",
    out: "sections/tyre-stack.png",
    prompt: `${STYLE_TEXTURE} Macro shot of a stack of scaled racing tyres in different compounds, freshly prepped with tyre warmers wrapped around. Light dust and tyre rubber bits. Deep blue background with one track-orange tyre warmer.`,
  },
  {
    id: "section-flag-checkered",
    aspect: "16:9",
    out: "sections/flag-checkered.png",
    prompt: `${STYLE_TEXTURE} Slightly out-of-focus checkered flag fabric in motion, dynamic folds, lit from behind so the black-and-white pattern glows. Dramatic depth. Composition works as a wide section background.`,
  },
  {
    id: "section-circuit-aerial",
    aspect: "16:9",
    out: "sections/circuit-aerial.png",
    prompt: `${STYLE_BASE} Top-down aerial illustration-style photograph of the RC racing circuit asphalt at night, painted racing-blue racing line, track-orange curbs, scaled cones, scaled tyre walls. Single car in mid-corner. Strong overhead lighting. Atmospheric.`,
  },
  {
    id: "section-suspension",
    aspect: "16:9",
    out: "sections/suspension.png",
    prompt: `${STYLE_TEXTURE} Hyper-detailed macro close-up of an RC car's front suspension, aluminum a-arms, coil-over shocks, carbon-fiber chassis edge, knurled adjusters. Cold blue rim light, warm orange key light. Studio-grade product clarity.`,
  },
  {
    id: "section-night-lights",
    aspect: "16:9",
    out: "sections/night-lights.png",
    prompt: `${STYLE_BASE} Ground-level wide of two 1:8 buggies streaking past at night under bright pit floodlights, long-exposure-style motion blur trailing the headlights and rear LED, the dust catching the orange backlight. Track edge in deep racing blue. Atmospheric.`,
  },
  {
    id: "section-finish-line",
    aspect: "16:9",
    out: "sections/finish-line.png",
    prompt: `${STYLE_BASE} Close-up low angle of a 1:10 touring car crossing a painted finish line on the asphalt, checkered pattern under the car, slight motion blur on the wheels, marshal flagging in the soft background. Late golden-hour sun.`,
  },
  {
    id: "section-trophy",
    aspect: "1:1",
    out: "sections/trophy.png",
    prompt: `${STYLE_TEXTURE} Studio photograph of a small racing trophy with checkered base, polished metal, a small RC car silhouette as the top piece. Cool blue rim light, warm orange key light, soft shadow.`,
  },
  {
    id: "section-confetti",
    aspect: "16:9",
    out: "sections/confetti.png",
    prompt: `${STYLE_BASE} Wide podium shot moment of victory: confetti mid-air over a young racer holding a trophy, both arms up, eyes closed in joy, two other finalists clapping behind. Track-orange podium step, racing-blue carpet, bright stage light.`,
  },
];

export const PORTRAIT_PROMPTS = [
  {
    id: "portrait-ahmed",
    aspect: "1:1",
    out: "portraits/ahmed.png",
    prompt: `${STYLE_PORTRAIT} Mid-30s Emirati man, short dark beard, warm friendly smile, white kandura, looking slightly off-camera. Photograph crop is shoulders-and-up.`,
  },
  {
    id: "portrait-sarah",
    aspect: "1:1",
    out: "portraits/sarah.png",
    prompt: `${STYLE_PORTRAIT} Late-20s British expat woman with long curly auburn hair, in a fitted racing-blue team polo, confident relaxed smile. Shoulders-and-up crop.`,
  },
  {
    id: "portrait-rahul",
    aspect: "1:1",
    out: "portraits/rahul.png",
    prompt: `${STYLE_PORTRAIT} Mid-40s South Asian father, salt-and-pepper hair, neat trimmed beard, smart casual collared shirt, gentle proud expression. Shoulders-and-up crop.`,
  },
  {
    id: "portrait-fatima",
    aspect: "1:1",
    out: "portraits/fatima.png",
    prompt: `${STYLE_PORTRAIT} Early-30s Emirati woman in a soft beige hijab and modest dark blazer, calm professional smile, looking directly at the camera. Shoulders-and-up crop.`,
  },
  {
    id: "portrait-marco",
    aspect: "1:1",
    out: "portraits/marco.png",
    prompt: `${STYLE_PORTRAIT} Mid-30s Italian expat man, dark short hair, light stubble, in a racing-blue team polo, big friendly smile, slight head tilt. Shoulders-and-up crop.`,
  },
  {
    id: "portrait-layla",
    aspect: "1:1",
    out: "portraits/layla.png",
    prompt: `${STYLE_PORTRAIT} Confident Lebanese woman in her 30s with shoulder-length dark hair, wearing a racing-blue team polo with a small embroidered checkered logo, warm grin. Shoulders-and-up crop.`,
  },
];

export const ALL_PROMPTS = [
  ...HERO_PROMPTS,
  ...PRODUCT_PROMPTS,
  ...BLOG_PROMPTS,
  ...EVENT_PROMPTS,
  ...GALLERY_PROMPTS,
  ...SECTION_PROMPTS,
  ...PORTRAIT_PROMPTS,
];
