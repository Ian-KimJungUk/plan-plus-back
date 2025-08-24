import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1756018289861 implements MigrationInterface {
    name = 'Auto1756018289861'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tbUser\` (\`userId\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('0', '1', '2') NOT NULL DEFAULT '2', PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`tbUser\``);
    }

}
