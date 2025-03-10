import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const Accounts = express.Router();

// POST /accounts - Create a new account
Accounts.post("/", async (req, res) => {
  try {
    const { userId, balance = 0.0, type } = req.body;

    // Validate required fields
    if (!userId || !type) {
      return res.status(400).json({ msg: "userId and type are required." });
    }

    // Validate account type
    if (!["SAVINGS", "CURRENT"].includes(type)) {
      return res
        .status(400)
        .json({ msg: "Invalid account type. Must be SAVINGS or CURRENT." });
    }

    const account = await prisma.account.create({
      data: {
        userId,
        balance,
        type,
      },
    });

    res.status(201).json(account);
  } catch (e) {
    console.error("Error creating account:", e);
    res.status(500).json({ msg: "Error while creating an account" });
  }
});

// GET /accounts/:accountId - Fetch an account by ID
Accounts.get("/:accountId", async (req, res) => {
  try {
    const { accountId } = req.params;

    const account = await prisma.account.findUnique({
      where: { id: parseInt(accountId) },
    });

    if (!account) {
      return res.status(404).json({ msg: "Account does not exist" });
    }

    res.json(account);
  } catch (e) {
    console.error("Error fetching account:", e);
    res.status(500).json({ msg: "Database error" });
  }
});

export default Accounts;
