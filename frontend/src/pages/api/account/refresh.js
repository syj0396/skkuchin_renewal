import { API_URL} from '../../../config/index'
import cookie from 'cookie';

export default async (req, res ) => {
    if (req.method === 'GET'){
        const cookies = cookie.parse(req.headers.cookie ?? '');
        const refresh = cookies.refresh ?? false;

        if(refresh === false){
            return res.status(401).json({
                error: "User unauthorized to make this request"
            });
        }

        try {
            const apiRes = await fetch(`${API_URL}/api/token/refresh`,{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization' : `Bearer ${refresh}`
                }
            })

            const resValue = await apiRes.json();

            if(apiRes.status === 200){
                res.setHeader('Set-Cookie', [
                    cookie.serialize(
                        'access', resValue.data.access, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV !== 'prod',
                            maxAge: 60*30,
                            sameSite: 'strict',
                            path:'/api/'
                        }
                    ),
                    cookie.serialize(
                        'refresh', resValue.data.refresh, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV !== 'prod',
                            maxAge: 60*60*24,
                            sameSite: 'strict',
                            path:'/api/'
                        }
                    )
                ]);
                return res.status(200).json({
                    success: 'Refresh request successful'
                });
            }else{
                return res.status(apiRes.status).json({
                    error: 'Failed to fulfill refresh request'
                });
            }
        } catch (error) {
            return res.status(500).json({
                error: 'Something went wrong when trying to fulfill refresh request'
            });
        }
    } else{
        res.setHeader('Allow', ['GET']);
        return res.status(405).json(
            { error: `Method ${req.method} not allowed`}
        )
    }
};