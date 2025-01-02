export default async function handler(req, res) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('Request IP:', ip);
    console.log(req);
    console.log(req.connection);

    res.status(200).json('ok');
}

