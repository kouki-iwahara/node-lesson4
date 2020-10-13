import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1602473300476 implements MigrationInterface {
    name = 'initial1602473300476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_52378a74ae3724bcab44036645b`");
        await queryRunner.query("DROP INDEX `FK_4356ac2f9519c7404a2869f1691` ON `like`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE INDEX `FK_4356ac2f9519c7404a2869f1691` ON `like` (`user_id`)");
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_52378a74ae3724bcab44036645b` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
