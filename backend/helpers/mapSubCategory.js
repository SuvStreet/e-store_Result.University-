module.exports = function (subCategoryDb) {
	return {
		id: subCategoryDb._id,
		name: subCategoryDb.name,
		category: {
			id: subCategoryDb.category_id._id,
			name: subCategoryDb.category_id.name,
		},
		imgUrl: subCategoryDb.img_url,
		products: subCategoryDb.products.map((item) => {
			return {
				id: item._id
			}
		}),
	}
}
