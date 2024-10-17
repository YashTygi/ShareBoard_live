import { db } from "@/db/db";
import { users } from "@/db/schema";


export const limitedPermutationGenerator = (arr: Array<string>, limit: number) => {
    if (arr.length === 1) {
        return arr;
    }

    const result: string[] = [];
    const formats = [
        (a: string, b: string) => `${a}${b}`,
        (a: string, b: string) => `${b}${a}`,
        (a: string, b: string) => `${a}-${b}`,
        (a: string, b: string) => `${b}-${a}`,
        (a: string, b: string) => `${a}_${b}`,
        (a: string, b: string) => `${b}_${a}`,
    ];

    for (let i = 0; i < arr.length && result.length < limit; i++) {
        const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
        for (const restItem of rest) {
            for (const format of formats) {
                const combination = format(arr[i], restItem);
                if (!result.includes(combination)) {
                    result.push(combination);
                    if (result.length >= limit) break;
                }
            }
        }
    }

    return result;
};

export const filterExistingURL = async (combinations: Array<string>) => {
    const existingPathname = await db.select({
        path: users.pathName
    }).from(users);

    const existingPaths = existingPathname.map(pathObj => pathObj.path);

    return combinations.filter(combination => !existingPaths.includes(combination));
};

export const getAllPathname = async () => {
    const existingPathname = await db.select({
        path: users.pathName
    }).from(users);

    const allPathname = existingPathname.map(pathObj => pathObj.path);


    return allPathname
};

