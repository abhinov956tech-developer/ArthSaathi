const express = require('express');
const User = require('./User.js')
const Transaction = require('./Transactions.js')
const Account= require('./Accounts.js')
const Profile = require('./Financial_Profile.js')
const app = express();

app.use(express.json());

app.get("Hello there");
app.use('/User',User);
app.use('/Account',Account);
app.use('/Transaction',Transaction);
app.use('/Profile',Profile);

app.listen(3000,()=>console.log('Server is online'));