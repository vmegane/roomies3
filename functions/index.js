const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);



const createNotifcation = ((notification, home_id) => {
    return admin.firestore().collection(`homes/${home_id}/notifications`)
        .add(notification)
        .then(doc => console.log('notification added', doc))
})

exports.messageAdded = functions.firestore
    .document('homes/{homeId}/messages/{messageId}')
    .onCreate((snapshot, context) => {
        const message = snapshot.data();
        // console.log('message', message)
        const home_id = context.params.homeId;
        const notification = {
            content: `New message was added by ${message.author}.`,
            user: message.author,
            time: admin.firestore.FieldValue.serverTimestamp()
        }
        return createNotifcation(notification, home_id);
    })

exports.userJoined = functions.firestore
    .document('homes/{homeId}')
    .onUpdate((change, context) => {
        const newValue = change.after.data();
        const previousValue = change.before.data();
        if (newValue.roommates != previousValue.roommates) {
            const home_id = context.params.homeId;
            const notification = {
                content: 'New roommate joined your home',
                time: admin.firestore.FieldValue.serverTimestamp()
            }
            return createNotifcation(notification, home_id);   
        }
                 
    })

    exports.homeCreated = functions.firestore
    .document('homes/{homeId}')
    .onCreate((snapshot, context) => {
        const home = snapshot.data();
        // console.log('message', message)
        const home_id = context.params.homeId;
        const notification = {
            content: `${home.homeName} was successfully created`,
            time: admin.firestore.FieldValue.serverTimestamp()
        }
        return createNotifcation(notification, home_id);
    })