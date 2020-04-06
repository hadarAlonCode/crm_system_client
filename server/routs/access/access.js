// import * as express from 'express'
// import * as jwt from 'jsonwebtoken'
// import { SECRET_KEY } from '../../config/keys'
// import * as _ from 'lodash'
// import { sendErrorMail } from '../../tools/error_tools'
// import { failedBody } from '../../tools/routing_tools'
// import somerouts from './somerouts'
// import somerouts from './somerouts'
// import somerouts from './somerouts'



// const backofficeRoutes = (app) => {

//     const ProtectedRoutes = express.Router()
//     app.use('/access', ProtectedRoutes)
//     ProtectedRoutes.use((req, res, next) => {
//         const token = req.headers['access-token']
//         if (token) {
//             jwt.verify(token, SECRET_KEY, (err, decoded) => {
//                 if (err) {
//                     sendErrorMail(err, 'Error While Verifying JWT Token At Protected Routes')
//                     return res.json(failedBody('invalid token'))
//                 } else {
//                     req.decoded = decoded
//                     next()
//                 }
//             })
//         } else {
//             res.send(failedBody('missing token'))
//         }
//     })

//     somerouts(ProtectedRoutes)
//     somerouts(ProtectedRoutes)
//     somerouts(ProtectedRoutes)
// }




// export default backofficeRoutes