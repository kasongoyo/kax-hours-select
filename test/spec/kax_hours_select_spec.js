(function() {
    'use strict';
    //dependencies
    var chai = require('chai');
    var spies = require('chai-spies');
    var faker = require('faker');
    chai.use(spies);
    var expect = chai.expect;

    describe('Directive: Hours select', function() {

        //load templates used by this directive
        beforeEach(angular.mock.module('kax.templates'));

        // load the directive's module
        beforeEach(angular.mock.module('kaxHoursSelect'));

        var element, scope, kaxHoursSelectCtrl;
        beforeEach(inject(function($rootScope, $compile) {
            scope = $rootScope.$new();

            scope.onAdd = chai.spy(function(hours) {
                scope.selectedHours = hours;
            });
            element = angular.element('<kax-hours-select on-click-add="onAdd(selectedHours)"></kax-hours-select>');
            element = $compile(element)(scope);
            scope.$digest();
            kaxHoursSelectCtrl = element.controller('kaxHoursSelect');
        }));

        it('directive should exist', function() {
            expect(element).to.exist;
            expect(element.find('hour-field')).to.exist;
            expect(element.find('day-field')).to.exist;
        });

        it('should call onClickAdd(selectedHours) when add button is clicked', function() {
            kaxHoursSelectCtrl.fromHr = '8:00 am';
            kaxHoursSelectCtrl.toHr = '8:00 pm';
            kaxHoursSelectCtrl.days = ['Mon', 'Tue'];
            kaxHoursSelectCtrl.addHours();
            expect(scope.onAdd).to.have.been.called();
            expect(scope.selectedHours).to.exist;
            expect(scope.selectedHours).not.to.be.empty;
        });
    });
})();
