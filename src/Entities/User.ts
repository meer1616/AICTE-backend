import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, ManyToOne, OneToMany, UpdateDateColumn, ManyToMany, JoinTable, CreateDateColumn, JoinColumn } from "typeorm"
import { Address } from "./Address"
import { Cells } from "./Cells"
import { ContactInfo } from "./ContactInfo"
import { Meeting } from "./Meetings"

@Entity('user')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        length: 100,
    })
    firstName: string

    @Column({
        length: 100,
    })
    lastName: string

    @Column()
    hashedPassword: string

    @Column()
    imageUrl: string

    @Column()
    cellType: string

    @Column({
        type: "simple-array",
    })
    role: number[]

    @Column()
    dateOfBirth: Date

    @CreateDateColumn()
    createdAt: Date

    @Column({
        nullable: true
    })
    refreshToken: string

    @Column({
        unique: true
    })
    email: string

    @Column()
    contactNumber: number

    @OneToOne(() => Address, addressId => addressId.userAddrId)
    @JoinColumn()
    addressId: Address


    @ManyToMany(() => Meeting, meetings => meetings.attendees)
    @JoinTable()
    meetings: Meeting[]

    // @ManyToOne(() => User, manager => manager.directReports, { onDelete: "SET NULL" })
    // manager: User

    // @OneToMany(() => User, directReports => directReports.manager)
    // directReports: User[]

    @ManyToOne(() => Cells, belongsTocell => belongsTocell.employees, { onDelete: "SET NULL" })
    belongsTocell: Cells


    @UpdateDateColumn()
    updateAt: Date


}