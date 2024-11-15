import angular from "angular";
import 'ng-react-toolkit';
import "zustand";

// apps
import "./app";

// styles
import "purecss/build/pure-min.css";
import "@fontsource/open-sans";
import './styles.css';


// bootrapping 
// Wait for DOM to be ready
angular.element(document).ready(() => {
   // Manually bootstrap both applications
   // angular.bootstrap(document.getElementById('fullAngularjsApp')!, ['fullAngularjsApp']);
   angular.bootstrap(document.getElementById('hybridApp')!, ['hybridApp']);
});

// Ensure proper error handling
// if (module.hot) {
//    module.hot.accept('./services/todo.service', () => {
//         Handle hot module replacement if needed
//    });
// }