import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

@Entity('cells')
export class Cells extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

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

    @Column()
    addressLine: string

    @Column()
    city: string

    @Column()
    pincode: number

    @Column()
    state: string

    @Column({             //foreignKey
        type: 'simple-array'
    })
    employees: number[]

    @Column()
    createdAt: string



}