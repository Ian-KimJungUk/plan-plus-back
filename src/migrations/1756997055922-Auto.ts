import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1756997055922 implements MigrationInterface {
    name = 'Auto1756997055922'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tbTodo\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`todoId\` int NOT NULL AUTO_INCREMENT, \`content\` text NOT NULL, \`status\` enum ('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I') NOT NULL DEFAULT 'A', \`userIdUserId\` char(36) NULL, PRIMARY KEY (\`todoId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tbTodo\` ADD CONSTRAINT \`FK_2c9125fe465923e3f61887c8281\` FOREIGN KEY (\`userIdUserId\`) REFERENCES \`tbUser\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbTodo\` DROP FOREIGN KEY \`FK_2c9125fe465923e3f61887c8281\``);
        await queryRunner.query(`DROP TABLE \`tbTodo\``);
    }

}
