module.exports = function (categoryDb) {
	return {
		id: categoryDb._id,
		name: categoryDb.name,
		subcategories: categoryDb.subcategories.map((subcategory) => {
			return {
				id: subcategory._id,
				name: subcategory.name,
			}
		})
	}
}
