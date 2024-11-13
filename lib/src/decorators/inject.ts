


// Core services and providers
export type AngularJsInjectTokens =
    // Core services
    '$anchorScroll' |
    '$animate' |
    '$cacheFactory' |
    '$compile' |
    '$controller' |
    '$document' |
    '$exceptionHandler' |
    '$filter' |
    '$http' |
    '$httpBackend' |
    '$httpParamSerializer' |
    '$httpParamSerializerJQLike' |
    '$interpolate' |
    '$interval' |
    '$locale' |
    '$location' |
    '$log' |
    '$parse' |
    '$q' |
    '$rootElement' |
    '$rootScope' |
    '$scope' |
    '$sce' |
    '$sceDelegate' |
    '$templateCache' |
    '$templateRequest' |
    '$timeout' |
    '$window' |
    '$xhrFactory' |

    // Additional services
    '$cookies' |
    '$cookieStore' |
    '$resource' |
    '$route' |
    '$routeParams' |
    '$routeProvider' |
    '$sanitize' |
    '$swipe' |

    // Provider tokens
    '$animateProvider' |
    '$compileProvider' |
    '$controllerProvider' |
    '$filterProvider' |
    '$httpProvider' |
    '$interpolateProvider' |
    '$locationProvider' |
    '$logProvider' |
    '$parseProvider' |
    '$rootScopeProvider' |
    '$sceDelegateProvider' |
    '$sceProvider' |
    '$templateRequestProvider' |

    // Constants and values
    '$window' |
    '$document' |

    // UI-Router specific
    '$state' |
    '$stateParams' |
    '$stateProvider' |
    '$urlRouter' |
    '$urlRouterProvider' |
    '$uiViewScroll' |

    // Form validation
    '$validator' |
    '$asyncValidator' |

    // Modal service
    '$modal' |
    '$modalInstance' |
    '$modalStack' |

    // Common module services
    '$base64' |
    '$drag' |
    '$drop' |
    '$position' |
    '$scrollspy' |
    '$tooltip' |
    '$transition';

// Create a generic type parameter for user-defined service types
export type Injectable<T extends AngularJsInjectTokens = never> = AngularJsInjectTokens | T  |  (string & {});
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
