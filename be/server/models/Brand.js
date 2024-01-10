const { default: mongoose } = require("mongoose");

const brandSchema = new mongoose.Schema({
    brandId: {
        type: String,
        required: true,
        uuid: { type: String, match: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/ },
    },
    name: {
        type: String,
        required: true,
        max: 100,
        min: 2
    }
},
    {
        strict: true,
        strictQuery: 'throw',
    }
)

const Brand = mongoose.model('Brand', brandSchema);

module.export = Brand;