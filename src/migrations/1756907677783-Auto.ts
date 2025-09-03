import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1756907677783 implements MigrationInterface {
    name = 'Auto1756907677783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tbTodo\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`todoId\` int NOT NULL AUTO_INCREMENT, \`content\` text NOT NULL, \`status\` enum ('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I') NOT NULL DEFAULT 'A', PRIMARY KEY (\`todoId\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`tbTodo\``);
    }

}
