/**
 * source: https://github.com/ngReact/ngReact/blob/master/ngReact.js
 * !IMPORTANT: Please list any update applied here for tracing:
 * - convert from IIFE and UMD to ESM
 * - fix: always use current scope (source: https://github.com/ngReact/ngReact/commit/b640a55aac35b35ac44b285b5f031d27578e74d3#diff-a68bd9c22365bebe52a0b5f844104c4545c27c25083bb921c7bc7d326c48e319R64)
 * - fix: typescript strict mode errors
 **/

import React from "react";
import { createRoot, Root } from "react-dom/client";
import angular from "angular";

interface PropConfig {
  watchDepth?: string;
  wrapApply?: boolean;
}

type PropDefinition = string | [string, PropConfig];

// Types for window augmentation
declare global {
  interface Window {
    _injector: angular.auto.IInjectorService;
    _provide: angular.auto.IProvideService;
    [key: string]: any; // For dynamic component access
  }
}

// get a react component from name (components can be an angular injectable e.g. value, factory or
// available on window
function getReactComponent(name: string | Function, $injector: angular.auto.IInjectorService): React.ComponentType<any> {
  // if name is a function assume it is component and return it
  if (angular.isFunction(name)) {
    return name as React.ComponentType<any>;
  }

  // a React component name must be specified
  if (!name) {
    throw new Error("ReactComponent name attribute must be specified");
  }

  // ensure the specified React component is accessible, and fail fast if it's not
  let reactComponent!: React.ComponentType<any>;
  try {
    reactComponent = $injector.get(name);
  } catch (e) { }

  if (!reactComponent) {
    try {
      reactComponent = name.split(".").reduce((current: any, namePart: string) => {
        return current[namePart];
      }, window);
    } catch (e) { }
  }

  if (!reactComponent) {
    throw Error("Cannot find react component " + name);
  }

  return reactComponent;
}

// wraps a function with scope.$apply, if already applied just return
function applied(fn: Function, scope: angular.IScope): Function {
  if ((fn as any).wrappedInApply) {
    return fn;
  } else if ((fn as any).applyWrapped) {
    (fn as any).applyWrapped._scope = scope;
    return (fn as any).applyWrapped;
  }

  interface WrappedFunction extends Function {
    wrappedInApply?: boolean;
    _scope?: angular.IScope;
  }

  const wrapped: WrappedFunction = function (this: any) {
    const args = arguments;
    const _scope = (wrapped as any)._scope;
    const phase = _scope.$root.$$phase;
    if (phase === "$apply" || phase === "$digest") {
      return fn.apply(this, args);
    } else {
      return _scope.$apply(() => fn.apply(this, args));
    }
  };

  wrapped.wrappedInApply = true;
  (fn as any).applyWrapped = wrapped;
  (fn as any).applyWrapped._scope = scope;
  return wrapped;
}

function applyFunctions(obj: Record<string, any> | null | undefined, scope: angular.IScope, propsConfig: Record<string, PropConfig> = {}): Record<string, any> {
  return Object.keys(obj || {}).reduce((prev: Record<string, any>, key: string) => {
    const value = obj?.[key];
    const config = propsConfig[key] || {};
    prev[key] = angular.isFunction(value) && config.wrapApply !== false
      ? applied(value, scope)
      : value;
    return prev;
  }, {});
}

function watchProps(watchDepth: string, scope: angular.IRootScopeService, watchExpressions: PropDefinition[], listener: (newValue: unknown, oldValue: unknown, scope: angular.IScope) => any): void {
  const supportsWatchCollection = angular.isFunction(scope.$watchCollection);
  const supportsWatchGroup = angular.isFunction(scope.$watchGroup);

  const watchGroupExpressions: string[] = [];
  watchExpressions.forEach((expr) => {
    const actualExpr = getPropExpression(expr);
    const exprWatchDepth = getPropWatchDepth(watchDepth, expr);

    if (exprWatchDepth === "collection" && supportsWatchCollection) {
      scope.$watchCollection(actualExpr, listener);
    } else if (exprWatchDepth === "reference" && supportsWatchGroup) {
      watchGroupExpressions.push(actualExpr);
    } else {
      scope.$watch(actualExpr, listener, (exprWatchDepth !== "reference"));
    }
  });

  if (watchGroupExpressions.length) {
    scope.$watchGroup(watchGroupExpressions, listener);
  }
}

function renderComponent(component: React.ComponentType<any>, props: any, scope: angular.IScope, elem: angular.IAugmentedJQuery): void {
  scope.$evalAsync(() => {
    const root = createRoot(elem[0]);
    (elem[0] as any)._reactRoot = root;
    root.render(React.createElement(component, props));
  });
}

function getPropName(prop: PropDefinition): string {
  return Array.isArray(prop) ? prop[0] : prop;
}

function getPropConfig(prop: PropDefinition): PropConfig {
  return Array.isArray(prop) ? prop[1] : {};
}

function getPropExpression(prop: PropDefinition): string {
  return Array.isArray(prop) ? prop[0] : prop;
}

function findAttribute(attrs: angular.IAttributes, propName: string): string | undefined {
  const index = Object.keys(attrs).find((attr) => {
    return attr.toLowerCase() === propName.toLowerCase();
  });
  return index ? attrs[index] : undefined;
}

function getPropWatchDepth(defaultWatch: string, prop: PropDefinition): string {
  const customWatchDepth = (
    Array.isArray(prop) &&
    angular.isObject(prop[1]) &&
    prop[1].watchDepth
  );
  return customWatchDepth || defaultWatch;
}

// React Component directive
const reactComponent = function ($injector: angular.auto.IInjectorService): angular.IDirective {
  return {
    restrict: "E",
    replace: true,
    link: function (scope: angular.IScope, elem: angular.IAugmentedJQuery, attrs: angular.IAttributes) {
      console.log('⚛️', { scope, attrs, elem, })
      const reactComponent = getReactComponent(attrs['name'], $injector);

      const renderMyComponent = function () {
        const scopeProps = scope.$eval(attrs['props']);
        const props = applyFunctions(scopeProps, scope);
        console.log('⚛️', { props })

        renderComponent(reactComponent, props, scope, elem);
      };

      attrs['props'] ?
        watchProps(attrs['watchDepth'], scope, [attrs['props']], renderMyComponent) :
        renderMyComponent();

      scope.$on("$destroy", function () {
        if (!attrs['onScopeDestroy']) {
          const element = elem[0] as any;
          if (element._reactRoot) {
            element._reactRoot.unmount();
            delete element._reactRoot;
          }
        } else {
          scope.$eval(attrs['onScopeDestroy'], {
            unmountComponent: () => {
              const element = elem[0] as any;
              if (element._reactRoot) {
                element._reactRoot.unmount();
                delete element._reactRoot;
              }
            },
          });
        }
      });
    }
  };
};

// React directive factory
const reactDirective = function ($injector: angular.auto.IInjectorService) {
  return function (reactComponentName: string, staticProps?: PropDefinition[], conf?: angular.IDirective, injectableProps?: Record<string, any>): angular.IDirective {
    const directive: angular.IDirective = {
      restrict: "E",
      replace: true,
      link: function (scope: angular.IScope, elem: angular.IAugmentedJQuery, attrs: angular.IAttributes) {
        const reactComponent = getReactComponent(reactComponentName, $injector);

        let props = staticProps || Object.keys(reactComponent.propTypes || {});
        if (!props.length) {
          const ngAttrNames: string[] = [];
          angular.forEach(attrs.$attr, function (value, key) {
            ngAttrNames.push(key);
          });
          props = ngAttrNames;
        }

        const renderMyComponent = function () {
          const scopeProps: Record<string, any> = {}, config: Record<string, PropConfig> = {};
          props.forEach(function (prop) {
            const propName = getPropName(prop);
            const attrValue = findAttribute(attrs, propName);
            if (attrValue !== undefined) {
              scopeProps[propName] = scope.$eval(attrValue);
              config[propName] = getPropConfig(prop);
            }
          });
          const finalProps = {
            ...applyFunctions(scopeProps, scope, config),
            ...injectableProps
          };
          renderComponent(reactComponent, finalProps, scope, elem);
        };

        const propExpressions = props.map((prop) => {
          const propName = getPropName(prop);
          const attrValue = findAttribute(attrs, propName);
          return Array.isArray(prop) ?
            [attrValue, getPropConfig(prop)] :
            attrValue;
        }).filter((expr): expr is PropDefinition => expr !== undefined);

        watchProps(attrs['watchDepth'], scope, propExpressions, renderMyComponent);
        renderMyComponent();

        scope.$on("$destroy", function () {
          if (!attrs['onScopeDestroy']) {
            const element = elem[0] as any;
            if (element._reactRoot) {
              element._reactRoot.unmount();
              delete element._reactRoot;
            }
          } else {
            scope.$eval(attrs['onScopeDestroy'], {
              unmountComponent: () => {
                const element = elem[0] as any;
                if (element._reactRoot) {
                  element._reactRoot.unmount();
                  delete element._reactRoot;
                }
              },
            });
          }
        });
      }
    };
    return angular.extend(directive, conf);
  };
};

// Create and export the module
const ngReact = angular.module("ngReact", [])
  .directive("reactComponent", ["$injector", reactComponent])
  .factory("reactDirective", ["$injector", reactDirective]);

ngReact.run(["$injector", ($injector: angular.auto.IInjectorService) => {
  window._injector = $injector;
}]);

export default ngReact;