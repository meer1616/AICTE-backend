import { Request, Response } from "express";
import { AppDataSource } from "../../ormconfig";
import { FoodItems } from "../Entities/FoodItem";

export const registerFoodItem = async (req: Request, res: Response) => {
    try {
        const { name, description, type, ingredients, price, imageUrl, } = req.body
        console.log(req.body);

        if (!name || !description || !type || !ingredients || !imageUrl || !price) return res.status(400).json({ message: "Enter the required field" })

        const duplicateCell = await FoodItems.findOne({ where: { name } })
        if (duplicateCell) return res.status(409).json({ message: "Food Item has been already registered " })

        const date = new Date().toLocaleDateString()
        const time = new Date().toLocaleTimeString()

        const restaurant = new FoodItems()
        restaurant.name = name
        restaurant.description = description
        restaurant.imageUrl = imageUrl
        restaurant.type = type
        restaurant.ingredients = ingredients
        restaurant.price = price
        restaurant.createdAt = `${date} ${time}`

        const newFood = await restaurant.save().catch((err) => {
            res.json({ error: err })
        })
        return res.status(201).json({ success: true, newFood });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getAllFoodItem = async (req: Request, res: Response) => {
    try {
        const food = await FoodItems.find();
        if (!food) return res.status(204).json({ message: "No FoodItem found" });
        return res.status(200).json({ length: food.length, food });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteFoodItem = async (req: Request, res: Response) => {

    try {
        if (!req?.body?.id)
            return res.status(400).json({ message: "FoodItem id required" });
        const food = await FoodItems.findOne({ where: { id: req.body.id } });
        if (!food)
            return res.status(204).json({ message: `no Restaurant with id ${food} found` });
        const result = await FoodItems.delete({ id: req.body.id });
        return res.status(200).json({ message: "Deleted successfully ", result });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

export const updatefoodItem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description, type, ingredients, price, imageUrl, } = req.body
        if (!id) return res.status(204).json({ message: `id not found` });
        const restaurantId = await FoodItems.findOne({ where: { id } });
        if (!restaurantId)
            return res.json({ message: `no food item with id ${id} found` }).status(204);
        if (name || description || type || ingredients || price || imageUrl) {
            await AppDataSource.createQueryBuilder()
                .update(FoodItems)
                .set(req.body)
                .where("id = :id", { id })
                .execute()
                .catch((err) => {
                    res.json({ error: err.detail });
                });
            return res.json({
                success: true,
                message: "FoodItem updated successfully",
            });
        }
        else {
            return res.status(400).json({ message: `body not found` });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getSingleFoodItem = async (req: Request, res: Response) => {
    try {
        if (!req.params?.id)
            return res.status(400).json({ message: "FoodItem id required" });
        const food = await FoodItems.findOne({ where: { id: req.params.id } });
        if (!food)
            return res.status(204).json({ message: `no cell with id ${food} found` });
        // const result = await Cells.delete({ id: req.body.id });
        return res.status(200).json({ message: "getById successfully ", food });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}