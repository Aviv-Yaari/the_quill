import { NextApiRequest, NextApiResponse } from "next";
import requireAuth from "@/middleware/requireAuth";
import { APIErrors } from "@/types/APIErrors";

const verify = requireAuth(
  (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.user?.id) {
      throw new APIErrors.InternalError();
    }
    res.send(req.user);
  }
);

export default verify;