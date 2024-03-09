import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Simple username/password for authentication
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

// Define a new interface to extend the Request interface
declare global {
  namespace Express {
      interface Request {
          user?: any; // Define the type of the user property
      }
  }
}

// Middleware for basic authentication
export const authenticateAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ error: 'Authorization header missing or invalid' });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Authentication successful
  next();
};

// Middleware for basic authentication
export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ error: 'Authorization header missing or invalid' });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');

  const myuser = await prisma.user.findFirst({
    where: { username: username, password: password }
  })

  if (!myuser) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  req.user = myuser;

  // Authentication successful
  next();
};