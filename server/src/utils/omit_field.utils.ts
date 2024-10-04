export function omitFields(object: any, keys: string[]) {
    const cloneObject = { ...object };

    for (const key of keys) {
        delete cloneObject[key];
    }

    return cloneObject;
}