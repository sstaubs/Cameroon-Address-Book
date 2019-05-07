import { GET_REF, SET_USER, SET_FRIEND, SET_LOADED } from './actionTypes'
import * as firebase from 'firebase';

export const editUser = (accountInfo) => {
    return dispatch => {
        var db = firebase.firestore();
        db.collection("users").doc(accountInfo.docId).update({
            firstN: accountInfo.firstN,
            lastN: accountInfo.lastN,
            latiude: accountInfo.latitude,
            longitude: accountInfo.longitude,
            phoneNum: accountInfo.phone,

        })
            .then(() => {
                console.log("Document successfully updated!");
            }).then(() => {
                dispatch(setUser(accountInfo));

            })
            .catch((error) => {
                // The document probably doesn't exist.
                alert("Error updating document: " + error);
            });
    }
}

export const deleteFriend = (userId, ref) => {
    return dispatch => {
        var db = firebase.firestore();

        db.collection("users").doc(userId).collection("friends").doc(ref).delete().then(() => {
            // Friend deleted.

        }).then(() => {
            dispatch(getUser());
        }).catch(() => {
            // An error happened.
        });
    }
}

export const addFriend = (userId, accountInfo) => {
    return dispatch => {
        var db = firebase.firestore();

        db.collection("users").doc(userId).collection("friends").add(accountInfo)
            .then((docRef) => {
                dispatch(getUser());
            }).catch((error) => {
                //alert("error here")
                //alert("Error adding document: " + error);
            });
    }

}


export const editFriend = (userId, ref, accountInfo) => {
    return dispatch => {
        var db = firebase.firestore();
        db.collection("users").doc(userId).collection("friends").doc(ref).update(accountInfo)
            .then(() => {
                console.log("Document successfully updated!");
            }).then(() => {
                dispatch(setFriend(accountInfo));
            }).then(() => {
                dispatch(getUser());
            })
            .catch((error) => {
                // The document probably doesn't exist.
                alert("Error updating document: " + error);
            });

    }
}



export const getUser = () => {
    return dispatch => {

        const user = {
            firstN: '',
            lastN: '',
            docId: '',
            phone: '',
            email: '',
            friendNameArray: [],
            referenceArray: [],
            longitude: 0,
            latitude: 0,
        };
        var db = firebase.firestore();

         db.collection("users").where("uid", "==", firebase.auth().currentUser.uid).get()
            .then( (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    db.collection("users").doc(doc.id).collection("friends").orderBy("lastN").get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {

                                user.referenceArray.push(doc.id);
                                user.friendNameArray.push(doc.data().firstN + " " + doc.data().lastN);


                            });
                            //this code is poorly formatted because it makes it seem like set loaded comes before setUsers which is not the case
                            //however it does work but this code needs to be reset up
                            dispatch(setLoaded());
                            

                        }).catch(function (error) {
                            alert("Error getting documents: " + error);
                        });

                    user.firstN = doc.data().firstN;
                    user.lastN = doc.data().lastN;
                    user.phone = doc.data().phoneNum;
                    user.email = doc.data().email;
                    user.latitude = doc.data().latitude;
                    user.longitude = doc.data().longitude;
                    user.docId = doc.id;
                    //alert(user.friendNameArray[0])
                    dispatch(setUser(user));
                    

                });
            }).then(() => {
                
                

                
                


            }).catch((error) => {
                alert("Error getting documents: " + error);
            });

        


            
    };
    

};

export const getFriend = (userId, ref) => {
    return dispatch => {
        const friend = {
            firstN: '',
            lastN: '',
            docId: ref,
            phone: '',
            email: '',
            longitude: 0,
            latitude: 0,
        }
        var db = firebase.firestore();

        db.collection("users").doc(userId).collection("friends").doc(ref).get()
            .then(doc => {

                friend.firstN = doc.data().firstN;
                friend.lastN = doc.data().lastN;
                friend.phone = doc.data().phoneNum;
                friend.email = doc.data().email;
                friend.latitude = doc.data().latitude;
                friend.longitude = doc.data().longitude;
            }).then(() => {
                dispatch(setFriend(friend));
            }).catch(function (error) {
                alert("Error getting documents: " + error);
            });


    }
}


export const setUser = (user) => {
     return  {
        type: SET_USER,
        user: user,
    };
};

export const setFriend = (friend) => {
    return {
        type: SET_FRIEND,
        friend: friend,
    };
};



export const getReference = (refpoint) => {
    return {
        type: GET_REF,
        refpoint: refpoint,
    };
};

export const setLoaded = () => {
    return {
        
        type: SET_LOADED,

    };
};