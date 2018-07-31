const users_permissions = [
  { userid: "1",
    permissionid: "3"
  },
  { userid: "1",
    permissionid: "2"
  },
  { userid: "2",
    permissionid: "1"
  },
  { userid: "3",
    permissionid: "1"
  },
  { userid: "3",
    permissionid: "3"
  }];

class Auth {

  constructor() {
    this.isAllowed = false;
  }

  can(userId, permissionid) {
    users_permissions.forEach(element => {
      if (userId == element.userid) {
        if (element.permissionid == permissionid) {
          console.log('true');
        } else {
          console.log('false');
        }
      }
    });
  }
}

const auth = new Auth;

const userid = auth.can('1', '2');
console.log(userid);


  // console.log(users_permissions);
