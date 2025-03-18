// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';
// import { verifyAdmin } from '../../../../utils/auth';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'PATCH') {
//     try {
//       const { id } = req.query;

//       // Validate admin authentication
//       const admin = verifyAdmin(req);
//       if (!admin) return res.status(401).json({ error: 'Unauthorized' });

//       // Approve the post
//       const post = await prisma.post.update({
//         where: { id: id as string },
//         data: {
//           status: 'APPROVED',
//           approvedById: admin.id,
//         },
//       });

//       res.status(200).json(post);
//     } catch (error) {
//       res.status(500).json({ error: 'Something went wrong' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// }

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { verifyAdmin } from '../../../../utils/auth';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    try {
      const { id } = req.query;

      // Validate admin authentication
      const admin = verifyAdmin(req);
      if (!admin) return res.status(401).json({ error: 'Unauthorized' });

      // Approve the post
      const post = await prisma.post.update({
        where: { id: id as string },
        data: {
          status: 'APPROVED',
          approvedById: admin.id,
        },
      });

      res.status(200).json(post);
    } catch (error) {
      console.error('Error approving post:', error); // Log the error
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}