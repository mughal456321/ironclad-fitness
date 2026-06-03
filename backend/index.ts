import express from 'express';
import cors from 'cors';
import { initDb, seedDb } from './db';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

async function startServer() {
  const db = await initDb();
  await seedDb(db);

  // GET Products
  app.get('/api/products', async (req, res) => {
    const products = await db.all('SELECT * FROM products');
    // Parse JSON strings back to arrays
    const parsedProducts = products.map(p => ({
      ...p,
      isLimitedBatch: !!p.isLimitedBatch,
      isAthleteApproved: !!p.isAthleteApproved,
      isLimitedEdition: !!p.isLimitedEdition,
      sizes: p.sizes ? JSON.parse(p.sizes) : undefined,
      weights: p.weights ? JSON.parse(p.weights) : undefined,
      colors: p.colors ? JSON.parse(p.colors) : undefined,
      features: JSON.parse(p.features)
    }));
    res.json(parsedProducts);
  });

  // GET Programs
  app.get('/api/programs', async (req, res) => {
    const programs = await db.all('SELECT * FROM programs');
    const parsedPrograms = programs.map(p => ({
      ...p,
      curriculumSneakPeek: JSON.parse(p.curriculumSneakPeek)
    }));
    res.json(parsedPrograms);
  });

  // GET User Data (Default user)
  app.get('/api/user', async (req, res) => {
    const email = 'garrison.shroud@ironclad-elite.com';
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get Unlocked Programs
    const unlocked = await db.all('SELECT programId FROM unlocked_programs WHERE userEmail = ?', [email]);
    const unlockedPrograms = unlocked.map(u => u.programId);

    // Get Orders
    const orders = await db.all('SELECT * FROM orders WHERE userEmail = ? ORDER BY date DESC', [email]);
    for (const order of orders) {
      const items = await db.all('SELECT * FROM order_items WHERE orderId = ?', [order.id]);
      order.items = items;
    }

    res.json({
      ...user,
      unlockedPrograms,
      orders
    });
  });

  // POST Create Order
  app.post('/api/orders', async (req, res) => {
    const { order, email, earnedPoints, purchasedProgramIds } = req.body;
    
    try {
      // 1. Save Order
      await db.run(`
        INSERT INTO orders (id, userEmail, date, total, status, trackingNumber, ironPointsEarned)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [order.id, email, order.date, order.total, order.status, order.trackingNumber, earnedPoints]);

      // 2. Save Order Items
      for (const item of order.items) {
        await db.run(`
          INSERT INTO order_items (orderId, name, price, quantity, image, type)
          VALUES (?, ?, ?, ?, ?, ?)
        `, [order.id, item.name, item.price, item.quantity, item.image, item.type]);
      }

      // 3. Update User Points
      await db.run('UPDATE users SET ironPoints = ironPoints + ? WHERE email = ?', [earnedPoints, email]);

      // 4. Unlock Programs
      for (const pId of purchasedProgramIds) {
        await db.run(`
          INSERT OR IGNORE INTO unlocked_programs (userEmail, programId)
          VALUES (?, ?)
        `, [email, pId]);
      }

      res.status(201).json({ success: true });
    } catch (error) {
      console.error('Order creation error:', error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  });

  // POST Update User Profile (or create new user on activation)
  app.post('/api/user/update', async (req, res) => {
    const { name, email } = req.body;

    try {
      const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);

      if (!existingUser) {
        // New user activation — insert fresh record with 0 points
        await db.run('INSERT INTO users (email, name, ironPoints) VALUES (?, ?, 0)', [email, name]);
      } else {
        // Reactivation — reset points to 0 for fresh start
        await db.run('UPDATE users SET name = ?, ironPoints = 0 WHERE email = ?', [name, email]);
        // Clear prior orders and unlocked programs
        await db.run('DELETE FROM order_items WHERE orderId IN (SELECT id FROM orders WHERE userEmail = ?)', [email]);
        await db.run('DELETE FROM orders WHERE userEmail = ?', [email]);
        await db.run('DELETE FROM unlocked_programs WHERE userEmail = ?', [email]);
      }

      // Return updated/new user
      const updatedUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found after update' });
      }

      const unlocked = await db.all('SELECT programId FROM unlocked_programs WHERE userEmail = ?', [email]);
      const orders = await db.all('SELECT * FROM orders WHERE userEmail = ? ORDER BY date DESC', [email]);
      for (const order of orders) {
        const items = await db.all('SELECT * FROM order_items WHERE orderId = ?', [order.id]);
        order.items = items;
      }

      res.json({
        ...updatedUser,
        unlockedPrograms: unlocked.map(u => u.programId),
        orders
      });
    } catch (error) {
      console.error('User update error:', error);
      res.status(500).json({ error: 'Failed to update user profile' });
    }
  });

  // POST Claim Digital Blueprint with Points
  app.post('/api/user/claim-program', async (req, res) => {
    const { email, programId, pointCost } = req.body;

    try {
      const user = await db.get('SELECT ironPoints FROM users WHERE email = ?', [email]);
      if (!user || user.ironPoints < pointCost) {
        return res.status(400).json({ error: 'Insufficient points' });
      }

      // Deduct points
      await db.run('UPDATE users SET ironPoints = ironPoints - ? WHERE email = ?', [pointCost, email]);

      // Unlock program
      await db.run(`
        INSERT OR IGNORE INTO unlocked_programs (userEmail, programId)
        VALUES (?, ?)
      `, [email, programId]);

      res.json({ success: true });
    } catch (error) {
      console.error('Claim program error:', error);
      res.status(500).json({ error: 'Failed to claim program' });
    }
  });

  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });
}

startServer();
