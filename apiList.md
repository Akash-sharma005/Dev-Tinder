# DevTinder Api's

# authRouter
- POST /auth/signup
- POST /auth/login
- POST /auth/logout

# profileRouter
- GET/profile/view
- PATCH/profile/update
- PATCH/profile/password

# connectionRequestRouter
- POST /request/send/status/:userID //interested,ignored
- POST /request/review/status/:requestId //accepted,rejected

# userRouter
GET /user/connections
GET /user/requests/received
GET /user/feed - Gets you the profile of the other users on platform





Status : ignored,interested,accepted,rejected
