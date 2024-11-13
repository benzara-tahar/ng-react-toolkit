
// to provide typesafety accross the app, add any new service used here
// TODO: make this generic
export type Injectable = "$scope" | "TodoService";
export function Inject(...dependencies: readonly Injectable[]) : ClassDecorator {

    return function (target) : any {
        if (target.length !== dependencies.length) {
            const missingOrExtra = target.length - dependencies.length;
            const type = missingOrExtra > 0 ? "missing" : "extra";
            const message = `@Inject Error (${type} dependencies: ${Math.abs(missingOrExtra)}): ensure the number of arguments in the @Inject decorator matches the number of arguments in your class constructor or function`;
            throw new Error(message);
        }

        const depsDescriptor : TypedPropertyDescriptor<readonly Injectable[]> = {
            value: dependencies,
            writable: true,
            enumerable: true,
            configurable: false,
        };
        Object.defineProperty(target, "$inject", depsDescriptor);
        return target;
    };
}
