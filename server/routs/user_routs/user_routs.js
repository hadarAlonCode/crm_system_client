
// import * as jwt from 'jsonwebtoken'

// import User from '../../models/user/user'
// import { failedBody, successfulBody } from '../../tools/routing_tools'
// import { SECRET_KEY } from '../../config/keys'
// import { ROUTES_ERROR_MISSING_BODY_PARAMS, USER_ERROR_LOGIN_FAILED } from '../../config/errors'

// export default (app) => {
//     login(app)
// }

// const loginByPasswordAndEmail = async (
//     email,
//     password,
//     res,
//     body,
//     Model,
// ) => {
//     if (email && password) {
//         const result = await Model.login(email, password)
//         if (result) {
//             res.send(successfulBody(result))
//         } else {
//             res.send(failedBody(USER_ERROR_LOGIN_FAILED))
//         }
//     } else {
//         res.send(failedBody(ROUTES_ERROR_MISSING_BODY_PARAMS))
//     }
// }

// const login = (app) => {
//     app.post('/auth/login', async (req, res) => {
//         const { email, password } = req.body
//         const token = req.headers['access-token']
//         if (token) {
//             jwt.verify(token, SECRET_KEY, async (err, decoded) => {
//                 if (err && !decoded) {
//                     loginByPasswordAndEmail(email, password, res, req.body, User)
//                 } else {
//                     const user = await User.getById(decoded._id)
//                     const {
//                         full_name,
//                         is_active,
//                         _id
//                     } = decoded
//                     let privileges = user
//                     const result = { privileges, full_name, token, is_active, user_id: _id }
//                     res.send(successfulBody(result))
//                 }
//             })
//         } else {
//             loginByPasswordAndEmail(email, password, res, req.body, User)
//         }
//     })
// }