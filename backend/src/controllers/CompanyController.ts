import { Request, Response } from "express";
import CompanyService from "../services/CompanyService";

class CompanyController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const company = await CompanyService.createCompany(req.body);
      return res.status(201).json(company);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getCompany(req: Request, res: Response): Promise<Response> {
    try {
      const company = await CompanyService.getCompanyById(req.params.id);
      if (!company)
        return res.status(404).json({ error: `Company with id ${req.params.id} not found` });
      return res.status(200).json(company);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAllCompanies(req: Request, res: Response): Promise<Response> {
    try {
      const companies  = await CompanyService.getAllCompanys();
      return res.status(200).json(companies);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const updatedCompany = await CompanyService.updateCompany(
        req.params.id,
        req.body
      );
      if (!updatedCompany)
        return res.status(404).json({ error: `Company with id ${req.params.id} not found` });
      return res.status(200).json(updatedCompany);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      await CompanyService.deleteCompany(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new CompanyController();
