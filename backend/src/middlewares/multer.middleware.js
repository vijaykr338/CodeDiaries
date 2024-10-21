import multer from 'multer'
import path from 'path'
import { v4 as uuid} from 'uuid'

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
      cb(null, './public')
    },

    filename: function (req, file, cb) {
        // console.log("file",file);
        const extension = path.extname(file.originalname)
        const baseName = path.basename(file.originalname,extension)
        const suffix = uuid()

        cb(null, `${baseName}${suffix}${extension}`)
    }

  })
  
export const upload = multer({
    storage
})