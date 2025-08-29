import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1756437512582 implements MigrationInterface {
    name = 'Auto1756437512582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbUser\` ADD \`status\` enum ('A', 'B') NOT NULL DEFAULT 'A'`);
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` DROP FOREIGN KEY \`FK_78156e66647b3647720b7395dc3\``);
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` ADD \`userId\` char(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`tbUser\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`tbUser\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`tbUser\` ADD \`userId\` char(36) NOT NULL PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`tbUser\` CHANGE \`role\` \`role\` enum ('A', 'B', 'C') NOT NULL DEFAULT 'C'`);
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` ADD CONSTRAINT \`FK_78156e66647b3647720b7395dc3\` FOREIGN KEY (\`userId\`) REFERENCES \`tbUser\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` DROP FOREIGN KEY \`FK_78156e66647b3647720b7395dc3\``);
        await queryRunner.query(`ALTER TABLE \`tbUser\` CHANGE \`role\` \`role\` enum ('0', '1', '2') NOT NULL DEFAULT '2'`);
        await queryRunner.query(`ALTER TABLE \`tbUser\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`tbUser\` ADD \`userId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbUser\` ADD PRIMARY KEY (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` ADD \`userId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` ADD CONSTRAINT \`FK_78156e66647b3647720b7395dc3\` FOREIGN KEY (\`userId\`) REFERENCES \`tbUser\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbUser\` DROP COLUMN \`status\``);
    }

}
