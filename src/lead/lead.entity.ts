// src/lead/lead.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Lead {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string; // e.g., auction non-seller, distressed property

  @Column()
  status: string; // e.g., contacted, not contacted

  @Column()
  rank: number; // ranking based on potential for the Brewer Method

  // ... other relevant fields ...
}
