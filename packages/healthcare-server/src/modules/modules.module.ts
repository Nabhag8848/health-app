import { Module } from '@nestjs/common';
import { QueueModule } from './queue/queue.module';
import { HealthModule } from './health/health.module';
import { APIModule } from './api/api.module';

@Module({
  imports: [QueueModule, HealthModule, APIModule],
})
export class ModulesModule {}
