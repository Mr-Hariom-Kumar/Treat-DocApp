import expresss from  'express'
import { doctorList } from '../controller/doctorController.js'

const doctorRouter=expresss.Router()
doctorRouter.get('/list',doctorList)

export default doctorRouter