import CompanyRepository from "../repositories/CompanyRepository";
import { Company } from "../models/Company";

class CompanyService {
  async createCompany(
    company: Omit<Company, "id" | "createdAt">
  ): Promise<Company> {
    return await CompanyRepository.create(company);
  }

  async getCompanyById(id: string): Promise<Company | null> {
    return await CompanyRepository.findById(id);
  }

  async getAllCompanys(): Promise<Company[]> {
    return await CompanyRepository.findAll();
  }

  async updateCompany(
    id: string,
    companyData: Partial<Omit<Company, "id" | "createdAt">>
  ): Promise<Company | null> {
    return await CompanyRepository.update(id, companyData);
  }

  async deleteCompany(id: string): Promise<void> {
    await CompanyRepository.delete(id);
  }
}

export default new CompanyService();
