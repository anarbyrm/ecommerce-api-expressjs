function calculateCartTotal(items) {
    return new Promise((resolve, reject) => {
        let total = 0;

        for (let element of items) {
            const quantity = element.item.quantity;
            const price = parseFloat(element.price);

            total += quantity * price;
        }

        resolve(total.toFixed(2));
        reject('could not calculate total');
    });
}

module.exports = {
    calculateCartTotal
}