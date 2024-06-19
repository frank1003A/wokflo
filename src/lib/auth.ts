import bcrypt from "bcryptjs";

export async function hashPassword(password: string) {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password: string, hashedPassword: string) {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
}

import { getToken } from "next-auth/jwt";

export async function isAuthenticated(request: any) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  return !!token; // Returns true if token exists, false otherwise
}
