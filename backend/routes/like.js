const express = require("express");
const router = express.Router();
const { Like } = require("../models/like");

router.get("/:id", async (req, res) => {
  try {
    const likes = await Like.getUserLikes(req.params.id);
    console.log("LIKES: ", likes);
    res.send(likes);
  } catch (err) {
    console.log("GET LIKE: ", err);
  }
});

router.post("/user/product", async (req, res) => {
  try {
    const like = await Like.checkIfUserLikedRestaurant(req.body);
    res.send(like);
  } catch (err) {
    console.log("GET LIKE: ", err);
  }
});

router.post("/", async (req, res) => {
  try {
    const like = await Like.checkIfUserLikedRestaurant(req.body);
    console.log("DOES USER LIKE:",like)
    if (like===false) {
      await Like.addUserLike(req.body);
      console.log("Liked");
      res.send("Succesfully liked");
    } else {
      await Like.removeUserLike(req.body);
      console.log("Disliked");
      res.send("Succesfully disliked");
    }
  } catch (err) {
    console.log("add like: ", err);
  }
});

module.exports = router;
