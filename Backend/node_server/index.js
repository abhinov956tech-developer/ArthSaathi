import express from "express";
import User from "./routes/User.js";
import Transaction from "./routes/Transactions.js";
import Account from "./routes/Accounts.js";
import Profile from "./routes/Financial_Profile.js";

const app = express();

app.use(express.json());

// Fix: Corrected invalid route definition
app.get("/", (req, res) => {
  res.send("Hello there");
});

// Register routes
app.use("/User", User);
app.use("/Account", Account);
app.use("/Transaction", Transaction);
app.use("/Profile", Profile);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is online at port ${PORT}`));
