import type { NextApiRequest, NextApiResponse } from 'next';
import { createPostInDB } from '@/services/post.service';
import requireAuth from '@/middleware/requireAuth';
import { APIErrors } from '@/types/APIErrors';

const createPost = requireAuth(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.user?.id) {
      throw new APIErrors.InternalError();
    }
    const id = await createPostInDB(req.body, req.user.id);
    res.json({ id });
  }
);

export default async function getPosts(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return createPost(req, res);
  }
}
