import logger from "@/utils/logger";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";

export default function handleError(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (error) {
      logger.error(error);
      if (error instanceof ApiError) {
        res.status(error.statusCode).end(error.message);
      } else {
        res.status(500).end("Internal error");
      }
    }
  };
}