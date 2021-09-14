import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    Timestamp,
    UpdateDateColumn,
} from "typeorm";
import Permission from "./Permission";

@Entity("roles")
class Role {
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

    @ManyToMany(() => Permission)
    @JoinTable({
        name: "permissions_roles",
        joinColumns: [{name: "role_id"}],
        inverseJoinColumns: [{name: "permission_id"}]
    })
    permission: Permission[];

    @CreateDateColumn()
    created_at: Timestamp;

    @UpdateDateColumn()
    update_at: Timestamp;
}


export default Role;