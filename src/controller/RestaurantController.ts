import { Request, Response } from "express";
import { AppDataSource } from "../../ormconfig";
import { Restaurant } from "../Entities/Restaurant";

export const registerRestaurant = async (req: Request, res: Response) => {
    try {
        const { name, description, email, restType, contactNumber, imageUrl, addressLine, city, pincode, state } = req.body
        console.log(req.body);

        if (!name || !email || !description || !restType || !contactNumber || !imageUrl || !addressLine || !city || !pincode || !state) return res.status(400).json({ message: "Enter the required field" })

        const duplicateCell = await Restaurant.findOne({ where: { email } })
        if (duplicateCell) return res.status(409).json({ message: "Cell has been already registered " })

        const date = new Date().toLocaleDateString()
        const time = new Date().toLocaleTimeString()

        const restaurant = new Restaurant()
        restaurant.name = name
        restaurant.description = description
        restaurant.email = email
        restaurant.contactNumber = contactNumber
        restaurant.imageUrl = imageUrl
        restaurant.restType = restType
        restaurant.addressLine = addressLine
        restaurant.city = city
        restaurant.pincode = pincode
        restaurant.state = state
        restaurant.createdAt = `${date} ${time}`

        const newRestaurant = await restaurant.save().catch((err) => {
            res.json({ error: err })
        })
        return res.status(201).json({ success: true, newRestaurant });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getAllRestaurant = async (req: Request, res: Response) => {
    try {
        const restaurant = await Restaurant.find();
        if (!restaurant) return res.status(204).json({ message: "No Restaurant found" });
        return res.status(200).json({ length: restaurant.length, restaurant });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteRestaurant = async (req: Request, res: Response) => {

    try {
        if (!req?.body?.id)
            return res.status(400).json({ message: "Restaurant id required" });
        const cell = await Restaurant.findOne({ where: { id: req.body.id } });
        if (!cell)
            return res.status(204).json({ message: `no Restaurant with id ${cell} found` });
        const result = await Restaurant.delete({ id: req.body.id });
        return res.status(200).json({ message: "Deleted successfully ", result });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

export const updateRestaurant = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description, email, restType, contactNumber, imageUrl, addressLine, city, pincode, state } = req.body;
        if (!id) return res.status(204).json({ message: `id not found` });
        const restaurantId = await Restaurant.findOne({ where: { id } });
        if (!restaurantId)
            return res.json({ message: `no cell with id ${id} found` }).status(204);
        if (name || description || email || restType || contactNumber || imageUrl || addressLine || city || pincode || state) {
            await AppDataSource.createQueryBuilder()
                .update(Restaurant)
                .set(req.body)
                .where("id = :id", { id })
                .execute()
                .catch((err) => {
                    res.json({ error: err.detail });
                });
            return res.json({
                success: true,
                message: "Restaurant updated successfully",
            });
        }
        else {
            return res.status(400).json({ message: `body not found` });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getSingleRestaurant = async (req: Request, res: Response) => {
    try {
        if (!req.params?.id)
            return res.status(400).json({ message: "cell id required" });
        const restaurant = await Restaurant.findOne({ where: { id: req.params.id } });
        if (!restaurant)
            return res.status(204).json({ message: `no cell with id ${restaurant} found` });
        // const result = await Cells.delete({ id: req.body.id });
        return res.status(200).json({ message: "getById successfully ", restaurant });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}