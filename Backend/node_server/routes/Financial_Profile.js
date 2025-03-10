import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const Finance = express.Router();

// POST /financial-profile - Create a financial profile
Finance.post("/", async (req, res) => {
  try {
    const { userId, Income, Age, Dependents, Disposable_Income, Desired_Savings } = req.body;

    // Validate required fields
    if (!userId || Income == null || Age == null || Dependents == null || Disposable_Income == null || Desired_Savings == null) {
      return res.status(400).json({
        msg: "userId, Income, Age, Dependents, Disposable_Income, and Desired_Savings are required.",
      });
    }

    // Create the financial profile
    const financialProfile = await prisma.financialProfile.create({
      data: {
        userId: parseInt(userId), // Ensure userId is an integer
        Income,
        Age,
        Dependents,
        Disposable_Income,
        Desired_Savings,
      },
    });

    res.status(201).json(financialProfile);
  } catch (e) {
    console.error("Error creating financial profile:", e);
    res.status(500).json({ msg: "Error while creating financial profile" });
  }
});

// GET /financial-profile/:userId - Fetch a financial profile by userId
Finance.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const financialProfile = await prisma.financialProfile.findUnique({
      where: { userId: parseInt(userId) }, // Ensure userId is an integer
    });

    if (!financialProfile) {
      return res.status(404).json({ msg: "Financial profile not found" });
    }

    res.json(financialProfile);
  } catch (e) {
    console.error("Error fetching financial profile:", e);
    res.status(500).json({ msg: "Error while fetching financial profile" });
  }
});

// PUT /financial-profile/:userId - Update a financial profile by userId
Finance.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const data = req.body;

    // Validate required fields
    if (!userId) {
      return res.status(400).json({ msg: "userId is required" });
    }

    // Update the financial profile
    const financialProfile = await prisma.financialProfile.update({
      where: { userId: parseInt(userId) }, // Ensure userId is an integer
      data,
    });

    res.json(financialProfile);
  } catch (e) {
    console.error("Error updating financial profile:", e);
    res.status(500).json({ msg: "Error while updating financial profile" });
  }
});

export default Finance;
