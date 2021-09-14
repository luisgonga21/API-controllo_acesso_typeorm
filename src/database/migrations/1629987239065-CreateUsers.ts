import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1629987239065 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: 'uuid',
                        isPrimary: true,
                        isNullable: false,
                        generationStrategy: "uuid",
                        isGenerated: true,
                        default:'uuid_generate_v4()' 
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "username",
                        type: "varchar",
                    },
                    {
                        name: "password",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "update_at",
                        type: "timestamp",
                        default: "now()",
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }

}
