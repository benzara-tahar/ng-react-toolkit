import { useMemo } from "react";
import { element } from 'angular';
import { InjectToken } from "../types";

declare global {
  interface Window {
    _injector?: angular.auto.IInjectorService;
    _provide?: angular.auto.IProvideService;
  }
}

// TODO: support other services
type InjectServiceResolver<Service extends InjectToken> =
  Service extends "$scope"
  ? angular.IScope
  : never;

// Helper type to transform tuple of service names into tuple of resolved service types
type ResolveServices<T extends InjectToken[]> = {
  [K in T[number]as K extends string
  ? CamelCase<K>
  : never]: K extends InjectToken ? InjectServiceResolver<K> : never;
};

// Helper type to convert a string to camelCase
type CamelCase<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Lowercase<First>}${Rest}`
  : S;

const useNgServices = <T extends InjectToken[]>(
  ...serviceNames: [...T]
): ResolveServices<T> => {

  return useMemo(() => {

    const injector = window._injector ?? element(document.body).injector();

    if (!injector) {
      throw new Error(
        "injector not found, please make sure to add you are running this hook inside an angularJs application"
      );
    }

    return serviceNames.reduce((services, serviceName) => {
      if (!injector.has(serviceName)) {
        throw new Error(`service ${serviceName} not found`);
      }

      // Convert the service name to camelCase for the key
      const key = (serviceName.charAt(0).toLowerCase() +
        serviceName.slice(1)) as keyof ResolveServices<T>;

      // Add the resolved service to the services object
      services[key] = injector.get(serviceName);
      return services;
    }, {} as ResolveServices<T>);
  }, [])
};

// const inject = <T extends InjectToken>(service: T): ResolveServices<[T]> => useNgServices(service)[service]  ;
export { useNgServices };
