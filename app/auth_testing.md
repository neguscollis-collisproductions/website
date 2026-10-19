# Auth Testing Playbook

Step 1: MongoDB Verification
```
mongosh
use test_database
db.users.find({role: "admin"}).pretty()
db.users.findOne({role: "admin"}, {password_hash: 1})
```
Verify: bcrypt hash starts with `$2b$`, indexes exist on users.email (unique), login_attempts.identifier.

Step 2: API Testing
```
curl -c cookies.txt -X POST <BACKEND>/api/auth/login -H "Content-Type: application/json" -d '{"email":"admin@lumenframe.studio","password":"admin123"}'
curl -b cookies.txt <BACKEND>/api/auth/me
```
Login returns the user object and sets `access_token` + `refresh_token` cookies. `/me` returns the same user using those cookies. Admin-only routes: GET /api/bookings, PATCH /api/bookings/{id}.
