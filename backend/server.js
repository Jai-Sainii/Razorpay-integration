const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose")
const courseRoutes = require("./routes/courseRoutes");
const paymentRoutes = require("./routes/paymentRoutes");


const app = express();
dotenv.config();

app.use(express.json())
app.use(cors());

app.use("/courses", courseRoutes);
app.use("/payments", paymentRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB local");
    })
    .catch((error) => {
        console.log(error);
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${process.env.PORT || 3000}`);
});