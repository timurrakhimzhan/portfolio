import {Entity, Column, BaseEntity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @PrimaryGeneratedColumn("uuid")
    uuid!: number;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column({default: false})
    isAdmin!: boolean;

    @Column()
    registrationDate!: Date;

    @Column({nullable: true})
    lastLoginDate!: Date;
}