import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1756466096097 implements MigrationInterface {
    name = 'Auto1756466096097'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbUser\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` ADD \`password\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`tbUser\` ADD \`password\` varchar(255) NULL`);
    }

}
