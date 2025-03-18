import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../../utils/auth';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { title, content } = req.body;

      // Validate user authentication
      const user = verifyToken(req);
      if (!user) return res.status(401).json({ error: 'Unauthorized' });

      // Create a post
      const post = await prisma.post.create({
        data: {
          title,
          content,
          status: 'PENDING',
          authorId: user.id,
        },
      });

      res.status(201).json(post);
    } catch (error) {
        console.error('Error in posting:', error); // Log the error
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}