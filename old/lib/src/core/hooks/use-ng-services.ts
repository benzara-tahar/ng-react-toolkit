import { useMemo } from "react";
import { element } from 'angular';
import { TodoService } from "../../apps/full-angularjs/services/todo.service";
import { Injectable } from "../decorators/inject";

declare global {
  interface Window {
    _injector: angular.auto.IInjectorService;
    _provide: angular.auto.IProvideService;
  }
}

type InjectServiceResolver<Service extends Injectable> =
  Service extends "TodoSerivce"
  ? TodoService
  : Service extends "$scope"
  ? angular.IScope
  : never;

// Helper type to transform tuple of service names into tuple of resolved service types
type ResolveServices<T extends Injectable[]> = {
  [K in T[number]as K extends string
  ? CamelCase<K>
  : never]: K extends Injectable ? InjectServiceResolver<K> : never;
};

// Helper type to convert a string to camelCase
type CamelCase<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Lowercase<First>}${Rest}`
  : S;

const useNgServices = <T extends Injectable[]>(
  ...serviceNames: [...T]
): ResolveServices<T> => {

  return useMemo(() => {

    const injector = window._injector ?? element(document.body).injector();

    if (!injector) {
      throw new Error(
        "injector not found, please make sure to add ngReactInterop module to your main module"
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

// const inject = <T extends Injectable>(service: T): ResolveServices<[T]> => useNgServices(service)[service]  ;
export { useNgServices };
