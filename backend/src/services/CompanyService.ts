import CompanyRepository from '../repositories/CompanyRepository';
import { Company } from '../models/Company';
import { NotFoundError, ValidationError } from '../errors/AppError';
import { z } from 'zod';

const companySchema = z.object({
  name: z.string().min(1, 'Company name is required'),
  country: z.string().min(1, 'Country is required'),
});

class CompanyService {
  async createCompany(
    company: Omit<Company, 'id' | 'createdAt'>,
  ): Promise<Company> {
    const parsedCompany = companySchema.parse(company);
    return await CompanyRepository.create(parsedCompany);
  }

  async getCompanyById(id: string): Promise<Company | null> {
    if (!id) throw new ValidationError('Company ID is required');
    const company = await CompanyRepository.findById(id);
    if (!company) throw new NotFoundError('Company not found');
    return company;
  }

  async getAllCompanys(): Promise<Company[]> {
    return await CompanyRepository.findAll();
  }

  async updateCompany(
    id: string,
    companyData: Partial<Omit<Company, 'id' | 'createdAt'>>,
  ): Promise<Company | null> {
    if (!id) throw new ValidationError('Company ID is required');
    const existingCompany = await CompanyRepository.findById(id);
    if (!existingCompany) throw new NotFoundError('Company not found');
    const parsedCompanyData = companySchema.partial().parse(companyData);
    return await CompanyRepository.update(id, parsedCompanyData);
  }

  async deleteCompany(id: string): Promise<void> {
    if (!id) throw new ValidationError('Company ID is required');
    const company = await CompanyRepository.findById(id);
    if (!company) throw new NotFoundError('Company not found');
    await CompanyRepository.delete(id);
  }
}

export default new CompanyService();
