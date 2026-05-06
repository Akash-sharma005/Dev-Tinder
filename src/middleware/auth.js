 const adminAuth = (req, res, next) => {
    console.log("Admin auth is getting checked")
    const token = "xxyyx";
    const isAuthorize = token === "xxyyx";
    if (!isAuthorize) {
        res.status(401).send("Unauthorised request")
    }
    else {
        next();
    }
}

 const userAuth = (req, res, next) => {
    console.log("User auth is getting checked")
    const token = "xxyy";
    const isAuthorize = token === "xxyyx";
    if (!isAuthorize) {
        res.status(401).send("Unauthorised request")
    }
    else {
        next();
    }
}

module.exports={adminAuth,userAuth}