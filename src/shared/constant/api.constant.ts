export const HEADERS = {
    JsonBody: {
        "Content-Type": "application/json",
    },
    authorize: (token: string) => ({
        "Authorization": `Bearer ${token}`,
    })
}
