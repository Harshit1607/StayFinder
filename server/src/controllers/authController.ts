import { Request, Response } from 'express';
import prisma from '../prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, phone_number } = req.body;

  try {
    const existingUser = await prisma.users.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone_number,
      },
    });

    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};
