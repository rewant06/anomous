// import jwt from 'jsonwebtoken';
// import { NextApiRequest } from 'next';

// const SECRET = process.env.JWT_SECRET!; // Replace with a secure secret key

// export function verifyToken(req: NextApiRequest) {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return null;

//   try {
//     return jwt.verify(token, SECRET);
//   } catch {
//     return null;
//   }
// }

// export function verifyAdmin(req: NextApiRequest) {
//   const user = verifyToken(req);
//   return user?.role === 'admin' ? user : null;
// }

import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest } from 'next';

const SECRET = process.env.JWT_SECRET!; // Ensure this is set in your .env file

export function verifyToken(req: NextApiRequest) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, SECRET) as JwtPayload; // Explicitly cast to JwtPayload
    return decoded;
  } catch {
    return null;
  }
}

export function verifyAdmin(req: NextApiRequest) {
  const user = verifyToken(req);
  // Safely access the role property
  return user && typeof user === 'object' && user.role === 'admin' ? user : null;
}