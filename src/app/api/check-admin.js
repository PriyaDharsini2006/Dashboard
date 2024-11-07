// // /pages/api/check-admin.js

// import { pool } from '../../lib/db'; // Import your DB connection

// export default async function handler(req, res) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }

//   const { email } = req.query;

//   if (!email) {
//     return res.status(400).json({ message: 'Email is required' });
//   }

//   try {
//     const result = await pool.query('SELECT * FROM Admin WHERE email = $1', [email]);

//     if (result.rows.length > 0) {
//       return res.status(200).json({ isAdmin: true });
//     } else {
//       return res.status(200).json({ isAdmin: false });
//     }
//   } catch (error) {
//     console.error('Error checking admin status:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// }
// /pages/api/check-admin.js
// pages/api/check-admin.js
import prisma from '../../lib/prisma';  // Assuming prisma is set up correctly

export default async function handler(req, res) {
  const { email } = req.query;

  if (req.method === 'GET' && email) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (user && user.role === 'admin') {
        return res.status(200).json({ isAdmin: true });
      }

      return res.status(200).json({ isAdmin: false });
    } catch (error) {
      console.error('Error fetching admin status:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(400).json({ error: 'Bad request' });
}
