import { Business, Notification } from '../models';


export const validateUserRight = (businessId, userId) => { 
  const promise = new Promise((resolve, reject) => {
    Business
      .findById(businessId)
      .then((businessFound) => {
        if (Number(businessFound.userId) !== Number(userId)) {
          reject({
            status: 401,
            message: 'You cannot modify a business not created by You!'
          });
        }
        resolve(businessFound);
      });
  });
  return promise;
};

export const validateNotificationOwner = (notificationId, userId) => { 
  const promise = new Promise((resolve, reject) => {
    Notification
      .findById(notificationId)
      .then((notification) => {
        if (Number(notification.userId) !== Number(userId)) {
          reject({
            status: 401,
            message: 'You cannot view or modify a notification that is not yours'
          });
        }
        resolve(notification);
      });
  });
  return promise;
};
