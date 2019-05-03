import { GET_REF, SET_USER} from './actionTypes'
import * as firebase from 'firebase';



export const getUser = () => {
    return dispatch => {

        const user = {
            firstN: '',
            lastN: '',
            docId: '',
            friendNameArray: [],
            referenceArray: [],
        };
        var db = firebase.firestore();

        db.collection("users").where("uid", "==", firebase.auth().currentUser.uid).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                db.collection("users").doc(doc.id).collection("friends").orderBy("lastN").get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        user.referenceArray.concat([doc.id]);
                        user.friendNameArray.concat([doc.data().firstN + " " + doc.data().lastN]);


                    });
                }).catch(function (error) {
                    alert("Error getting documents: " + error);
                });

                user.firstN = doc.data().firstN;
                user.lastN = doc.data().lastN;
                user.docId = doc.id;

            });
        }).then(()=> {
           dispatch(setUser(user));
           
        }).catch(function (error) {
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

export const getReference = (refpoint) => {
    return {
        type: GET_REF,
        refpoint: refpoint,
    };
};