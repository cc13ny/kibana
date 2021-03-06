import _ from 'lodash';
import chrome from 'ui/chrome/chrome';
import breadCrumbsTemplate from './bread_crumbs.html';
import { getBreadCrumbUrls } from './bread_crumb_urls';
import uiModules from 'ui/modules';
const module = uiModules.get('kibana');

module.directive('breadCrumbs', function ($location) {
  return {
    restrict: 'E',
    scope: {
      omitCurrentPage: '=',
      /**
       * Optional title to append at the end of the breadcrumbs
       * @type {String}
       */
      title: '=',
      /**
       * If true, makes each breadcrumb a clickable link.
       * @type {String}
       */
      useLinks: '='
    },
    template: breadCrumbsTemplate,
    controller: function ($scope) {
      // Capitalize the first letter of each bread crumb.
      $scope.breadcrumbs = chrome.getBreadcrumbs().map(breadcrumb => _.startCase(breadcrumb));

      if ($scope.omitCurrentPage === true) {
        $scope.breadcrumbs.pop();
      }

      if ($scope.useLinks) {
        const url = '#' + $location.path();
        $scope.breadCrumbUrls = getBreadCrumbUrls($scope.breadcrumbs, url);
      }
    }
  };
});
