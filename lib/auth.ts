// lib/auth.ts

import jwt from "jsonwebtoken";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema"; // Adjust this based on your schema
import { eq } from "drizzle-orm";

// Environment variable for your secret
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // Never hardcode in production

export async function getUserFromToken(token?: string) {
  if (!token) return null;

  try {
    // 1. Verify and decode token
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    // 2. Fetch user from DB
    const user = await db.select().from(users).where(eq(users.id, decoded.id));

    // 3. Return user info (you can filter fields)
    if (user.length > 0) {
      const { id, fullName, email } = user[0];
      return { id, name: fullName, email };
    }

    return null;
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
}
