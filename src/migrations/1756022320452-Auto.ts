import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1756022320452 implements MigrationInterface {
    name = 'Auto1756022320452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` DROP FOREIGN KEY \`FK_31da9271eb8df305e6c8f10deb6\``);
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` CHANGE \`userUserId\` \`userId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` ADD \`userId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` ADD CONSTRAINT \`FK_78156e66647b3647720b7395dc3\` FOREIGN KEY (\`userId\`) REFERENCES \`tbUser\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` DROP FOREIGN KEY \`FK_78156e66647b3647720b7395dc3\``);
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` ADD \`userId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` CHANGE \`userId\` \`userUserId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` ADD CONSTRAINT \`FK_31da9271eb8df305e6c8f10deb6\` FOREIGN KEY (\`userUserId\`) REFERENCES \`tbUser\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
