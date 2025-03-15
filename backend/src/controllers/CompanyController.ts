import { Request, Response, NextFunction } from 'express';
import CompanyService from '../services/CompanyService';
import logger from '../config/logger';
class CompanyController {
  async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const company = await CompanyService.createCompany(req.body);
      return res.status(201).json(company);
    } catch (error) {
      logger.error('Error creating company', error);
      next(error);
    }
  }

  async getCompany(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const company = await CompanyService.getCompanyById(req.params.id);
      return res.status(200).json(company);
    } catch (error) {
      logger.error('Error getting company', error);
      next(error);
    }
  }

  async getAllCompanies(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const companies = await CompanyService.getAllCompanies(page, limit);
      return res.status(200).json(companies);
    } catch (error) {
      logger.error('Error getting all companies', error);
      next(error);
    }
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const updatedCompany = await CompanyService.updateCompany(
        req.params.id,
        req.body,
      );
      return res.status(200).json(updatedCompany);
    } catch (error) {
      logger.error('Error updating company', error);
      next(error);
    }
  }

  async updateCompanyName(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const updatedCompany = await CompanyService.updateCompany(
        req.params.id,
        req.body.name,
      );
      return res.status(200).json(updatedCompany);
    } catch (error) {
      logger.error('Error updating company name', error);
      next(error);
    }
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      await CompanyService.deleteCompany(req.params.id);
      return res.status(204).send();
    } catch (error) {
      logger.error('Error deleting company', error);
      next(error);
    }
  }
}

export default new CompanyController();
