import { APIErrors } from "@/types/APIErrors";
import clientPromise from "@/utils/mongodb";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import UserModel from "@/types/models/user.model";
import { UserToken } from "@/types/User";

async function login(username: string, password: string) {
  if (!username || !password) {
    throw new APIErrors.BadRequestError('Missing username or password');
  }
  if (!process.env.JWT_SECRET) {
    throw new Error("missing JWT secret");
  }

  // check in the database:
  const client = await clientPromise;
  const db = client.db("main");

  const user = await db.collection('users').findOne({
    username
  }) as UserModel;

  if (!user) {
    throw new APIErrors.NotAuthenticatedError("Wrong username or password");
  }
  
  const isAuthenticated = await bcrypt.compare(password, user.password);
  if (!isAuthenticated) {
    throw new APIErrors.NotAuthenticatedError("Wrong username or password");
  }

  const token = jwt.sign({ username, id: user._id.toString() }, process.env.JWT_SECRET);
  return token;
}
  
function verifyToken(token: string) {
  if (!token || !process.env.JWT_SECRET) {
    return null;
  }
  const user = jwt.verify(token, process.env.JWT_SECRET) as UserToken;
  if (!user?.id) {
    return null;
  }
  return user;
}

export const authService = { login, verifyToken };