import { APIErrors } from "@/types/APIErrors";
import jwt from "jsonwebtoken";

function login(username: string, password: string) {
  if (!username || !password) {
    throw new APIErrors.BadRequestError('Missing username or password');
  }
  if (!process.env.JWT_SECRET) {
    throw new Error("missing JWT secret");
  }
  const token = jwt.sign(username, process.env.JWT_SECRET);
  return token;
}
  
function verifyToken(token: string) {
  if (!token) {
    return false;
  }
  if (!process.env.JWT_SECRET) {
    throw new Error("missing JWT secret");
  }
  return jwt.verify(token, process.env.JWT_SECRET);
}

export const authService = { login, verifyToken };