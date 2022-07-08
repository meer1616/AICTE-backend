import { AppDataSource } from "../../ormconfig";
import { Request, Response } from "express";
import { User } from "../Entities/User";
import { hash } from "bcrypt";
import { Cells } from "../Entities/Cells";
import { Address } from "../Entities/Address";
import { AuthRequest } from "../types/AuthRequest";

export const registerUser = async (req: AuthRequest, res: Response) => {
    try {
        const {
            firstName,
            lastName,
            contactNumber,
            email,
            password,
            imageUrl,
            dateOfBirth,
            cellType,
            addressLine,
            city,
            pincode,
            state
        } = req.body;
        if (
            !firstName ||
            !lastName ||
            !contactNumber ||
            !email ||
            !password ||
            !imageUrl ||
            !dateOfBirth ||
            !cellType ||
            !addressLine ||
            !city ||
            !pincode ||
            !state
        ) {
            return res.status(400).json({ message: "Enter the required field" });
        }
        // finding duplicate User
        const duplicate = await User.findOne({ where: { email: email } });
        if (duplicate) {
            return res
                .status(409)
                .json({ message: "Email has been already registered" });
        }
        // hashing password

        const address = new Address();
        address.addressLine = addressLine
        address.city = city
        address.pincode = pincode
        address.state = state


        const savedAddress = await address.save().catch((err) => {
            res.json({ error: err.detail });
        })

        const hashPass = await hash(password, 10);

        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.hashedPassword = hashPass;
        user.contactNumber = Number(contactNumber);
        user.imageUrl = imageUrl;
        user.cellType = cellType;
        user.role = [3];
        user.dateOfBirth = new Date(dateOfBirth);
        if (savedAddress) {
            user.addressId = savedAddress

            const userCell = await Cells.findOne({ where: { cellName: user.cellType } });

            console.log("userCell: " + userCell);

            if (userCell) {
                // save this employee to cell employee
                user.belongsTocell = userCell
                const newUser = await user.save().catch((err) => {
                    res.json({ error: err.detail });
                });
            }
            else {
                return res.status(404).json({ success: false, message: "cells Not found." });
            }
        }
        else {
            res.status(500).json({ error: "Server error" });
        }

        return res.status(201).json({ success: true, message: "User Created successfully" });
        // return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getAllUser = async (req: Request, res: Response) => {
    try {
        const allUsers = await
            AppDataSource.getRepository(User)
                .createQueryBuilder("user")
                .leftJoinAndSelect("user.addressId", "address")
                .getMany();

        // console.log("profiles", profiles);

        // const allUsers = await User.find();
        if (!allUsers) return res.status(204).json({ message: "No User found" });
        return res.status(200).json({ length: allUsers.length, allUsers });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    console.log("del user id", req?.body?.id);

    try {
        if (!req?.body?.id)
            return res.status(400).json({ message: "user id required" });
        const user = await User.findOne({ where: { id: req.body.id } });
        if (!user)
            return res.status(204).json({ message: `no user with id ${user} found` });
        const result = await User.delete({ id: req.body.id });
        return res.status(200).json({ message: "Deleted successfully ", result });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, contactNumber, email, dateOfBirth } = req.body;
        if (!id) return res.status(204).json({ message: `id not found` });
        if (firstName || lastName || contactNumber || email || dateOfBirth) {
            await AppDataSource.createQueryBuilder()
                .update(User)
                .set(req.body)
                .where("id = :id", { id })
                .execute()
                .catch((err) => {
                    res.json({ error: err.detail });
                });
            return res.json({
                success: true,
                message: "user updated successfully",
            });
        }
        else {
            return res.status(400).json({ message: `body not found` });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
