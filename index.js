// ============================================
// MINI ASYNC PROJECT: PRODUCTS + STOCK + DISCOUNT
// ============================================

// Simulated product database
function fetchProducts() {
    return new Promise((resolve) => {
        const delay = Math.random() * 1000 + 500;
        setTimeout(() => {
            resolve(["Book", "Phone", "Novel"]);
        }, delay);
    });
}

// Simulated stock database
function getStock(productName) {
    return new Promise((resolve, reject) => {
        const delay = Math.random() * 1000 + 500;
        setTimeout(() => {
            if (productName === "Book") {
                reject(`Failed to fetch stock for ${productName}`);
            } else if (productName === "Phone") {
                resolve({ stock: 15, price: 1500 });
            } else if (productName === "Novel") {
                resolve({ stock: 20, price: 800 });
            } else {
                reject(`Unknown product: ${productName}`);
            }
        }, delay);
    });
}

// Simulated discount calculation
function getDiscount(price) {
    return new Promise((resolve, reject) => {
        const delay = Math.random() * 1000 + 500;
        setTimeout(() => {
            if (price < 1000) {
                reject(`Cannot apply discount for price: ${price}`);
            } else {
                resolve(price * 0.8);
            }
        }, delay);
    });
}

// Main async flow
async function loadData() {
    try {
        const products = await fetchProducts();

        const results = [];

        for (const product of products) {
            try {
                const { stock, price } = await getStock(product);
                try {
                    const discountedPrice = await getDiscount(price);
                    results.push({ product, stock, price, discountedPrice });
                } catch {
                    results.push({ product, stock, price, discountedPrice: null });
                }
            } catch (err) {
                results.push({ product, error: err });
            }
        }

        console.log("=== RESULTS ===");
        console.table(results);

    } catch (err) {
        console.error("Failed to fetch products:", err);
    }
}

loadData();
