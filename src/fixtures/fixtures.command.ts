import { Command, Console } from "nestjs-console";
import { getConnection } from "typeorm";
import fixtures from "./fixtures";

import * as chalk from 'chalk';

@Console()
export class FixturesCommand {

    CONNECTION_NAME = 'default'

    @Command({
        command: 'fixtures',
        description: 'Seed data in database'
    })
    async command() {
        await this.runMigrations();

        for (const fixture of fixtures) {
            await this.createInDataBase(fixture.model, fixture.fields);
        }

        console.log(chalk.green('Data genereted'));
    }

    async runMigrations() {
        const conn = getConnection(this.CONNECTION_NAME);

        for (const migration of conn.migrations.reverse()) {
            await conn.undoLastMigration();
        }
    }

    async createInDataBase(model: any, data: any) {
        const repository = this.getRepository(model);
        const obj = repository.create(data);
        await repository.save(obj);
    }

    getRepository(model: any) {
        const conn = getConnection(this.CONNECTION_NAME);
        return conn.getRepository(model);
    }

}