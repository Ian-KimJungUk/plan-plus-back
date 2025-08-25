import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1756022449853 implements MigrationInterface {
    name = 'Auto1756022449853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` DROP COLUMN \`createdAt\``);
    }

}
