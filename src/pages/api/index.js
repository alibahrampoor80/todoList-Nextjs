export default function handler(req, res) {
    const {body} = req
    console.log(res)
    return res.status(200).json({name: 'ali'})
}