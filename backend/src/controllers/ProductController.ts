import { Request, Response, NextFunction } from "express";
import { Product } from "../models/mongo/Product";


const productsToInsert = [
    {
        name: 'Laptop Pro X',
        description: 'High-performance laptop for professionals, 16GB RAM, 512GB SSD.',
        price: 1200.00,
        stock: 50,
        category: 'Electronics'
    },
    {
        name: 'Mechanical Keyboard RGB',
        description: 'Gaming mechanical keyboard with customizable RGB lighting.',
        price: 85.50,
        stock: 120,
        category: 'Peripherals'
    },
    {
        name: 'Wireless Mouse Ergo',
        description: 'Ergonomic wireless mouse with long battery life.',
        price: 25.00,
        stock: 200,
        category: 'Peripherals'
    },
    {
        name: '4K Ultra HD Monitor',
        description: '27-inch 4K monitor with vibrant colors and fast refresh rate.',
        price: 450.00,
        stock: 30,
        category: 'Electronics'
    },
    {
        name: 'Noise-Cancelling Headphones',
        description: 'Over-ear headphones with superior noise cancellation.',
        price: 199.99,
        stock: 80,
        category: 'Audio'
    },
    {
        name: 'Smartphone Flagship 2025',
        description: 'Latest flagship smartphone with advanced camera and processor.',
        price: 999.00,
        stock: 70,
        category: 'Electronics'
    },
    {
        name: 'Portable SSD 1TB',
        description: 'Ultra-fast external solid state drive for data backup.',
        price: 130.00,
        stock: 150,
        category: 'Storage'
    },
    {
        name: 'Webcam HD 1080p',
        description: 'Full HD webcam for video conferencing and streaming.',
        price: 49.95,
        stock: 90,
        category: 'Peripherals'
    },
    {
        name: 'Smart Home Hub',
        description: 'Central hub for connecting and controlling smart home devices.',
        price: 75.00,
        stock: 60,
        category: 'Smart Home'
    },
    {
        name: 'Fitness Tracker Watch',
        description: 'Track your steps, heart rate, and sleep with this smart watch.',
        price: 60.00,
        stock: 110,
        category: 'Wearables'
    },
    {
        name: 'Gaming Chair Pro',
        description: 'Ergonomic gaming chair with lumbar support and recline function.',
        price: 250.00,
        stock: 40,
        category: 'Furniture'
    },
    {
        name: 'Bluetooth Speaker Mini',
        description: 'Compact portable Bluetooth speaker with powerful sound.',
        price: 35.00,
        stock: 180,
        category: 'Audio'
    }
];

class ProductController {

    async insertProducts(req: Request, res: Response, next: NextFunction) {
        try {
            await Product.insertMany(productsToInsert, { ordered: false });
            res.status(201).json({ message: "Products inserted successfully" });
        } catch (error) {
            console.error("Error inserting products:", error);
            res.status(500).json({ message: "Error inserting products", error });
        }
    }

    async listProducts(req: Request, res: Response, next: NextFunction) {
        const itemsPerPage = 20;
        const currentPage = parseInt(req.query.page as string) || 1;
        const skip = (currentPage - 1) * itemsPerPage;
        const searchQuery = (req.query.searchQuery as string || "").trim();

        try {
            let filter = {};
            if (searchQuery !== "") {
                filter = {
                    name: { $regex: searchQuery, $options: 'i' }, // case-insensitive search
                };
            }

            const [products, totalItems] = await Promise.all([
                Product.find(filter)
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(itemsPerPage),
                Product.countDocuments(filter),
            ]);

            const totalPages = Math.ceil(totalItems / itemsPerPage);

            return res.status(200).json({
                currentPage,
                totalPages,
                totalItems,
                products,
            });

        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
            return res.status(500).json({ message: "Error connecting to database", error });
        }
    }

    async infoProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = req.params.id;

            if (!productId) {
                return res.status(400).json({ message: "Product ID is required" });
            }

            const product = await Product.findById(productId);
            
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            return res.status(200).json({
                status: 'success',
                data: {
                    product
                }
            });

        } catch (error) {
            console.error("Error fetching product:", error);
            return res.status(500).json({ message: "Error fetching product", error });
        }
    }

}

export default new ProductController();