import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

export async function initDb(): Promise<Database> {
  const db = await open({
    filename: path.join(process.cwd(), 'backend', 'ironclad.db'),
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      originalPrice REAL,
      type TEXT NOT NULL,
      goal TEXT NOT NULL,
      image TEXT NOT NULL,
      rating REAL NOT NULL,
      ratingCount INTEGER NOT NULL,
      isLimitedBatch BOOLEAN NOT NULL,
      isAthleteApproved BOOLEAN NOT NULL,
      isLimitedEdition BOOLEAN NOT NULL,
      stockCount INTEGER NOT NULL,
      description TEXT NOT NULL,
      sizes TEXT, -- JSON string array
      weights TEXT, -- JSON string array
      colors TEXT, -- JSON string array
      features TEXT -- JSON string array
    );

    CREATE TABLE IF NOT EXISTS programs (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      duration TEXT NOT NULL,
      goal TEXT NOT NULL,
      image TEXT NOT NULL,
      rating REAL NOT NULL,
      description TEXT NOT NULL,
      curriculumSneakPeek TEXT NOT NULL, -- JSON string array
      instructorId TEXT NOT NULL,
      difficulty TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS users (
      email TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      ironPoints INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      userEmail TEXT NOT NULL,
      date TEXT NOT NULL,
      total REAL NOT NULL,
      status TEXT NOT NULL,
      trackingNumber TEXT,
      ironPointsEarned INTEGER NOT NULL,
      FOREIGN KEY (userEmail) REFERENCES users(email)
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      orderId TEXT NOT NULL,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      quantity INTEGER NOT NULL,
      image TEXT NOT NULL,
      type TEXT NOT NULL,
      FOREIGN KEY (orderId) REFERENCES orders(id)
    );

    CREATE TABLE IF NOT EXISTS unlocked_programs (
      userEmail TEXT NOT NULL,
      programId TEXT NOT NULL,
      PRIMARY KEY (userEmail, programId),
      FOREIGN KEY (userEmail) REFERENCES users(email),
      FOREIGN KEY (programId) REFERENCES programs(id)
    );
  `);

  return db;
}

export async function seedDb(db: Database) {
  const productCount = await db.get('SELECT COUNT(*) as count FROM products');
  if (productCount.count === 0) {
    // Seed Products
    const products = [
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
        isLimitedBatch: 1,
        isAthleteApproved: 1,
        isLimitedEdition: 0,
        stockCount: 8,
        description: 'Forged from high-tensile US industrial billet steel. Features aggressive diamond knurling, defensive black zinc coating, and heavy-duty needle bearings that spin effortlessly under maximum biomechanical distress.',
        weights: JSON.stringify(['20 kg', '15 kg']),
        colors: JSON.stringify(['Obsidian Black', 'Raw Silver Coating']),
        features: JSON.stringify([
          '200,000 PSI Tensile Strength',
          'Dual knurl marks for powerlifting/weightlifting',
          'Ultra-grippy 1.2mm diamond texture',
          'Engineered in Detroit'
        ])
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
        isLimitedBatch: 0,
        isAthleteApproved: 1,
        isLimitedEdition: 1,
        stockCount: 14,
        description: 'Constructed from aerospace-grade 1000D Cordura ballistic nylon. Dual clamp fasteners on shoulder panels prevent shifting during high-intensity metabolic bursts. Comes standard with laser-cut heavy steel alloy weights.',
        sizes: JSON.stringify(['Standard Adjust', 'XL Chest Frame']),
        colors: JSON.stringify(['Stealth Obsidian', 'Desert Concrete']),
        features: JSON.stringify([
          'Adjustable increments of 0.5kg to 20kg',
          'Double stitched reinforced industrial straps',
          'Integrated military MOLLE storage loop system',
          'Sweat venting airmesh internal pads'
        ])
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
        isLimitedBatch: 1,
        isAthleteApproved: 0,
        isLimitedEdition: 0,
        stockCount: 19,
        description: 'Barded-iron composition textured in premium volcanic concrete dust enamel. Yields a non-slip, raw exterior that feels aggressive on performance sets, ensuring zero rotation under maximum moisture.',
        weights: JSON.stringify(['Set: 12kg/16kg/24kg', 'Heavy: 16kg/24kg/32kg']),
        features: JSON.stringify([
          'Gravity-molded single-cast core',
          'Volcanic powder grip texture integration',
          'Flat floor anti-wobble security base'
        ])
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
        isLimitedBatch: 0,
        isAthleteApproved: 1,
        isLimitedEdition: 0,
        stockCount: 42,
        description: 'A ultra-dense thermo-regulating muscle-binding skin. Designed to withstand abrasive contact with barbell bar knurling while channeling metabolic body heat forward to prolong muscular pump retention.',
        sizes: JSON.stringify(['S', 'M', 'L', 'XL', 'XXL']),
        colors: JSON.stringify(['Carbon Blackout', 'Neon Blaze Orange', 'Titanium Crystalline']),
        features: JSON.stringify([
          '60% Knurling-Defiant elastomeric nylon',
          'Aero-vent thermal compression matrices',
          'Industrial flatlock raw seam stitching'
        ])
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
        isLimitedBatch: 0,
        isAthleteApproved: 0,
        isLimitedEdition: 1,
        stockCount: 23,
        description: 'Specialty high-grain fiber panels embedded at outer hip regions to retain gym chalk for quick palm-gripping. Made from dynamic multi-stretch micro-mesh for zero lateral drag during deep Olympic squats.',
        sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
        colors: JSON.stringify(['Obsidian Shroud', 'Concrete Gray']),
        features: JSON.stringify([
          'Integrated hip-chalk capture panels',
          'Ripstop military fiber gusseted groin',
          'Double braided interior security laces'
        ])
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
        isLimitedBatch: 1,
        isAthleteApproved: 1,
        isLimitedEdition: 0,
        stockCount: 5,
        description: 'Weighing in at an extreme 520 GSM loopback organic cotton. Outfitted with heavy armored overlay panels across the collarbones and sleeves to absorb barbell impact during quick clean catches.',
        sizes: JSON.stringify(['M', 'L', 'XL', 'XXL']),
        features: JSON.stringify([
          '520 GSM Double-Weave dense cotton core',
          'Abrasion-resistant shoulder plates',
          'Hidden key/card water-sealed pocket'
        ])
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
        isLimitedBatch: 0,
        isAthleteApproved: 1,
        isLimitedEdition: 0,
        stockCount: 120,
        description: 'An aggressive neurological stimulation matrix. High-dose Beta-Alanine, Alpha-GPC, and premium L-Citrulline combined with intense mental-drive thermogenics to crack plateaus and trigger vascular output.',
        features: JSON.stringify([
          '8000mg Pure L-Citrulline Malate for atomic volume',
          '400mg Multi-Stage Kinetic Caffeine release',
          'Zero sugars, zero synthetic dyes, zero fillers',
          'Obsidian-Sour Lime performance formulation'
        ])
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
        isLimitedBatch: 0,
        isAthleteApproved: 1,
        isLimitedEdition: 0,
        stockCount: 88,
        description: 'Cold-filtered, cross-flow micro-filtrated Whey Protein Isolate with rapid absorption kinetic ratios. Spiked with active enzymes to trigger immediate nitrogen protein assimilation inside damaged muscle micro-tears.',
        weights: JSON.stringify(['2 lbs (900g)', '5 lbs (2.2kg)']),
        features: JSON.stringify([
          '27g Pure Protein per scoop',
          '6.2g bioavailable BCAAs for cellular recovery',
          'No recovery-bloating lactose residues',
          '100% Raw Cocoa Dutch Powder rich flavor'
        ])
      }
    ];

    for (const p of products) {
      await db.run(`
        INSERT INTO products (id, name, price, originalPrice, type, goal, image, rating, ratingCount, isLimitedBatch, isAthleteApproved, isLimitedEdition, stockCount, description, sizes, weights, colors, features)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [p.id, p.name, p.price, p.originalPrice, p.type, p.goal, p.image, p.rating, p.ratingCount, p.isLimitedBatch, p.isAthleteApproved, p.isLimitedEdition, p.stockCount, p.description, p.sizes, p.weights, p.colors, p.features]);
    }
  }

  const programCount = await db.get('SELECT COUNT(*) as count FROM programs');
  if (programCount.count === 0) {
    const programs = [
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
        curriculumSneakPeek: JSON.stringify([
          'Myofibrillar Load Structuring & Frequency Overload (Book 1)',
          'Intra-Workout Intracellular Osmotic Pump Feeding Schemes',
          'Neurological CNS Recalibration Cycles for High Frequency Heavy Lifting'
        ]),
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
        curriculumSneakPeek: JSON.stringify([
          'Strategic Glycogen Depletion Force Sets',
          'High-Output Non-Exercise Activity Thermogenesis (NEAT) Blueprints',
          'The Carbon-Fasting Insulin Spiker System'
        ]),
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
        curriculumSneakPeek: JSON.stringify([
          'Intercostal Muscle Expansion Exercises',
          'The 4-Second Carbon Reflector Breathing Cadence',
          'Lactate Threshold Adaptation Workouts'
        ]),
        instructorId: 'ath3'
      }
    ];

    for (const p of programs) {
      await db.run(`
        INSERT INTO programs (id, name, price, duration, goal, image, rating, description, curriculumSneakPeek, instructorId, difficulty)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [p.id, p.name, p.price, p.duration, p.goal, p.image, p.rating, p.description, p.curriculumSneakPeek, p.instructorId, p.difficulty]);
    }
  }

  const userCount = await db.get('SELECT COUNT(*) as count FROM users');
  if (userCount.count === 0) {
    const defaultUser = {
      email: 'garrison.shroud@ironclad-elite.com',
      name: 'GARRISON SHROUD',
      ironPoints: 850
    };

    await db.run(`
      INSERT INTO users (email, name, ironPoints)
      VALUES (?, ?, ?)
    `, [defaultUser.email, defaultUser.name, defaultUser.ironPoints]);

    // Seed Unlocked Programs
    await db.run(`
      INSERT INTO unlocked_programs (userEmail, programId)
      VALUES (?, ?)
    `, [defaultUser.email, 'p1']);

    // Seed Initial Orders
    const orders = [
      {
        id: "ORD-94821",
        date: "2026-05-12",
        total: 349,
        status: "Completed",
        trackingNumber: "TRK-US-89410382",
        ironPointsEarned: 350,
        items: [
          {
            name: "IRONCLAD BILLET BARBELL (20KG)",
            price: 349,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
            type: "physical"
          }
        ]
      },
      {
        id: "ORD-83021",
        date: "2026-04-03",
        total: 168,
        status: "Completed",
        trackingNumber: "TRK-US-77402102",
        ironPointsEarned: 160,
        items: [
          {
            name: "ISO-WHEY ANABOLIC ISOLATE (MILK DARK CHOCO)",
            price: 84,
            quantity: 2,
            image: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=800&auto=format&fit=crop",
            type: "physical"
          }
        ]
      }
    ];

    for (const ord of orders) {
      await db.run(`
        INSERT INTO orders (id, userEmail, date, total, status, trackingNumber, ironPointsEarned)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [ord.id, defaultUser.email, ord.date, ord.total, ord.status, ord.trackingNumber, ord.ironPointsEarned]);

      for (const item of ord.items) {
        await db.run(`
          INSERT INTO order_items (orderId, name, price, quantity, image, type)
          VALUES (?, ?, ?, ?, ?, ?)
        `, [ord.id, item.name, item.price, item.quantity, item.image, item.type]);
      }
    }
  }
}
