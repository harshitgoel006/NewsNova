import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { notificationService } from "../services/notification.service.js";

const getNotifications = asyncHandler(async (req,res)=>{

  const notifications =
    await notificationService.getUserNotifications(
      req.user._id,
      req.query
    );

  return res.status(200).json(
    new ApiResponse(
      200,
      notifications,
      "Notifications fetched"
    )
  );

});

const markNotificationRead = asyncHandler(async (req,res)=>{

  const notification =
    await notificationService.markAsRead(
      req.user._id,
      req.params.id
    );

  return res.status(200).json(
    new ApiResponse(
      200,
      notification,
      "Notification marked as read"
    )
  );

});

const clearNotifications = asyncHandler(async (req,res)=>{

  await notificationService.clearNotifications(
    req.user._id
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      {},
      "Notifications cleared"
    )
  );

});

export {
  getNotifications,
  markNotificationRead,
  clearNotifications
};