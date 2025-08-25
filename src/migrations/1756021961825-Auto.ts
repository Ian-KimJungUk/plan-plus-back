import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1756021961825 implements MigrationInterface {
    name = 'Auto1756021961825'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tbUserProvider\` (\`userProviderId\` int NOT NULL AUTO_INCREMENT, \`provider\` enum ('local', 'google', 'kakao', 'naver') NOT NULL, \`providerId\` varchar(255) NOT NULL, \`userIdUserId\` varchar(255) NULL, PRIMARY KEY (\`userProviderId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tbUser\` CHANGE \`email\` \`email\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`tbUser\` CHANGE \`password\` \`password\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` ADD CONSTRAINT \`FK_72d1c253dd79e1e5cc130e89538\` FOREIGN KEY (\`userIdUserId\`) REFERENCES \`tbUser\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbUserProvider\` DROP FOREIGN KEY \`FK_72d1c253dd79e1e5cc130e89538\``);
        await queryRunner.query(`ALTER TABLE \`tbUser\` CHANGE \`password\` \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbUser\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`tbUserProvider\``);
    }

}
