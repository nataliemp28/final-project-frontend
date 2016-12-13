angular.module('finalProject')
.directive('dragDrop', dragDrop);
function dragDrop(){
  const reader = new FileReader();
  return{
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/dragDrop.html',
    scope: {
      base64: '='
    },
    link($scope, element){
      // console.log(element);
      $scope.base64 = null;
      $scope.active = false;
////////////////////
      // $scope.message = 'Drag your image here';
      // $scope.$watchGroup(['base64', 'src'], () => {
      //   $scope.image = $scope.base64 || $scope.src;
      // });
///////////////////////////////
      reader.onload = () => {
        // console.log(reader.result);
        $scope.base64 = reader.result;
        $scope.$apply();
      };
      element
      .on('dragover', () => {
        $scope.active = true;
        $scope.$apply();
      })
      .on('dragover', (e) =>{
        e.preventDefault();
        // console.log('success');
      })
      .on('dragleave', () => {
        $scope.active = false;
        $scope.$apply();
      })
      .on('drop', (e)=> {
        e.preventDefault();
        // console.log('over');
        const file = (e.target.files || e.dataTransfer.files)[0];
        reader.readAsDataURL(file); //turn into base64 url encoded
      });
    }
  };
}
