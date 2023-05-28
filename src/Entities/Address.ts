import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm"
import { Restaurant } from "./Restaurant"
import { User } from "./User"

@Entity('address')
export class Address extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    addressLine: string

    @Column()
    city: string

    @Column()
    pincode: number

    @Column()
    state: string

    // @Column()
    // employeeId: string
    @OneToOne(() => Restaurant, restaddress => restaddress.address, { onDelete: 'CASCADE' })
    restAddress: Address

    @OneToOne(() => User, userAddrId => userAddrId.addressId, { onDelete: 'CASCADE' })
    userAddrId: User

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updateAt: Date
}