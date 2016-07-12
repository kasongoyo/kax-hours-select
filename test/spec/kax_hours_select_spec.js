(function() {
    'use strict';

    describe('Directive: Hours select', function() {

    	   //load templates used by this directive
        beforeEach(angular.mock.module('kax.templates'));

        // load the directive's module
        beforeEach(angular.mock.module('kaxHoursSelect'));

        var element,
            scope;

        beforeEach(inject(function($rootScope, $compile) {
            scope = $rootScope.$new();
            element = angular.element('<kax-hours-select></kax-hours-select>');
            element = $compile(element)(scope);
            scope.$digest();
        }));

        it('directive should exist', function() {
            expect(element).to.exist;
            expect(element.find('hour-field')).to.exist;
            expect(element.find('day-field')).to.exist;
        });
    });
})();
