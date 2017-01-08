(function() {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        $scope.message = "";
        $scope.items = "";
        $scope.clsName = "";

        $scope.showMessage = function() {
            $scope.message = validate($scope.items);
            //Changing the class name to show the messages in designated colors
            var mesg = $scope.message.toLowerCase();
            $scope.clsName = mesg === 'too much!' || mesg === 'enjoy!' ? 'green' : (mesg === "please enter data first" ? 'red' : "");
        };

        function validate(items) {
            //Messages
            var messages = {
                    'noval': "Please enter data first",
                    'comma': "The value contains only commas",
                    'good': "Enjoy!",
                    'bad': "Too much!"
                }
                //Initial checks and split
            var tmpItems = items.length !== 0 ? items.split(',') : [];

            //initial validational checks
            if (tmpItems.length === 0) {
                return messages['noval'];
            } else if (tmpItems.join('').trim().length === 0) {
                return messages['comma'];
            }

            //Make sure that the array contains only valid items to determine the right output message
            tmpItems = trimArrayElements(tmpItems);

            //Final two validation checks
            if (tmpItems.length < 4) {
                return messages['good'];
            } else {
                return messages['bad'];
            }
        }

        //Function that trims the item values and provide back only valid values
        function trimArrayElements(items) {
            for (var i = 0; i < items.length; i++) {
                if (items[i]) {
                    items[i] = items[i].trim();
                }
            }
            return items.filter(Boolean); //remove the empy strings
        }
    }

})();
