import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm"

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

    @CreateDateColumn()
    createdAt: Date


    @UpdateDateColumn()
    updateAt: Date
}