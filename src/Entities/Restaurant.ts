import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn } from "typeorm"
import { Address } from "./Address"
import { Order } from "./Order"

@Entity('restaurant')
export class Restaurant extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({
        unique: true
    })
    email: string

    @Column()
    description: string

    @Column()
    restType: string

    @Column({
        type: "bigint"
    })
    contactNumber: number

    @Column()
    imageUrl: string

    @OneToOne(() => Address, address => address.restAddress)
    @JoinColumn()
    address: Address
    // @OneToMany(()=>Order,)
    // @Column()
    // addressLine: string

    // @Column()
    // city: string

    // @Column()
    // pincode: number

    // @Column()
    // state: string

    @CreateDateColumn()
    createdAt: Date


    @UpdateDateColumn()
    updateAt: Date
}