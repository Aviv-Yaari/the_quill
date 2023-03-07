import jwt from "jsonwebtoken";

function login(username: string, password: string) {
  if (!username || !password) {
    throw new Error('Missing username or password'); // TODO: Change this to BadRequestError
  }
  if (!process.env.JWT_SECRET) {
    throw new Error("missing JWT secret"); // TODO: Change this to internal server error
  }
  const token = jwt.sign(username, process.env.JWT_SECRET);
  return token;
}
  
function verifyToken(token: string) {
  if (!token) {
    return false;
  }
  if (!process.env.JWT_SECRET) {
    throw new Error("missing JWT secret"); // TODO: Change this to internal server error
  }
  return jwt.verify(token, process.env.JWT_SECRET);
}

export const authService = { login, verifyToken };