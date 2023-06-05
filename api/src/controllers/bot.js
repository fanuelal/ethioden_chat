import { OpenAIApi, Configuration } from "openai";
import dotenv from "dotenv";

dotenv.config()


process.env.OPENAIAPI_KEY
export const getsuggestion = async (req, res) => {
    const body = res.body
    console.log(process.env.OPENAIAPI_KEY)
    const configuration = new Configuration({
        organization: "org-vkQRRakXrAGu0BiRNtpKHjHe",
        apikey: process.env.OPENAIAPI_KEY});
    const openai = new OpenAIApi(configuration);
    try{
        const completion = await openai.createCompletion(
            {
              model: "gpt-3.5-turbo",
              prompt: "Hello world",
            },
            {
              timeout: 1000,
            }
          );
        return res.status(200).json({success: false, data: completion.data.choices[0].text, message: `answered success!`});
    }catch(error){
        return res.status(200).json({success: false, data: null, message: `error on finding suggestion ${error}`});
     }
}