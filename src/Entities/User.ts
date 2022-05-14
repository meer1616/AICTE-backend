import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

@Entity('user')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100,
    })
    firstName: string

    @Column({
        length: 100,
    })
    lastName: string

    @Column({
        unique: true
    })
    email: string

    @Column()
    hashedPassword: string

    @Column()
    contactNumber: number

    @Column()
    imageUrl: string

    @Column({
        type: "simple-array",
    })
    role: number[]

    @Column()
    dateOfBirth: Date

    @Column({
        nullable: true
    })
    createdAt: Date

    @Column({
        nullable: true
    })
    refreshToken: string

}