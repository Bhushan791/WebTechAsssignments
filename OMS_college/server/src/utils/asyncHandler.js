const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        console.log("🔵 asyncHandler called for:", req.path);
        try {
            Promise.resolve(requestHandler(req, res, next))
                .then((result) => {
                    console.log("✅ asyncHandler resolved successfully for:", req.path);
                })
                .catch((err) => {
                    console.error("❌ asyncHandler caught error:", err);
                    console.error("❌ Error message:", err.message);
                    console.error("❌ Next function type:", typeof next);
                    if (typeof next === 'function') {
                        next(err);
                    } else {
                        console.error("❌ CRITICAL: next is not a function!");
                    }
                });
        } catch (error) {
            console.error("❌ asyncHandler synchronous error:", error);
            if (typeof next === 'function') {
                next(error);
            } else {
                console.error("❌ CRITICAL: next is not a function in sync catch!");
            }
        }
    };
}

export { asyncHandler };

