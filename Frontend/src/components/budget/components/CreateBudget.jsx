"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function CreateBudget({ refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState("😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [budgetName, setBudgetName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  /**
   * Handles budget creation
   */
  const handleCreateBudget = () => {
    if (!budgetName.trim() || !budgetAmount) {
      alert("Please enter a valid budget name and amount.");
      return;
    }

    // Simulate budget creation (Replace with API call if needed)
    console.log("Creating Budget:", {
      icon: emojiIcon,
      name: budgetName,
      amount: Number(budgetAmount),
    });

    // Reset form fields
    setBudgetName("");
    setBudgetAmount("");
    setEmojiIcon("😀");
    setDialogOpen(false);

    // Refresh Budget List
    refreshData?.();
  };

  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <div
            className="bg-slate-100 p-10 rounded-2xl
            items-center flex flex-col border-2 border-dashed
            cursor-pointer hover:shadow-md"
          >
            <h2 className="text-3xl">+</h2>
            <h2>Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <div className="relative inline-block">
                  <Button
                    variant="outline"
                    className="text-lg"
                    aria-label="Choose Emoji"
                    onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                  >
                    {emojiIcon}
                  </Button>
                  {openEmojiPicker && (
                    <div className="absolute top-full mt-2 z-20 bg-white shadow-lg rounded-lg p-2">
                      <EmojiPicker
                        onEmojiClick={(e) => {
                          setEmojiIcon(e.emoji);
                          setOpenEmojiPicker(false);
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <h2 className="text-black font-medium my-1">Budget Name</h2>
                  <Input
                    placeholder="e.g. Home Decor"
                    value={budgetName}
                    onChange={(e) => setBudgetName(e.target.value)}
                  />
                </div>

                <div className="mt-4">
                  <h2 className="text-black font-medium my-1">Budget Amount</h2>
                  <Input
                    type="number"
                    placeholder="e.g. 5000$"
                    value={budgetAmount}
                    onChange={(e) => setBudgetAmount(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button
              className="mt-5 w-full rounded-full"
              onClick={handleCreateBudget}
            >
              Create Budget
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;
