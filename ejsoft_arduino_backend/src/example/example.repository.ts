import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Example } from "./entities/example.entity";

@Injectable()
export class ExampleRepository {
  
  private exampleRepo: Repository<Example>;

  constructor(private readonly dataSource: DataSource) {
    this.exampleRepo = this.dataSource.getRepository(Example);
  }

  async create(example: Example) {
    // await this.exampleRepo.createQueryBuilder()
    //   .insert()
    //   .into(Example)
    //   .values(example)
    //   .execute()
    await this.exampleRepo.save(example)
  }

  async findAll() {
    return await this.exampleRepo.createQueryBuilder().select().getMany() 
  }
}