import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity('auditorium')
export class Auditorium extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    ManagerName: string

    @Column()
    email: string

    @Column()
    contactNumber: number

    @Column()
    imageUrl: string

    @Column()
    addressLine: string

    @Column()
    city: string

    @Column()
    pincode: number

    @Column()
    state: string

    @Column()
    capacity: number

    @Column()
    availability: boolean

    @Column({
        nullable: true
    })
    fromDate: string

    @Column({
        nullable: true
    })
    toDate: string

    @Column({
        type: "simple-array",
    })
    facilities: string[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updateAt: Date

}