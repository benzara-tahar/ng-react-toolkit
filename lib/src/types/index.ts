// Core services and providers
export type AngularJsCoreInjectTokens =
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
export type InjectToken<T extends AngularJsCoreInjectTokens = never> = AngularJsCoreInjectTokens | T  |  (string & {});