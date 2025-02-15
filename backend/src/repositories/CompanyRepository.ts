import prisma from "../config/prisma";
import { Company } from "../models/Company";

class CompanyRepository {
  async create(
    company: Omit<Company, "id" | "createdAt">
  ): Promise<Company> {
    return await prisma.company.create({ data: company });
  }

  async findById(id: string): Promise<Company | null> {
    return await prisma.company.findUnique({ where: { id } });
  }

  async findAll(): Promise<Company[]> {
    return await prisma.company.findMany();
  }

  async update(
    id: string,
    developerData: Partial<Omit<Company, "id" | "createdAt">>
  ): Promise<Company | null> {
    return await prisma.company.update({
      where: { id },
      data: developerData,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.company.delete({ where: { id } });
  }
}

export default new CompanyRepository();
