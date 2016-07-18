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

        it('hourField and dayField controller should exist', function() {
            var hourFieldCtrl = element.find('hour-field').controller('hourField');
            var dayFieldCtrl = element.find('day-field').controller('dayField');
            expect(hourFieldCtrl).to.exist;
            expect(dayFieldCtrl).to.exist;
        });


        it('should call onClickAdd(selectedHours) when add button is clicked', function() {
            kaxHoursSelectCtrl.fromHr = '8:00 am';
            kaxHoursSelectCtrl.toHr = '8:00 pm';
            kaxHoursSelectCtrl.days = ['Mon', 'Tue'];
            // click add button
            element.find('button').triggerHandler('click');
            expect(scope.onAdd).to.have.been.called();
            expect(scope.selectedHours).to.exist;
            expect(scope.selectedHours).not.to.be.empty;
        });

        it('should clean selected hours reference after executing onClickAdd() function', function() {
            kaxHoursSelectCtrl.fromHr = '8:00 am';
            kaxHoursSelectCtrl.toHr = '8:00 pm';
            kaxHoursSelectCtrl.days = ['Mon', 'Tue'];
            // click add button
            element.find('button').triggerHandler('click');
            expect(kaxHoursSelectCtrl.days).to.be.empty;
            expect(kaxHoursSelectCtrl.fromHr).to.be.undefined;
            expect(kaxHoursSelectCtrl.toHr).to.be.undefined;
        });

        it('should clean references of hourField and dayField as well after onClickAdd', function() {
            kaxHoursSelectCtrl.fromHr = '8:00 am';
            kaxHoursSelectCtrl.toHr = '8:00 pm';
            kaxHoursSelectCtrl.days = ['Mon', 'Tue'];
            var hourFieldCtrl = element.find('hour-field').controller('hourField');
            var dayFieldCtrl = element.find('day-field').controller('dayField');
            // click add button
            element.find('button').triggerHandler('click');
            expect(dayFieldCtrl.selectedDays).to.be.empty;
            expect(hourFieldCtrl.fromHour).to.be.undefined;
            expect(hourFieldCtrl.toHour).to.be.undefined;
        });
    });
})();
