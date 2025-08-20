

export type typeSession = {
    user: {
        id: string,
        email: string | null,
        name: string | null,
        image: string ,
        username: string
        role: string | null,
        hasAccess: boolean | null
    }
};