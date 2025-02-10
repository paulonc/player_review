import * as express from "express";
import * as dotenv from "dotenv";
import sequelize from "./config/database";
import { UserRepository } from "./repository/userRepository";

dotenv.config();

const app = express();
app.use(express.json());

const userRepo = new UserRepository();

app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await userRepo.createUser(name, email, password);
    res.status(201).json(user);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao criar o usuário", error: error.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await userRepo.getAllUsers();
    res.status(200).json(users);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao obter os usuários", error: error.message });
  }
});

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Banco de dados conectado!");
    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });
