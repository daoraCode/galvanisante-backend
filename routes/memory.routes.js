import express from "express"
import cookieParser from "cookie-parser"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import multer from "multer"
import fs from "fs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const uploadMiddleware = multer({ dest: "uploads/" })

import {
  getAllMemories,
  getMemory,
  // createMemory,
  deleteMemory,
  updateMemory,
} from "../controllers/memory.controller.js"

import Memory from "../models/Memory.js"

import { isAuth } from '../middlewares/isAuth.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const MemoryRouter = express.Router()

MemoryRouter.post(
  '/memory/create',
  isAuth,
  uploadMiddleware.single('cover'),
  async (req, res) => {
    // console.log(req.file)
    const { originalname } = req.file
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1]
    const newPath = req.file.path + '.' + ext

    fs.renameSync(req.file.path, newPath)

    const newMemory = new Memory()
    newMemory.theme = req.body.theme
    newMemory.cover = req.body.cover
    newMemory.cover = newPath
    newMemory.content = req.body.content
    newMemory.creator = req.user.id
    // newMemory.creator =
    await newMemory.save()
    res.json({
      newMemory: newMemory,
    })
    // console.log(newMemory)
  }
)

MemoryRouter.get('/memory', isAuth, getAllMemories)
MemoryRouter.get('/memory/:id', isAuth, getMemory)
MemoryRouter.delete('/memory/delete/:id', isAuth, deleteMemory)
MemoryRouter.post("/memory/update/:id", isAuth, updateMemory)

export default MemoryRouter
