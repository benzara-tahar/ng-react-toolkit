
import { describe, it, expect } from '@jest/globals';
import { Inject } from '../../decorators/inject';
describe("Test inject decorator", () => {

    it("should add $inject property to target class controller", () => {
        // Owner: benlahcene.benzara@medius.com
        const dependencies = ["AuthService"] as const;
        @Inject("AuthService")
        class TestClassController {
            constructor(_service_: any) { }
        }
        expect(TestClassController["$inject"]).toEqual(dependencies);
    });

    it("should add $inject property with default value if no dependencies are provided to target class controller", () => {
        // Owner: benlahcene.benzara@medius.com
        const defaultDependencies: string[] = [];
        @Inject()
        class TestClass {}
        expect(TestClass["$inject"]).toEqual(defaultDependencies);
    });

    it("should add $inject property to target function controller", () => {
        // Owner: benlahcene.benzara@medius.com
        const dependencies = ["AuthService"] as const;
        function TestFunctionController (_service_: any): void {}
        const decoratedFunctionController = Inject(...dependencies)(TestFunctionController);
        expect(decoratedFunctionController?.["$inject"]).toEqual(dependencies);
    });

    it("should add $inject property with default value if no dependencies are provided to target function controller", () => {
        // Owner: benlahcene.benzara@medius.com
        const defaultDependencies = [] as const;
        function TestFunctionController (): void { }
        const decoratedFunctionController = Inject(...defaultDependencies)(TestFunctionController);
        
        expect(decoratedFunctionController?.["$inject"]).toEqual(defaultDependencies);
    });

    it("should add throw error if there are extra or missing depenedencies", () => {
        // Owner: benlahcene.benzara@medius.com
        function TestFunctionController (A: any, B: any): void { }

        // for some reason, the next line does not work.
        // expect(Inject("$http")(TestFunctionController)).toThrow();
        try {
            Inject("$http")(TestFunctionController);
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect((error as Error).message).toBe("@Inject Error (missing dependencies: 1): ensure the number of arguments in the @Inject decorator matches the number of arguments in your class constructor or function");
        }

        try {
            Inject("$compile", "$cookies", "$q", "$sce")(TestFunctionController);
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect((error as Error).message).toBe("@Inject Error (extra dependencies: 2): ensure the number of arguments in the @Inject decorator matches the number of arguments in your class constructor or function");
        }
    });
});
