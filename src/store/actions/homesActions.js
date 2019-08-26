export const createHome = (home) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        const firestore = getFirestore();
        const ownerData = getState().firebase.profile;
        const ownerId = getState().firebase.auth.uid;
        firestore.collection('homes').add({
            ...home,
            owner: ownerData.firstName + ' ' + ownerData.lastName,
            ownerId: ownerId,
            timeStamp: new Date(),
            roommates: [ {
                user: ownerData.firstName + ' ' + ownerData.lastName, 
                userId: ownerId,
                isOwner: true }]
        }).then((response) => {
            //console.log('resp after create', response)
             firestore.collection('users').doc(ownerId).update({
                home: response.id
             })
        }).then(() => {
            dispatch({ type: 'ADD_HOME', home })
        }).catch((err) => {
            dispatch({ type: 'ADD_HOME_ERROR', err })
        })

    }
}

export const addMessage = (home, message) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const user = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        firestore.collection('homes').doc(home).collection('messages').add({
            message: message,
            author: user.firstName + ' ' + user.lastName,
            authorId: authorId,
            authorInitials: user.initials,
            timeStamp: new Date()
        }).then(() => {
            dispatch({ type: 'ADD_MESSAGE', message })
        }).catch((err) => {
            dispatch({ type: 'ADD_MESSAGE_ERROR', err })
        })

    }
}

export const joinHome = (home) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
console.log('join home triggered', home)
        const firestore = getFirestore();
        const firebase = getFirebase();
        const user = getState().firebase.profile;
        const userId = getState().firebase.auth.uid;
console.log('w dispatch join', user)
        firestore.collection('homes').doc(home).update({
            roommates: firebase.firestore.FieldValue.arrayUnion({
            user: user.firstName + ' ' + user.lastName, 
            userId: userId,
            isOwner: false })
        }).then(() => {
            //console.log('actions join home ', home)
             firestore.collection('users').doc(userId).update({
                home: home
             })
        }).then(() => {
            dispatch({ type: 'JOIN_HOME', user })
        }).catch((err) => {
            dispatch({ type: 'JOIN_HOME_ERROR', err })
        })

    }
}