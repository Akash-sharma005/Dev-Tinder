const express = require('express')
const userRouter = express.Router();
const { userAuth } = require('../middleware/auth')
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user")

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills"


userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user //virat kohli

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            // status: "interested"
        }).populate("fromUserId", USER_SAFE_DATA)

        if (connectionRequest.length === 0) {
            return res.send({
                message: "No requests pending.."
            })
        }
        connectionRequest.forEach((req) => {
            console.log(req.fromUserId)
        })

        res.send({
            message: "Data fetched successfully",
            data: connectionRequest
        })

    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
})

userRouter.get("/user/requests/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser, status: "accepted" },
                { toUserId: loggedInUser, status: "accepted" }
            ],
        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA)


        if (connectionRequest.length === 0) {
            return res.send({
                message: "Connection not found.."
            })
        }

        const data = connectionRequest.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            else {
                return row.fromUserId
            }
        })

        res.send({
            message: "Data feteched successfully",
            data
        })


    } catch (err) {
        res.status(400).send({ message: err.message });
    }
})

userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const page= parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip =(page-1)*limit
        limit = limit > 50 ? 50 : limit

        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        }).select("fromUserId , toUserId")

        const hideUsersFromFeed = new Set();

        connectionRequest.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString())
            hideUsersFromFeed.add(req.toUserId.toString());
        })

        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUsersFromFeed) } },
                { _id: { $ne: loggedInUser._id } }
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit)

        res.json({users});

    } catch (err) {
        res.send("ERROR : " + err.message);
    }
})
module.exports = userRouter