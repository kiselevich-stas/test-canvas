export function toggleArrayValue(array, value) {
    return array.includes(value)
        ? array.filter((item) => item !== value)
        : [...array, value]
}

export function setSingleFilter(value, allValues) {
    return value ? [value] : [...allValues]
}