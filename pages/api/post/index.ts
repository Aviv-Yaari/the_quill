import type { NextApiRequest, NextApiResponse } from 'next';
import { createPostInDB } from '@/services/post.service';
import requireAuth from '@/middleware/requireAuth';
import cookie from 'cookie';
import { authService } from '@/services/auth.service';
import { APIErrors } from '@/types/APIErrors';

export default async function getPosts(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return requireAuth(createPost)(req, res);
  }
}

async function createPost(req: NextApiRequest, res: NextApiResponse) {
  const { token } = cookie.parse(req.headers.cookie || '');
  const loggedInUser = authService.verifyToken(token);
  if (!loggedInUser?.id) {
    throw new APIErrors.NotAuthenticatedError();
  }
  const id = await createPostInDB(req.body, loggedInUser.id);
  res.json({ id });
}
