import { Repository } from 'typeorm';
import { GroupInfo } from 'src/entities/groupInfo.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GroupRepository {
  constructor(
    @InjectRepository(GroupInfo)
    private repository: Repository<GroupInfo>,
  ) {}

  // Custom query methods can be added hereQ
}
