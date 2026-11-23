export type TResponse<T> = {
    statusCode: number,
    success: boolean,
    message: string,
    data?: T,
    error?: any
};

export type Role = "maintainer" | "contributor";

export const User_Role = {
    contributor: "contributor",
    maintainer: "maintainer"
} as const