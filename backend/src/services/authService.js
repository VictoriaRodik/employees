import { compare } from "bcrypt";
import pkg from "jsonwebtoken";
import { UserRepository } from "../repositories/userRepository.js";
import pool from "../config/db.js";

const { sign } = pkg;

const userRepository = new UserRepository(pool);

export const loginUser = async (username, password) => {
  const user = await userRepository.getByUsername(username);

  if (!user) {
    throw new Error("Invalid username");
  }

  const isMatch = await compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error("Invalid password");
  }

  const token = sign(
    { userId: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return token;
};
