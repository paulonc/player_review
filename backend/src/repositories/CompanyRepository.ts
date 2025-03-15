import prisma from '../config/prisma';
import { Company } from '../models/Company';

class CompanyRepository {
  async create(company: Omit<Company, 'id' | 'createdAt'>): Promise<Company> {
    return await prisma.company.create({ data: company });
  }

  async findById(id: string): Promise<Company | null> {
    return await prisma.company.findUnique({ where: { id } });
  }

  async findAll(offset: number, limit: number): Promise<Company[]> {
    const totalCount = await prisma.company.count();

    if (offset > 0 && offset >= totalCount) {
      return [];
    }
    
    return await prisma.company.findMany({ skip: offset, take: limit });
  }

  async update(
    id: string,
    companyData: Partial<Omit<Company, 'id' | 'createdAt'>>,
  ): Promise<Company | null> {
    return await prisma.company.update({
      where: { id },
      data: companyData,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.company.delete({ where: { id } });
  }
}

export default new CompanyRepository();
