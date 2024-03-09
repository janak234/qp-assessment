import express from 'express';
import { PrismaClient } from '@prisma/client';
import adminRouter from './admin';
import userRouter from './user';
import { authenticateAdmin, authenticateUser } from './middleware';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Mount admin routes
app.use('/admin', authenticateAdmin, adminRouter);

// Mount user routes
app.use('/user', authenticateUser, userRouter);

app.use((req, res) => {
    res.send({ "error": "Endpoint Not Found" });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});