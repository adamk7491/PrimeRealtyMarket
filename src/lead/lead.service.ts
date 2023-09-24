// src/lead/lead.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './lead.entity';

@Injectable()
export class LeadService {
  constructor(
    @InjectRepository(Lead)
    private leadRepository: Repository<Lead>,
  ) {}

  async createLead(lead: Lead): Promise<Lead> {
    return await this.leadRepository.save(lead);
  }

  async getAllLeads(): Promise<Lead[]> {
    return await this.leadRepository.find();
  }

  async getLeadById(id: number): Promise<Lead> {
    return await this.leadRepository.findOne({ where: { id: id } });
  }

  async updateLead(id: number, updatedLead: Lead): Promise<Lead> {
    await this.leadRepository.update(id, updatedLead);
    return this.getLeadById(id);
  }

  async deleteLead(id: number): Promise<void> {
    await this.leadRepository.delete(id);
  }

  // ... other service methods ...
}
