import jwt from 'jsonwebtoken';
import UserModel, { IUser } from '../models/User';

export interface SignupInput {
  username: string;
  email: string;
  password: string;
}

export async function signupService({ username, email, password }: SignupInput): Promise<{ message: string; token: string }> {
  // Check if user already exists
  const existingUser = await UserModel.findByEmail(email);
  if (existingUser) {
    throw new Error('Email already in use');
  }

  // Create new user (UserModel handles password hashing)
  await UserModel.create({ username, email, password });

  // Create JWT token
  const token = jwt.sign({ email, username }, process.env.JWT_SECRET || 'yoursecret', { expiresIn: '1h' });

  return { message: 'User created successfully', token };
}