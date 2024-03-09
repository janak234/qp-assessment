import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const userRouter = express.Router();

// List grocery items
userRouter.get('/grocery-items', async (req, res) => {
    try {
        const groceryItems = await prisma.groceryItem.findMany();
        // console.log("=============>",req.user.username);

        res.json(groceryItems);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch grocery items' });
    }
});

// List orders
userRouter.get('/orders', async (req, res) => {
    try {
        // Access the user property from the request
        const user = req.user;

        // Fetch orders for the authenticated user
        const orders = await prisma.order.findMany({
            where: {
                userId: user.id
            },
            include: {
                groceryItems: {
                    include: { groceryItem: true }
                }
            }
        });

        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Unable to fetch orders' });
    }
});

// Place an order
userRouter.post('/orders', async (req, res) => {
    try {
        // Access the user property from the request
        const user = req.user;

        // Extract required data from the request body
        const orderItems = req.body;

        // Create an array to hold the order items
        const orderItemsData = orderItems.map((item: { groceryItemId: number, quantity: number }) => ({
            quantity: item.quantity,
            groceryItem: { connect: { id: item.groceryItemId } }
        }));

        // Create the order in the database along with its order items
        const order = await prisma.order.create({
            data: {
                user: { connect: { id: user.id } },
                groceryItems: {
                    create: orderItemsData
                }
            },
            include: {
                groceryItems: {
                    include: { groceryItem: true }
                }
            }
        });

        res.json(order);
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ error: 'Unable to place order' });
    }
});


export default userRouter;