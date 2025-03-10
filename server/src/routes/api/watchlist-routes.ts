import express from "express";
import { getWatchList, saveToWatchList } from '../../controllers/watchlist-controller.js'

const router = express.Router();

router.get("/", getWatchList)

router.post("/", saveToWatchList)
// router.put()
// router.delete()
// router.get("/search") for the search
// Work on lines 9 and 10, and 11.

export {router as watchlistRouter};
