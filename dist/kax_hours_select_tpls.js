(function() {
    // Code goes here
    'use strict';

    angular.module('kaxHoursSelect', ['autocomplete'])
        .directive('kaxHoursSelect', function() {
            return {
                templateUrl: 'kax-hours-select.html',
                restrict: 'AE',
                scope: {
                    selectedHours: '='
                },
                bindToController: true,
                controller: function() {
                    var self = this;
                    self.applyToAll = false;
                    self.addHours = addHours;
                    self.cannotAddHour = cannotAddHour;
                    //keep track of from hour at any poin of time
                    self.fromHr = undefined;
                    //keep track of to hour at any point of time
                    self.toHr = undefined;
                    //keep track of selected days at any point of time
                    self.days = [];

                    function cannotAddHour() {
                        var result = self.days.length < 1 || self.fromHr === undefined || self.toHr === undefined;
                        return result;
                    }

                    function addHours() {
                        self.days.forEach(function(day) {
                            var hour = {
                                day: day,
                                from: self.fromHr,
                                to: self.toHr
                            };
                            self.selectedHours.push(hour);
                        });
                    }
                },
                controllerAs: 'kaxHoursSelectCtrl'
            };
        })
        .directive('hourField', function() {
            return {
                restrict: 'AE',
                require: ['^kaxHoursSelect', 'hourField'],
                scope: {
                    fromLabel: '@',
                    toLabel: '@'
                },
                templateUrl: 'hour-field.html',
                bindToController: true,
                controllerAs: 'hourCtrl',
                controller: function() {
                    var self = this;
                    self.updateHours = updateHours;

                    function updateHours(typed) {
                        typed = parseInt(typed);
                        if (typed === 0) {
                            self.hours = getSubHrs(10);
                            return;
                        }
                        if (typed && typed > 0 && typed <= 12) {
                            self.hours = getSubHrs(typed);
                        } else {
                            self.hours = [];
                        }
                    }

                    function getSubHrs(hr) {
                        var hrs = [];
                        for (var i = 0; i <= 45; i += 15) {
                            if (i === 0) {
                                hrs.push(hr + ':' + i + '' + i + ' ' + 'am');
                                hrs.push(hr + ':' + i + '' + i + ' ' + 'pm');
                            } else {
                                hrs.push(hr + ':' + i + ' ' + 'am');
                                hrs.push(hr + ':' + i + ' ' + 'pm');
                            }
                        }
                        return hrs;
                    }
                },
                link: function(scope, elem, attrs, ctrls) {
                    var kaxHoursSelectCtrl = ctrls[0];
                    var hourFieldCtrl = ctrls[1];

                    var input = elem.find('input');
                    input.on('keypress', function(event) {
                        if (event.which < 48 || event.which > 57) {
                            event.preventDefault();
                        }
                    });

                    scope.$watch(function() {
                        return hourFieldCtrl.fromHour;
                    }, function(current, previous) {
                        if (current !== previous) {
                            kaxHoursSelectCtrl.fromHr = current;
                            return;
                        }
                    });
                    scope.$watch(function() {
                        return hourFieldCtrl.toHour;
                    }, function(current, previous) {
                        if (current !== previous) {
                            kaxHoursSelectCtrl.toHr = current;
                            return;
                        }
                    });


                }

            };
        })
        .directive('dayField', function() {
            return {
                templateUrl: 'day-field.html',
                require: ['^kaxHoursSelect', 'dayField'],
                scope: {},
                controller: function() {
                    var self = this;
                    self.days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                    self.selectedDays = [];
                    self.selectDay = selectDay;
                    self.isSelected = isSelected;
                    self.selectAll = selectAll;

                    function selectAll(isSelectAll) {
                        if (isSelectAll) {
                            self.selectedDays = self.days;
                        } else {
                            self.selectedDays = [];
                        }
                    }

                    function isSelected(day) {
                        var exist = self.selectedDays.some(function(value) {
                            return day === value;
                        });
                        return exist ? 'day-selected' : ' ';
                    }

                    function selectDay(day) {
                        var existIndex;
                        self.selectedDays.forEach(function(value, index) {
                            if (day === value) {
                                existIndex = index;
                                return;
                            }
                        });
                        if (existIndex !== undefined) {
                            self.selectedDays.splice(existIndex, 1);
                        } else {
                            self.selectedDays.push(day);
                        }
                    }
                },
                controllerAs: 'dayCtrl',
                link: function(scope, elem, attrs, ctrls) {
                    var kaxHoursSelectCtrl = ctrls[0];
                    var dayFieldCtrl = ctrls[1];

                    //watch apply to all selected
                    scope.$watch(function() {
                        return kaxHoursSelectCtrl.applyToAll;
                    }, function(current, previous) {
                        if (current !== previous) {
                            if (current) {
                                dayFieldCtrl.selectAll(true);
                            } else {
                                dayFieldCtrl.selectAll(false);
                            }
                        }
                    });

                    //sync days selected
                    scope.$watch(function() {
                        var result = dayFieldCtrl.selectedDays.length;
                        return result;
                    }, function(current, previous) {
                        if (current !== previous) {
                            kaxHoursSelectCtrl.days = dayFieldCtrl.selectedDays;
                        }
                    });
                },
            };
        })
        .run(['$templateCache', function($templateCache) {
            'use strict';

            $templateCache.put('day-field.html',
                "<div class=\"day-field\">\n" +
                "  <ul>\n" +
                "    <li ng-repeat=\"day in dayCtrl.days\" >\n" +
                "      <button  ng-class=\"dayCtrl.isSelected(day)\" \n" +
                "      ng-click=\"dayCtrl.selectDay(day)\"\n" +
                "      >{{day}}</button>\n" +
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
                "    <hour-field ></hour-field>\n" +
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

        }])
})();
