// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from './lead/lead.entity';
import { LeadService } from './lead/lead.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db-prime-realty-market.cxzxqkobpgbs.us-west-1.rds.amazonaws.com', // Updated to use the provided endpoint
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Lead],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Lead]),
  ],
  providers: [LeadService],
})
export class AppModule {}
