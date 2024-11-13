/**
 * source: https://github.com/ngReact/ngReact/blob/master/ngReact.js
 * !IMPORTANT: Please list any update applied here for tracing:
 * - convert from IIFE and UMD to ESM
 * - fix: always use current scope (source: https://github.com/ngReact/ngReact/commit/b640a55aac35b35ac44b285b5f031d27578e74d3#diff-a68bd9c22365bebe52a0b5f844104c4545c27c25083bb921c7bc7d326c48e319R64)
 **/

import React from "react";
import { createRoot } from "react-dom/client";
import angular from "angular";

// get a react component from name (components can be an angular injectable e.g. value, factory or
// available on window
function getReactComponent(name, $injector) {
   // if name is a function assume it is component and return it
   if (angular.isFunction(name)) {
      return name;
   }

   // a React component name must be specified
   if (!name) {
      throw new Error("ReactComponent name attribute must be specified");
   }

   // ensure the specified React component is accessible, and fail fast if it's not
   let reactComponent;
   try {
      reactComponent = $injector.get(name);
   } catch (e) { }

   if (!reactComponent) {
      try {
         reactComponent = name.split(".").reduce((current, namePart) => {
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
function applied(fn, scope) {
   if (fn.wrappedInApply) {
      return fn;
   } else if (fn.applyWrapped) {
      fn.applyWrapped._scope = scope;
      return fn.applyWrapped;
   }
   var wrapped: any = function () {
      var args = arguments;
      var _scope = wrapped._scope;
      var phase = _scope.$root.$$phase;
      if (phase === "$apply" || phase === "$digest") {
         return fn.apply(null, args);
      } else {
         return _scope.$apply(function () {
            return fn.apply(null, args);
         });
      }
   };
   wrapped.wrappedInApply = true;
   fn.applyWrapped = wrapped;
   fn.applyWrapped._scope = scope;
   return wrapped;
}

function applyFunctions(obj, scope, propsConfig = {}) {
   return Object.keys(obj || {}).reduce((prev, key) => {
      const value = obj[key];
      const config = propsConfig[key] || {};
      prev[key] = angular.isFunction(value) && config.wrapApply !== false
         ? applied(value, scope)
         : value;
      return prev;
   }, {});
}

// Rest of the utility functions...
function watchProps(watchDepth, scope, watchExpressions, listener) {
   const supportsWatchCollection = angular.isFunction(scope.$watchCollection);
   const supportsWatchGroup = angular.isFunction(scope.$watchGroup);

   const watchGroupExpressions: any[] = [];
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

function renderComponent(component, props, scope, elem) {
   scope.$evalAsync(() => {
      const root = createRoot(elem[0]);
      // Store the root instance on the element for cleanup
      elem[0]._reactRoot = root;
      root.render(React.createElement(component, props));
   });
}

function getPropName(prop) {
   return (Array.isArray(prop)) ? prop[0] : prop;
}

function getPropConfig(prop) {
   return (Array.isArray(prop)) ? prop[1] : {};
}

function getPropExpression(prop) {
   return (Array.isArray(prop)) ? prop[0] : prop;
}

function findAttribute(attrs, propName) {
   const index = Object.keys(attrs).filter((attr) => {
      return attr.toLowerCase() === propName.toLowerCase();
   })[0];
   return attrs[index];
}

function getPropWatchDepth(defaultWatch, prop) {
   const customWatchDepth = (
      Array.isArray(prop) &&
      angular.isObject(prop[1]) &&
      prop[1].watchDepth
   );
   return customWatchDepth || defaultWatch;
}

// React Component directive
const reactComponent = function ($injector) {
   return {
      restrict: "E",
      replace: true,
      link: function (scope, elem, attrs) {
         console.log('⚛️', { scope, attrs, elem, })
         const reactComponent = getReactComponent(attrs.name, $injector);

         const renderMyComponent = function () {
            const scopeProps = scope.$eval(attrs.props);
            const props = applyFunctions(scopeProps, scope);
            console.log('⚛️', { props })

            renderComponent(reactComponent, props, scope, elem);
         };

         attrs.props ?
            watchProps(attrs.watchDepth, scope, [attrs.props], renderMyComponent) :
            renderMyComponent();

         scope.$on("$destroy", function () {
            if (!attrs.onScopeDestroy) {
               if (elem[0]._reactRoot) {
                  elem[0]._reactRoot.unmount();
                  delete elem[0]._reactRoot;
               }
            } else {
               scope.$eval(attrs.onScopeDestroy, {
                  unmountComponent: () => {
                     if (elem[0]._reactRoot) {
                        elem[0]._reactRoot.unmount();
                        delete elem[0]._reactRoot;
                     }
                  },
               });
            }
         });
      }
   };
};

// React directive factory
const reactDirective = function ($injector) {
   return function (reactComponentName, staticProps, conf, injectableProps) {
      const directive = {
         restrict: "E",
         replace: true,
         link: function (scope, elem, attrs) {
            const reactComponent = getReactComponent(reactComponentName, $injector);

            let props = staticProps || Object.keys(reactComponent.propTypes || {});
            if (!props.length) {
               const ngAttrNames: number[] = [];
               angular.forEach(attrs.$attr, function (value, key) {
                  ngAttrNames.push(key);
               });
               props = ngAttrNames;
            }

            const renderMyComponent = function () {
               const scopeProps = {}, config = {};
               props.forEach(function (prop) {
                  const propName = getPropName(prop);
                  scopeProps[propName] = scope.$eval(findAttribute(attrs, propName));
                  config[propName] = getPropConfig(prop);
               });
               const finalProps = {
                  ...applyFunctions(scopeProps, scope, config),
                  ...injectableProps
               };
               renderComponent(reactComponent, finalProps, scope, elem);
            };

            const propExpressions = props.map((prop) => {
               return (Array.isArray(prop)) ?
                  [attrs[getPropName(prop)], getPropConfig(prop)] :
                  attrs[prop];
            });

            watchProps(attrs.watchDepth, scope, propExpressions, renderMyComponent);
            renderMyComponent();

            scope.$on("$destroy", function () {
               if (!attrs.onScopeDestroy) {
                  if (elem[0]._reactRoot) {
                     elem[0]._reactRoot.unmount();
                     delete elem[0]._reactRoot;
                  }
               } else {
                  scope.$eval(attrs.onScopeDestroy, {
                     unmountComponent: () => {
                        if (elem[0]._reactRoot) {
                           elem[0]._reactRoot.unmount();
                           delete elem[0]._reactRoot;
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


declare global {
   interface Window {
     _injector: angular.auto.IInjectorService;
     _provide: angular.auto.IProvideService;
   }
 }
// Create and export the module
const ngReact = angular.module("ngReact", [])
   .directive("reactComponent", ["$injector", reactComponent])
   .factory("reactDirective", ["$injector", reactDirective]);

ngReact.run(["$injector", ($injector: angular.auto.IInjectorService) => {
   window._injector = $injector;
}]);

export default ngReact;
