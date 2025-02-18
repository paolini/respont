import { NextApiRequest, NextApiResponse } from 'next'

import User, { IGetUser } from '@/models/User'
import getSessionUser from '@/lib/getSessionUser'

// const delay = (ms:number) => new Promise(res => setTimeout(res, ms));

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse) {
        // await delay(8000)
        const sessionUser = await getSessionUser(req)
        if (!sessionUser) {
            return res.json(null)
            // return res.status(401).json({error: 'not authenticated'})
        }
        if (req.method === 'GET') {
            const user = await User.findOne({_id: sessionUser._id})
            if (!user) {
                return res.json({
                    _id: null,
                    notLoggedIn: true,
                })
            }
            const profile: IGetUser = {
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                isTeacher: user.isTeacher,
                isStudent: user.isStudent,
                isAdmin: user.isAdmin,
                isSuper: user.isSuper,
                isViewer: user.isViewer,
                image: user.image,
                accounts: user.accounts,
            }   
            return res.json(profile)
        }

        if (req.method === 'PATCH') {
            const { name, isTeacher, isStudent } = JSON.parse(req.body)
            const out = await User.findOneAndUpdate({_id: sessionUser._id}, {
                name,
                isTeacher,
                isStudent,
            })
            if (!out) {
                return res.status(404).json({error: 'not found'})
            }
            return res.json({ok: true})
        }
    }