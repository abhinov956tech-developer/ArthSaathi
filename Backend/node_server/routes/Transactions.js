import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const Transaction = express.Router();

// GET all transactions
Transaction.get("/", async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        user: true,
        account: true,
      },
    });
    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

// GET a specific transaction by ID
Transaction.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid transaction ID" });
    }

    const transaction = await prisma.transaction.findUnique({
      where: { id },
      include: {
        user: true,
        account: true,
      },
    });

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json(transaction);
  } catch (error) {
    console.error("Error fetching transaction:", error);
    res.status(500).json({ error: "Failed to fetch transaction" });
  }
});

// POST a new transaction
Transaction.post("/", async (req, res) => {
  try {
    const { accountId, userId, Type, Date, isRecurring, status, description } = req.body;

    if (!accountId || !userId || !Type || !Date || !status) {
      return res.status(400).json({ error: "accountId, userId, Type, Date, and status are required" });
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        accountId: parseInt(accountId),
        userId: parseInt(userId),
        Type,
        Date: new Date(Date), // Ensure valid date format
        isRecurring: Boolean(isRecurring),
        status,
        description,
      },
    });

    res.status(201).json(newTransaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "Failed to create transaction" });
  }
});

// PUT (update) an existing transaction
Transaction.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { accountId, userId, Type, Date, isRecurring, status, description } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid transaction ID" });
    }

    const updatedTransaction = await prisma.transaction.update({
      where: { id },
      data: {
        accountId: accountId ? parseInt(accountId) : undefined,
        userId: userId ? parseInt(userId) : undefined,
        Type,
        Date: Date ? new Date(Date) : undefined,
        isRecurring: isRecurring !== undefined ? Boolean(isRecurring) : undefined,
        status,
        description,
      },
    });

    res.json(updatedTransaction);
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ error: "Failed to update transaction" });
  }
});

// DELETE a transaction
Transaction.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid transaction ID" });
    }

    await prisma.transaction.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ error: "Failed to delete transaction" });
  }
});

export default Transaction;
