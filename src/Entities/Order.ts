import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

@Entity('order')
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: "simple-array"
    })
    foodItems: string[]

    @Column()
    description: string

    @Column()
    orderedBy: string

    @Column()
    orderNo: number

    @Column()
    type: string

    @Column()
    totalAmount: number

    @Column()
    address: string

    @Column({
        nullable: true
    })
    createdAt: string

}