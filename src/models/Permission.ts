import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    Timestamp,
    UpdateDateColumn,
} from "typeorm";

@Entity("permissions")
class Permission {
    @PrimaryGeneratedColumn("increment")
    id: string;

    @Column({
        type: "varchar",
        nullable: false
    })
    name: string;

    @Column({
        type: "varchar",
        nullable: false
    })
    description: string;

    @CreateDateColumn()
    created_at: Timestamp;

    @UpdateDateColumn()
    update_at: Timestamp;
}


export default Permission;