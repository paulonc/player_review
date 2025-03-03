import express from "express";
import userRoutes from "./routes/UserRoutes";
import gameRoutes from "./routes/GameRoutes";
import companyRoutes from "./routes/CompanyRoutes";
import reviewRoutes from "./routes/ReviewRoutes";
import { setupSwagger } from "./config/swagger";
import logger from "./config/logger";
import errorHandler from "./middleware/errorHandler";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/games", gameRoutes);
app.use("/companies", companyRoutes);
app.use("/reviews", reviewRoutes);

app.use(errorHandler);

setupSwagger(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Swagger UI is available at http://localhost:${PORT}/api-docs`);
});

export default app;
