export const isValidRegex = (pattern: string): boolean => {
    let isValid = true;

    try {
        new RegExp(pattern);
    } catch {
        isValid = false;
    }

    return isValid;
};
