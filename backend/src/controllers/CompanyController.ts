import { Request, Response } from "express";
import CompanyService from "../services/CompanyService";
import logger from "../config/logger";

class CompanyController {
  async updateCompanyName(req: Request, res: Response): Promise<Response> {
    try {
      const updatedCompany = await CompanyService.updateCompanyName(req.params.id, req.body.name);
      return res.status(200).json(updatedCompany);
    } catch (error) {
      logger.error("Error updating company name", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const company = await CompanyService.createCompany(req.body);
      return res.status(201).json(company);
    } catch (error) {
      logger.error("Error creating company", error);
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
      logger.error("Error fetching company", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAllCompanies(req: Request, res: Response): Promise<Response> {
    try {
      const companies  = await CompanyService.getAllCompanys();
      return res.status(200).json(companies);
    } catch (error) {
      logger.error("Error fetching all companies", error);
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
      logger.error("Error updating company", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      await CompanyService.deleteCompany(req.params.id);
      return res.status(204).send();
    } catch (error) {
      logger.error("Error deleting company", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new CompanyController();
