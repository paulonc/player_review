import express from "express";
import userRoutes from "./routes/UserRoutes";
import gameRoutes from "./routes/GameRoutes"
import companyRoutes from "./routes/CompanyRoutes"
import { setupSwagger } from "./swagger";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/games", gameRoutes)
app.use("/companies", companyRoutes)

setupSwagger(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger UI is available at http://localhost:${PORT}/api-docs`);
});
