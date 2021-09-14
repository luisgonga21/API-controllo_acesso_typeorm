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
import Role from "./Role";

@Entity("users")
class User {
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
    username: string;

    @Column({
        type: "varchar",
        nullable: false
    })
    password: string;

    @ManyToMany(() => Role)
    @JoinTable({
        name: "users_roles",
        joinColumns: [{name: "user_id"}],
        inverseJoinColumns: [{name: "role_id"}]
    })
    roles: Role[];


    @CreateDateColumn()
    created_at: Timestamp;

    @UpdateDateColumn()
    update_at: Timestamp;
}


export default User;