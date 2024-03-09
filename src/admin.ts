import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const adminRouter = express.Router();

// List users
adminRouter.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch users' });
    }
});

// Create user
adminRouter.post('/users', async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = await prisma.user.create({
            data: {
                username,
                password,
            },
        });
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Unable to create user' });
    }
});

// Change password
adminRouter.post('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    try {
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { password },
        });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Unable to change password' });
    }
});

// Delete user
adminRouter.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.user.delete({
            where: { id: parseInt(id) },
        });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Unable to delete user' });
    }
});

// Create grocery item
adminRouter.post('/grocery-items', async (req, res) => {
    const { name, price, quantity, unit } = req.body;
    try {
        const newGroceryItem = await prisma.groceryItem.create({
            data: {
                name,
                price,
                quantity,
                unit,
            },
        });
        res.json(newGroceryItem);
    } catch (error) {
        res.status(500).json({ error: 'Unable to create grocery item' });
    }
});

// List grocery items
adminRouter.get('/grocery-items', async (req, res) => {
    try {
        const groceryItems = await prisma.groceryItem.findMany();
        res.json(groceryItems);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch grocery items' });
    }
});

// Update grocery item (partial update)
adminRouter.post('/grocery-items/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, quantity, unit } = req.body;
    try {
        const updatedGroceryItem = await prisma.groceryItem.update({
            where: { id: parseInt(id) },
            data: { name, price, quantity, unit },
        });
        res.json(updatedGroceryItem);
    } catch (error) {
        res.status(500).json({ error: 'Unable to update grocery item' });
    }
});

// Delete grocery item
adminRouter.delete('/grocery-items/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.groceryItem.delete({
            where: { id: parseInt(id) },
        });
        res.json({ message: 'Grocery item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Unable to delete grocery item' });
    }
});

export default adminRouter;
