//function that takes in flattened array of user objects and returns
//array of objects sorted and grouped by first letter of first or last name
export default function sortAndGroupByFirstLetter(arr, position){
      var sortedUsers= arr.sort((a, b) => {
        if(a.name[position] < b.name[position]) return -1;
        if(a.name[position] > b.name[position]) return 1;
        return 0;
      });
      sortedUsers= configureNameCityDOB(sortedUsers);
      return groupUsersByFirstLetter(sortedUsers, position);
    };


function configureNameCityDOB(arr){
  return arr.map((user) => {
    user.location.city= capitalizeFirstLetter(user.location.city);
    user.name.first= capitalizeFirstLetter(user.name.first);
    user.name.last= capitalizeFirstLetter(user.name.last);
    user.dob= trimDOB(user.dob);
    return user;
  })
}

function capitalizeFirstLetter(str){
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function trimDOB(str){
  var strArr= str.split(' ');
  return strArr[0];
}

function groupUsersByFirstLetter(sortedUsers, position){
  var finalResults= [];
  var tempResults= [sortedUsers[0]];
  for (var i= 1; i< sortedUsers.length; i++){
    if (sortedUsers[i].name[position].charAt(0) === sortedUsers[i-1].name[position].charAt(0)){
      tempResults.push(sortedUsers[i]);
    }else {
      finalResults.push({firstLetter: sortedUsers[i-1].name[position].charAt(0), users: tempResults.slice(0)});
      tempResults= [sortedUsers[i]];
    }
  }
  finalResults.push({firstLetter: sortedUsers[sortedUsers.length-1].name[position].charAt(0), users: tempResults.slice(0)});
  return finalResults;
}