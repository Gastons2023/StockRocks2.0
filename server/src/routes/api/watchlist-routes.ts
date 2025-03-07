import express from "express";
import { getWatchList, saveToWatchList } from '../../controllers/watchlist-controller.js'

const router = express.Router();

router.get("/", getWatchList)

router.post("/", saveToWatchList)

export {router as watchlistRouter};
