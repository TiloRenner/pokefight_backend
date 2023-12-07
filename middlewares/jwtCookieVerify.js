import jwt from 'jsonwebtoken'
import 'dotenv/config'


const jwtCookieVerify = function (req,res,next)
{
    if(req.cookies !== undefined) 
    {console.log("Cookies:" , req.cookies)}
    const token = req.cookies.pokefight_token;
    if(token)
    {
        try{
            const user = jwt.verify(token,process.env.TOKEN_SECRET);
            req.user = user
            console.log("identified user", user)
            next()
        }
        catch(err)
        {
            console.log("ErrorAuth:", err.message)
            res.clearCookie("pokefight_token");
            res.send({msg:"access denied, please login"})
        }
    }
    else{
        //Check if token in body
        if(req.body)
        {
            if(req.body.login_token)
            {
                const login_token = req.body.token;
                const user = jwt.verify(login_token,process.env.TOKEN_SECRET);
                req.user = user
                //Login Token exists
            }
            else
            {
                res.send({msg:"access denied, please login"})
            }
        }
        else
        {
            res.send({msg:"access denied, please login"})
        }

    }
}

function rejectUser(err,res)
{


}

export default jwtCookieVerify;