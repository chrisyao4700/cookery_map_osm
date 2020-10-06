class DataFunc {
    static performSearch(input) {
        if (!input || input.length < 1) return [];
        const mainMap = new Map();

        //Group by data here O(n)
        input.forEach((item) => {
            const [product_key, product_name, year, company] = this._convertKey(item);
            if (mainMap.has(product_key)) {
                const pack = mainMap.get(product_key);
                pack['total_count'] = pack['total_count'] + 1;
                const company_set = pack['companies'];
                company_set.set(company, company_set.has(company) ? company_set.get(company) + 1 : 1);
            } else {
                const company_set = new Map();
                company_set.set(company, 1);
                const pack = {
                    'product': product_name,
                    'year': year,
                    'total_count': 1,
                    'companies': company_set
                };
                mainMap.set(product_key, pack);
            }
        });
        const result = [];

        // Calculate the result here O(n)
        for (let value of mainMap.values()) {
            const total_count = value.total_count;
            const total_company = value.companies.size;
            let rate = -Infinity;
            for (let c_value of value.companies.values()) {
                const curr_rate = Math.round(c_value / total_count * 100);
                rate = Math.max(rate, curr_rate);
            }
            result.push([value.product, value.year, total_count, total_company, rate]);
        }

        // Sort result here O(n)
        result.sort((a, b) => {
            if (a[0] === b[0]) {
                return a[1] - b[1];
            } else {
                return a[0].localeCompare(b[0]);
            }
        });

        return result;
    }

    static _convertKey(curr) {
        const product_name = curr['Product'];
        const year = curr['Date received'].slice().split('-')[0];
        return [`${product_name}-${year}`, product_name, year, curr['Company']];
    }

}

module.exports = DataFunc;