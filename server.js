const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	 useFindAndModify: false ,
});

const connection = mongoose.connection;
connection.once("open", () => {
	console.log("Mongodb successfully connected");
});

const companyRouter = require("./routes/Company");
const authRouter = require("./routes/Auth");
const contactRouter = require("./routes/Contact");
const categoryRouter = require("./routes/Category");
const tagRouter = require('./routes/Tag');
const locationRouter = require('./routes/Location');
const ratingRouter = require('./routes/Rating');
const reviewRouter = require('./routes/Review');


app.use("/api/company", companyRouter);
app.use("/api/contact", contactRouter);
app.use("/api/review", reviewRouter);
app.use("/api/category", categoryRouter);
app.use("/api/tag", tagRouter);
app.use("/api/rating", ratingRouter);
app.use("/api/location", locationRouter);
app.use("/api", authRouter);


app.listen(port, () => {
	console.log("Server started successfully at port " + port);
});
