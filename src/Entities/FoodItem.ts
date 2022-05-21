import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

@Entity('foodItems')
export class FoodItems extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    type: String

    @Column({
        type: "simple-array"
    })
    ingredients: string[]

    @Column()
    price: number

    @Column()
    imageUrl: string

    @Column()
    createdAt: string
}