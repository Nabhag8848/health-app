import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatesColumns1763441540066 implements MigrationInterface {
    name = 'CreateDatesColumns1763441540066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."clinic" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "core"."clinic" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "core"."doctor" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "core"."doctor" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "core"."review" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "core"."review" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "core"."user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "core"."user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "core"."user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "core"."review" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "core"."review" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "core"."doctor" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "core"."doctor" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "core"."clinic" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "core"."clinic" DROP COLUMN "createdAt"`);
    }

}
