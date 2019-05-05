import { GET_REF, SET_USER,GET_LOGIN } from './actionTypes'
import * as firebase from 'firebase';




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
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    db.collection("users").doc(doc.id).collection("friends").orderBy("lastN").get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {

                                user.referenceArray.push(doc.id);
                                user.friendNameArray.push(doc.data().firstN + " " + doc.data().lastN);


                            });

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

                });
            }).then(() => {
                
                dispatch(setUser(user));
                
                

            }).then(() => {
                    dispatch(getLogin());
                  

                

            }).catch( (error) => {
                alert("Error getting documents: " + error);
            });


           

    };
    
};

export const setUser = (user) => {
    return {
        type: SET_USER,
        user: user,
    };
};
export const getLogin = () => {
    return {
        type: GET_LOGIN,
    };
};

export const getReference = (refpoint) => {
    return {
        type: GET_REF,
        refpoint: refpoint,
    };
};