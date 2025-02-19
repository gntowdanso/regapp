import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma'; // Ensure this points to your Prisma client

// Helper function to validate email format
const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export async function POST(request: Request) {
    try {
        // Parsing request body and destructuring values
        const { name, email, password, confirmPassword } = await request.json();

        // ✅ Check if all fields are provided
        if (!name || !email || !password || !confirmPassword) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        // ✅ Validate email format
        if (!isValidEmail(email)) {
            return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
        }

        // ✅ Validate password length
        if (password.length < 6) {
            return NextResponse.json({ message: "Password must be at least 6 characters long" }, { status: 400 });
        }

        // ✅ Check if passwords match
        if (password !== confirmPassword) {
            return NextResponse.json({ message: "Passwords do not match" }, { status: 400 });
        }

        // ✅ Check if user already exists (ensure the column name matches your DB schema)
        const existingUser = await prisma.users.findUnique({
            where: { userName: email }
        });

        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        // ✅ Hash the password securely using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Create the new user in the database
        await prisma.users.create({
            data: {
                name,
                userName: email, // Removed unnecessary fallback `|| ""`
                password: hashedPassword,
            },
        });

        return NextResponse.json({ message: "User created successfully" }, { status: 201 });

    } catch (error: unknown) {
        console.error("Error creating user:", error);

        // ✅ Handle Prisma-specific errors gracefully
        if ((error as { code?: string }).code === 'P2002') { // Unique constraint violation (e.g., email already exists)
            return NextResponse.json({ message: "Email is already registered" }, { status: 400 });
        }

        // ✅ Catch-all error handler for other errors
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
