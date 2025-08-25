import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1756022065310 implements MigrationInterface {
    name = 'Auto1756022065310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` DROP FOREIGN KEY \`FK_72d1c253dd79e1e5cc130e89538\``);
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` CHANGE \`userIdUserId\` \`userUserId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` DROP COLUMN \`userUserId\``);
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` ADD \`userUserId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` ADD CONSTRAINT \`FK_31da9271eb8df305e6c8f10deb6\` FOREIGN KEY (\`userUserId\`) REFERENCES \`tbUser\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` DROP FOREIGN KEY \`FK_31da9271eb8df305e6c8f10deb6\``);
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` DROP COLUMN \`userUserId\``);
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` ADD \`userUserId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` CHANGE \`userUserId\` \`userIdUserId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` ADD CONSTRAINT \`FK_72d1c253dd79e1e5cc130e89538\` FOREIGN KEY (\`userIdUserId\`) REFERENCES \`tbUser\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
