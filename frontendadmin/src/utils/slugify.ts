export function slugify(name: string) {
    return name
        .toLowerCase()
        .replace(/\s+/g, "")
        .replace(/&/g, "and")
        .replace(/[^\w-]/g, "");
}
