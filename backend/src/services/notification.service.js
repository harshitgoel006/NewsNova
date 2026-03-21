import { Notification } from "../models/notification.model.js";
import { ApiError } from "../utils/ApiError.js";
import { getPagination } from "../utils/pagination.js";
import { buildPaginationMeta } from "../utils/paginationMeta.js";

export const notificationService = {

//////////////////////////////////////////////////////////
// CREATE
//////////////////////////////////////////////////////////

async createNotification(data){
  return await Notification.create(data);
},

//////////////////////////////////////////////////////////
// GET (WITH PAGINATION 🔥)
//////////////////////////////////////////////////////////

async getUserNotifications(userId, query){

  const { page, limit, skip } = getPagination(query);

  const [data, total] = await Promise.all([
    Notification.find({ user: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Notification.countDocuments({ user: userId })
  ]);

  return {
    data,
    meta: buildPaginationMeta(total, page, limit)
  };
},

//////////////////////////////////////////////////////////
// MARK READ
//////////////////////////////////////////////////////////

async markAsRead(userId, id){

  const notification = await Notification.findOneAndUpdate(
    { _id: id, user: userId },
    { isRead: true },
    { new: true }
  );

  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  return notification;
},

//////////////////////////////////////////////////////////
// CLEAR
//////////////////////////////////////////////////////////

async clearNotifications(userId){
  await Notification.deleteMany({ user: userId });
  return true;
}

};