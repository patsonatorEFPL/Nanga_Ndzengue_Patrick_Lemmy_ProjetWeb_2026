import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecurityModule } from './security/security.module';
import { ormConfig } from './orm.config';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), SecurityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
