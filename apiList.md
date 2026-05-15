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
- POST /request/send/interested/:userID
- POST /request/send/ignored/:userID
- POST /request/review/accepted/:userID
- POST /request/review/rejected/:userID

# userRouter
GET /user/connections
GET /user/requests
GET /user/feed - Gets you the profile of the other users on platform





Status : ignored,interested,accepted,rejected
