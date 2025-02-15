import * as express from "express";
import userRoutes from "./routes/UserRoutes";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
