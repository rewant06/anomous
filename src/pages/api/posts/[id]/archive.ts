import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../../../utils/auth';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    try {
      const { id } = req.query;

      // Validate user authentication
      const user = verifyToken(req);
      if (!user) return res.status(401).json({ error: 'Unauthorized' });

      // Check if the post belongs to the user
      const post = await prisma.post.findUnique({ where: { id: id as string } });
      if (post?.authorId !== user.id) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      // Archive the post
      const archivedPost = await prisma.post.update({
        where: { id: id as string },
        data: {
          status: 'ARCHIVED',
          archivedAt: new Date(),
        },
      });

      res.status(200).json(archivedPost);
    } catch (error) {
    console.error('Error archiving post:', error); // Log the error
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}