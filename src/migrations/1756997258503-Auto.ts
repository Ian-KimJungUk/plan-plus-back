import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1756997258503 implements MigrationInterface {
    name = 'Auto1756997258503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbTodo\` DROP FOREIGN KEY \`FK_2c9125fe465923e3f61887c8281\``);
        await queryRunner.query(`ALTER TABLE \`tbTodo\` CHANGE \`userIdUserId\` \`userId\` char(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`tbTodo\` ADD CONSTRAINT \`FK_de4948c02f359e6fd998dab335b\` FOREIGN KEY (\`userId\`) REFERENCES \`tbUser\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbTodo\` DROP FOREIGN KEY \`FK_de4948c02f359e6fd998dab335b\``);
        await queryRunner.query(`ALTER TABLE \`tbTodo\` CHANGE \`userId\` \`userIdUserId\` char(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`tbTodo\` ADD CONSTRAINT \`FK_2c9125fe465923e3f61887c8281\` FOREIGN KEY (\`userIdUserId\`) REFERENCES \`tbUser\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
