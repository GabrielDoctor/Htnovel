import bcrypt from "bcryptjs";
import sql from "../lib/db";

export interface User {
  id: string;
  role: string;
  user_name: string;
  password: string;
  email: string;
  avatar: string;
  createAt: Date;
  updateAt: Date;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function createUser(user: User) {
  const rs =
    await sql`INSERT INTO users ( username, password, email) VALUES (${user.user_name}, ${user.password}, ${user.email}) RETURNING id, role, username, email, createAt, updateAt`;
}
