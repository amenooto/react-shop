export type Resolver = {
    [key in string]: {
        [key: string]: (
            parent: any,
            args: { [key: string]: any },
            context: {},
            info: any
        ) => any
    }
}