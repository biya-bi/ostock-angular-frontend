export class Serializer {
	static serialize<T>(entity: T, fieldsToExclude?: string[]): T {
		if (!fieldsToExclude?.length) {
			return entity;
		}
		const result = {};
		Object.keys(entity).forEach(key => {
			if (!fieldsToExclude.includes(key)) {
				result[key] = entity[key];
			}
		});
		return result as T;
	}
}
