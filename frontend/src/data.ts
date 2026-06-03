import { Product, DigitalProgram, Athlete, TransformationStory } from './types';

// High-End Premium Hardcore products
export const PRODUCTS: Product[] = [
  {
    id: 'h1',
    name: 'IRONCLAD BILLET BARBELL (20KG)',
    price: 349,
    originalPrice: 399,
    type: 'Hardware',
    goal: 'Muscle Gain',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    ratingCount: 142,
    isLimitedBatch: true,
    isAthleteApproved: true,
    isLimitedEdition: false,
    stockCount: 8,
    description: 'Forged from high-tensile US industrial billet steel. Features aggressive diamond knurling, defensive black zinc coating, and heavy-duty needle bearings that spin effortlessly under maximum biomechanical distress.',
    weights: ['20 kg', '15 kg'],
    colors: ['Obsidian Black', 'Raw Silver Coating'],
    features: [
      '200,000 PSI Tensile Strength',
      'Dual knurl marks for powerlifting/weightlifting',
      'Ultra-grippy 1.2mm diamond texture',
      'Engineered in Detroit'
    ]
  },
  {
    id: 'h2',
    name: 'APEX CARBON TACTICAL WEIGHTED VEST (20KG)',
    price: 189,
    type: 'Hardware',
    goal: 'Endurance',
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    ratingCount: 89,
    isLimitedBatch: false,
    isAthleteApproved: true,
    isLimitedEdition: true,
    stockCount: 14,
    description: 'Constructed from aerospace-grade 1000D Cordura ballistic nylon. Dual clamp fasteners on shoulder panels prevent shifting during high-intensity metabolic bursts. Comes standard with laser-cut heavy steel alloy weights.',
    sizes: ['Standard Adjust', 'XL Chest Frame'],
    colors: ['Stealth Obsidian', 'Desert Concrete'],
    features: [
      'Adjustable increments of 0.5kg to 20kg',
      'Double stitched reinforced industrial straps',
      'Integrated military MOLLE storage loop system',
      'Sweat venting airmesh internal pads'
    ]
  },
  {
    id: 'h3',
    name: 'RAW CONCRETE GRIP KETTLEBELLS (SET OF 3)',
    price: 159,
    originalPrice: 199,
    type: 'Hardware',
    goal: 'Fat Loss',
    image: 'https://images.pexels.com/photos/3888342/pexels-photo-3888342.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    ratingCount: 65,
    isLimitedBatch: true,
    isAthleteApproved: false,
    isLimitedEdition: false,
    stockCount: 19,
    description: 'Barded-iron composition textured in premium volcanic concrete dust enamel. Yields a non-slip, raw exterior that feels aggressive on performance sets, ensuring zero rotation under maximum moisture.',
    weights: ['Set: 12kg/16kg/24kg', 'Heavy: 16kg/24kg/32kg'],
    features: [
      'Gravity-molded single-cast core',
      'Volcanic powder grip texture integration',
      'Flat floor anti-wobble security base'
    ]
  },
  {
    id: 'a1',
    name: 'THERMO-COMPRESSION SENSOR TANK',
    price: 54,
    type: 'Apparel',
    goal: 'Muscle Gain',
    image: 'https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    ratingCount: 204,
    isLimitedBatch: false,
    isAthleteApproved: true,
    isLimitedEdition: false,
    stockCount: 42,
    description: 'A ultra-dense thermo-regulating muscle-binding skin. Designed to withstand abrasive contact with barbell bar knurling while channeling metabolic body heat forward to prolong muscular pump retention.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Carbon Blackout', 'Neon Blaze Orange', 'Titanium Crystalline'],
    features: [
      '60% Knurling-Defiant elastomeric nylon',
      'Aero-vent thermal compression matrices',
      'Industrial flatlock raw seam stitching'
    ]
  },
  {
    id: 'a2',
    name: 'HEAVY CHALK-ABSORBING LIFT SHORTS',
    price: 64,
    type: 'Apparel',
    goal: 'Endurance',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop',
    rating: 4.6,
    ratingCount: 110,
    isLimitedBatch: false,
    isAthleteApproved: false,
    isLimitedEdition: true,
    stockCount: 23,
    description: 'Specialty high-grain fiber panels embedded at outer hip regions to retain gym chalk for quick palm-gripping. Made from dynamic multi-stretch micro-mesh for zero lateral drag during deep Olympic squats.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Obsidian Shroud', 'Concrete Gray'],
    features: [
      'Integrated hip-chalk capture panels',
      'Ripstop military fiber gusseted groin',
      'Double braided interior security laces'
    ]
  },
  {
    id: 'a3',
    name: 'OBSIDIAN REINFORCED HEAVY HOODIE',
    price: 119,
    originalPrice: 129,
    type: 'Apparel',
    goal: 'Muscle Gain',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    ratingCount: 312,
    isLimitedBatch: true,
    isAthleteApproved: true,
    isLimitedEdition: false,
    stockCount: 5,
    description: 'Weighing in at an extreme 520 GSM loopback organic cotton. Outfitted with heavy armored overlay panels across the collarbones and sleeves to absorb barbell impact during quick clean catches.',
    sizes: ['M', 'L', 'XL', 'XXL'],
    features: [
      '520 GSM Double-Weave dense cotton core',
      'Abrasion-resistant shoulder plates',
      'Hidden key/card water-sealed pocket'
    ]
  },
  {
    id: 's1',
    name: 'HYPER-DRIVE PRE-WORKOUT (NITRIC BLAST)',
    price: 69,
    type: 'Supplements',
    goal: 'Fat Loss',
    image: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    ratingCount: 187,
    isLimitedBatch: false,
    isAthleteApproved: true,
    isLimitedEdition: false,
    stockCount: 120,
    description: 'An aggressive neurological stimulation matrix. High-dose Beta-Alanine, Alpha-GPC, and premium L-Citrulline combined with intense mental-drive thermogenics to crack plateaus and trigger vascular output.',
    features: [
      '8000mg Pure L-Citrulline Malate for atomic volume',
      '400mg Multi-Stage Kinetic Caffeine release',
      'Zero sugars, zero synthetic dyes, zero fillers',
      'Obsidian-Sour Lime performance formulation'
    ]
  },
  {
    id: 's2',
    name: 'ISO-WHEY ANABOLIC ISOLATE (MILK DARK CHOCO)',
    price: 84,
    type: 'Supplements',
    goal: 'Muscle Gain',
    image: 'https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    ratingCount: 450,
    isLimitedBatch: false,
    isAthleteApproved: true,
    isLimitedEdition: false,
    stockCount: 88,
    description: 'Cold-filtered, cross-flow micro-filtrated Whey Protein Isolate with rapid absorption kinetic ratios. Spiked with active enzymes to trigger immediate nitrogen protein assimilation inside damaged muscle micro-tears.',
    weights: ['2 lbs (900g)', '5 lbs (2.2kg)'],
    features: [
      '27g Pure Protein per scoop',
      '6.2g bioavailable BCAAs for cellular recovery',
      'No recovery-bloating lactose residues',
      '100% Raw Cocoa Dutch Powder rich flavor'
    ]
  }
];

// Digital downloadable blueprints
export const DIGITAL_PROGRAMS: DigitalProgram[] = [
  {
    id: 'p1',
    name: 'THE HYPERTROPHY PROJECT',
    price: 49,
    duration: '12 Weeks',
    goal: 'Muscle Gain',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop',
    rating: 4.95,
    difficulty: 'Elite Hardcore',
    description: 'Designed exclusively to force skeletal muscular system adaptions. Leverages scientific mechanical tension loading, localized metabolic acidosis protocols, and strictly calculated eccentric timing brackets.',
    curriculumSneakPeek: [
      'Myofibrillar Load Structuring & Frequency Overload (Book 1)',
      'Intra-Workout Intracellular Osmotic Pump Feeding Schemes',
      'Neurological CNS Recalibration Cycles for High Frequency Heavy Lifting'
    ],
    instructorId: 'ath1'
  },
  {
    id: 'p2',
    name: 'SHRED PROTOCOL: METABOLIC SEIZURE',
    price: 39,
    duration: '8 Weeks',
    goal: 'Fat Loss',
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=800&auto=format&fit=crop',
    rating: 4.88,
    difficulty: 'Advanced',
    description: 'A non-compromised fat mobilization plan designed for peak vascular emergence. Focuses on depleted glycogen weightlifting parameters, staggered metabolic output, and aggressive fasting cycles.',
    curriculumSneakPeek: [
      'Strategic Glycogen Depletion Force Sets',
      'High-Output Non-Exercise Activity Thermogenesis (NEAT) Blueprints',
      'The Carbon-Fasting Insulin Spiker System'
    ],
    instructorId: 'ath2'
  },
  {
    id: 'p3',
    name: 'CARBON BREATHING METABOLIC SYSTEM',
    price: 35,
    duration: '6 Weeks',
    goal: 'Endurance',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800&auto=format&fit=crop',
    rating: 4.79,
    difficulty: 'Elite Hardcore',
    description: 'Expels structural exhaustion from high-performance athletes by restructuring the oxygen-delivery cycle under high lactate concentrations. Increases VO2 max ceiling by rewriting physical posture mechanics.',
    curriculumSneakPeek: [
      'Intercostal Muscle Expansion Exercises',
      'The 4-Second Carbon Reflector Breathing Cadence',
      'Lactate Threshold Adaptation Workouts'
    ],
    instructorId: 'ath3'
  }
];

// Elite Athlete/Coach endorsers
export const ATHLETES: Athlete[] = [
  {
    id: 'ath1',
    name: 'MARCUS "THE ANVIL" VARGAS',
    role: 'Elite IFBB Pro Coach & Strength Engineer',
    bio: 'Former heavy armor operator turned pro powerlifter. Marcus advises Olympians on biomechanics, using maximum density skeletal stress to forge unbreakable physiques.',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=500&auto=format&fit=crop',
    favoriteProductIds: ['h1', 's2', 'a3'],
    quote: "You don't buy progress here. You build it on knurled raw steel and sweat, or you get crushed."
  },
  {
    id: 'ath2',
    name: 'DR. ELENA CHEN',
    role: 'PhD Sports Science & Human Performance Lead',
    bio: 'Renowned exercise bio-chemist specializing in lactic acid adaptation. Elena formulated our Obsidian Supplement series and designed metabolic protocols for tactical teams.',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=500&auto=format&fit=crop',
    favoriteProductIds: ['s1', 'h2'],
    quote: "Neurological threshold expansion separates the amateurs from the true biomechanical killers."
  },
  {
    id: 'ath3',
    name: 'TYRONE "THE STORM" HARRIS',
    role: 'Elite CrossFit Games Finalist & Hybrid Conditioning Coach',
    bio: 'Two-time national weightlifting runner-up. Tyrone tests the boundaries of physical capacity, demanding absolute performance from outerwear during intense conditioning blocks.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&auto=format&fit=crop',
    favoriteProductIds: ['h2', 'a1', 'a2'],
    quote: "Comfort is an illusion. We design this gear to survive the deep dark state when your lungs are screaming."
  }
];

// Member Transformations & Reviews (Social Proof / The Brotherhood)
export const TRANSFORMATIONS: TransformationStory[] = [
  {
    id: 't1',
    name: 'David G.',
    age: 34,
    achievement: 'Gained 14 lbs of Dense Lean Mass',
    story: 'Following the 12-week Hypertrophy Project with the IRONCLAD Barbell rebuilt my physique. The knurling on the bar is unmatched, providing high tactical stability that let me overload my bench and high squat sets securely.',
    beforeWeight: '172 lbs',
    afterWeight: '186 lbs',
    timeframe: '12 Weeks',
    imageBefore: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=400&auto=format&fit=crop', // conceptual rep
    imageAfter: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop',
    pinnedProductIds: ['h1', 'p1', 's2'],
    isVerifiedBuyer: true
  },
  {
    id: 't2',
    name: 'Sarah K.',
    age: 28,
    achievement: 'Dropped 4% Body Fat & Doubled Strength Endurance',
    story: 'The Carbon Weighted Vest transforms basic metabolic sessions into total sensory overloads. I used it for sandbag carries and track sprint sequences while consuming the Nitric Blast pre-workout.',
    beforeWeight: '145 lbs',
    afterWeight: '138 lbs',
    timeframe: '8 Weeks',
    imageBefore: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=400&auto=format&fit=crop',
    imageAfter: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=400&auto=format&fit=crop',
    pinnedProductIds: ['h2', 's1', 'p2'],
    isVerifiedBuyer: true
  },
  {
    id: 't3',
    name: 'Viktor M.',
    age: 41,
    achievement: 'Vanquished Back Dysfunction, Added 80 lbs to Deadlift',
    story: 'I paired the Heavy Gym Hooded Jacket with Marcus Vargas advise. The dense weight of the hoodie keeps my shoulders warm during high cold garage sessions. Phenomenal build, worth every dollar.',
    beforeWeight: '215 lbs',
    afterWeight: '220 lbs',
    timeframe: '6 months',
    imageBefore: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    imageAfter: 'https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?q=80&w=400&auto=format&fit=crop',
    pinnedProductIds: ['a3', 'h1'],
    isVerifiedBuyer: true
  }
];
