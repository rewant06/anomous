import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { verifyToken, verifyAdmin } from '../../../../utils/auth';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;

      // Validate user or admin authentication
      const user = verifyToken(req);
      const admin = verifyAdmin(req);

      if (!user && !admin) return res.status(401).json({ error: 'Unauthorized' });

      // Check if the post belongs to the user (if not admin)
      const post = await prisma.post.findUnique({ where: { id: id as string } });
      if (!admin && post?.authorId !== user?.id) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      // Delete the post
      await prisma.post.delete({ where: { id: id as string } });

      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error('Error deleting post:', error); // Log the error
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}