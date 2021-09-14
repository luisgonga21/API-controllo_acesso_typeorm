import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    Timestamp,
    UpdateDateColumn,
} from "typeorm";

@Entity("products")
class Products {
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


export default Products;