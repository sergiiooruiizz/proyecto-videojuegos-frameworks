export const comprobarApiKey = (req, res, next) => {
    const apiKeyHeader = req.headers['x-api-key'];

    if (!apiKeyHeader) {
        return res.status(401).json({
            error: "No autorizado. Falta la API Key."
        });
    }

    if (apiKeyHeader !== process.env.API_KEY) {
        return res.status(401).json({
            error: "No autorizado. API Key incorrecta."
        });
    }

    next();
};