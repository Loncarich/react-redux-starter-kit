module.exports = {
  capitalizeFirstLetter: function(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  },
  configureNameCityDOB: function(arr){
    return arr.map((user) => {
      user.location.city= this.capitalizeFirstLetter(user.location.city);
      user.name.first= this.capitalizeFirstLetter(user.name.first);
      user.name.last= this.capitalizeFirstLetter(user.name.last);
      user.dob= this.trimDOB(user.dob);
      return user;
    })
  },
  findModalUser: function(arr, username){
    var modalUser= {};
    arr.forEach((letter) => {
      letter.users.forEach((user) => {
        if (user.login.username === username){
          modalUser= user;
        }
      })
    });
    return modalUser;
  },
  flattenAndSortUsers: function(arr, position){
    var tempUsers= [];
    arr.forEach((letter) => {
      letter.users.forEach((user) =>{
        tempUsers.push(user);
      })
    });
    return this.sortAndGroupByFirstLetter(tempUsers, position);
  },
  groupUsersByFirstLetter: function(sortedUsers, position){
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
  },
  searchFilter: function(arr, position, searchTextLower){
    return arr.filter((letter) => {
              var tempLetter= letter.users.filter((user) => {
                var name= user.name[position];
                return name.toLowerCase().match(searchTextLower);
              });
              letter.users= tempLetter;
              return tempLetter.length > 0;
            });
  },
  sortAndGroupByFirstLetter: function(arr, position){
      var sortedUsers= arr.sort((a, b) => {
        if(a.name[position] < b.name[position]) return -1;
        if(a.name[position] > b.name[position]) return 1;
        return 0;
      });
      sortedUsers= this.configureNameCityDOB(sortedUsers);
      return this.groupUsersByFirstLetter(sortedUsers, position);
    },
  trimDOB: function(str){
    var strArr= str.split(' ');
    return strArr[0];
  }
}
