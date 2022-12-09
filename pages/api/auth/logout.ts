import nextConnect from "next-connect";
import APIService from "services/api.service";
import cookie from 'js-cookie';
const handler = nextConnect()

export default handler.post(async (req: any, res: any) => {
    try{
        cookie.remove("accessToken");
        res.send(205).json(null)
    }catch(e){
        res.send(403).json(e)
    }
})