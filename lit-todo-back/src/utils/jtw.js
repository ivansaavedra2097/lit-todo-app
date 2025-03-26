import jwt from 'jsonwebtoken';

const getToken = ( authorization ) => {
    const bearerToken = authorization ?? null;
    if( !bearerToken || bearerToken.includes("null")) throw new Error(
        "No token included"
    );
    return bearerToken.split(" ")[1];
}

export class JWT {

    static verify( authorization ) {
        return new Promise((resolve, reject) => {
            try {
                const token = getToken( authorization );
                jwt.verify(
                    token,
                    process.env.SECRET_JWT,
                    async (err, decoded) => {
                        if (err) reject(err);
                        resolve( decoded );
                    }
                );
            } catch (error) {
                reject( error.message );
            }
        })
    }
}