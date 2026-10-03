import { clerkMiddleware, getAuth } from "@clerk/express";

export const protectRoute = [
    clerkMiddleware(),
    (req, res, next) => {
        const { isAuthenticated } = getAuth(req);

        if (!isAuthenticated) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        next();
    },
];