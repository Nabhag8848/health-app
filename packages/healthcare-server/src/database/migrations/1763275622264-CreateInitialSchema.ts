import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialSchema1763275622264 implements MigrationInterface {
    name = 'CreateInitialSchema1763275622264'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "core"."clinic" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(64) NOT NULL, "coordinates" geography(Point,4326) NOT NULL, CONSTRAINT "PK_8e97c18debc9c7f7606e311d763" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."doctor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(64) NOT NULL, "yoe" integer NOT NULL, "clinicId" uuid, CONSTRAINT "CHK_e6f3244280d0663829b5ff0c3c" CHECK ("yoe" >= 0 AND "yoe" <= 100), CONSTRAINT "PK_ee6bf6c8de78803212c548fcb94" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "message" character varying(1000) NOT NULL, "userId" uuid, "doctorId" uuid, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(64) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "core"."doctor" ADD CONSTRAINT "FK_b3b7adce2d51d8fc43d3c98b057" FOREIGN KEY ("clinicId") REFERENCES "core"."clinic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."review" ADD CONSTRAINT "FK_1337f93918c70837d3cea105d39" FOREIGN KEY ("userId") REFERENCES "core"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."review" ADD CONSTRAINT "FK_0fb82b25db634a2eabfbf4329ba" FOREIGN KEY ("doctorId") REFERENCES "core"."doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."review" DROP CONSTRAINT "FK_0fb82b25db634a2eabfbf4329ba"`);
        await queryRunner.query(`ALTER TABLE "core"."review" DROP CONSTRAINT "FK_1337f93918c70837d3cea105d39"`);
        await queryRunner.query(`ALTER TABLE "core"."doctor" DROP CONSTRAINT "FK_b3b7adce2d51d8fc43d3c98b057"`);
        await queryRunner.query(`DROP TABLE "core"."user"`);
        await queryRunner.query(`DROP TABLE "core"."review"`);
        await queryRunner.query(`DROP TABLE "core"."doctor"`);
        await queryRunner.query(`DROP TABLE "core"."clinic"`);
    }

}
