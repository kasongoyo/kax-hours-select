angular.module('kaxHoursSelect')
.run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('day-field.html',
    "<div class=\"day-field\">\n" +
    "  <ul>\n" +
    "    <li ng-repeat=\"day in dayCtrl.days\">\n" +
    "      <button ng-class=\"dayCtrl.isSelected(day)\" ng-click=\"dayCtrl.selectDay(day)\">{{day}}</button>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</div>"
  );


  $templateCache.put('hour-field.html',
    "<div class=\"hour-field\">\n" +
    "    <label for=\"hour\">{{hourCtrl.fromLabel}}</label>&nbsp;\n" +
    "    <autocomplete data=\"hourCtrl.hours\" ng-model=\"hourCtrl.fromHour\" attr-placeholder=\"hh:mm\" on-type=\"hourCtrl.updateHours\"></autocomplete>\n" +
    "    &nbsp;&nbsp;{{hourCtrl.toLabel}} &nbsp;\n" +
    "    <autocomplete data=\"hourCtrl.hours\" ng-model=\"hourCtrl.toHour\" attr-placeholder=\"hh:mm\" on-type=\"hourCtrl.updateHours\"></autocomplete>\n" +
    "</div>\n"
  );


  $templateCache.put('kax-hours-select.html',
    "<div class=\"kax-hour-select\">\n" +
    "    <hour-field from-label=\"From\" to-label=\"To\"></hour-field>\n" +
    "    <day-field></day-field>\n" +
    "    <div class=\"action-row\">\n" +
    "        <div class=\"left-side inline-field\">\n" +
    "            <input type=\"checkbox\" ng-model=\"kaxHoursSelectCtrl.applyToAll\" />\n" +
    "            <label for=\"applyToAll\">Apply to all days</label>\n" +
    "        </div>\n" +
    "        <div class=\"right-side\">\n" +
    "            <button ng-disabled=\"kaxHoursSelectCtrl.cannotAddHour()\" ng-click=\"kaxHoursSelectCtrl.addHours()\">Add</button>\n" +
    "            <button>Cancel</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );

}]);
