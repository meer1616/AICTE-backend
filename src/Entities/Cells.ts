import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { User } from "./User"

@Entity('cells')
export class Cells extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        length: 150,
    })
    cellName: string

    @Column({
        unique: true
    })
    cellEmail: string

    @Column({
        unique: true
    })
    cellCode: string

    @Column({
        type: "bigint"
    })
    contactNumber: number

    @Column()
    imageUrl: string

    @Column()     //foreignkey
    ManagerId: number

    // @Column()
    // addressLine: string

    // @Column()
    // city: string

    // @Column()
    // pincode: number

    // @Column()
    // state: string

    @OneToMany(() => User, employees => employees.belongsTocell)
    employees: User[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updateAt: Date
    cellsave: User
}