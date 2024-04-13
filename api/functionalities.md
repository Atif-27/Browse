# Register User

- Extract Fields from body
- Validate the extracted fields
- Check if User with that email or username already exist
- Extract local Path of File from req.file
  req.file.avatar[0].path
  req.file.coverImage[0].path
- Now Upload the file in cloudinary using the path
- Create a user document with the fields
- Check proper user document created or not
- .select("-password -refreshToken") and send that in response
- mongoose pre hook before saving salt is generated and password is hashed, This is only done when password changes
  if(!this.isModified("password")), otherwise everytime we modify the the user, the hashed password get changed all the time

</br>

# Login User

- Extract Fields from Body
- Validate the extracted Fields
- Check if user with username/email exist or not
- compare password

  User.methods.checkPassword=async function(password){
  const isCorrect=await bcrypt.compare(this.password,password)
  }

  const isCorrect=await user.checkPassword(password)

- genrate Access Token and Refresh Token and set refresh token in DB
  User.methods.generateAccessToken=async function(){
  return jwt.sign({\_id:this.\_id},"secret",{expiresIn:})
  }
- Set HTTP Only cookies with this access token and refresh token

</br>

# Logout User

- Remove refresh token from DB
- remove cookie
  res.clearCookie("accessToken",cookieOptions)

  </br>

# Auth Middleware

- Extract token from cookie or from header

  req.header("Authorization").split(" ")[1]

  Bearer asdjasjdkj23jqk.ndskfnjsdkfjsdf.sadasdjaskdjasd

- Verify token

  jwt.verify(token,"secret")

- If id extracted and we find user then attach user to the req object

  </br>

# Refresh Access Token

- Extract Refresh token from cookie/body
- With JWT verify the token, and extract id

  jwt.verift(token,"secret")

- from the id find user. generate new access token and refresh token and set the cookies

</br>

# Update Password

- Extract current password and new password
- Find User from id
- Verify Current password
- update password
  user.password=password
  user.save({ validateBeforeSave: false })

</br>

# Update User Details

- Extract fields from body
- Validate the fields
- findByIdAndUpdate and set new:true to get new document in return
- Send response

</br>

# Update User Avatar/Cover

- Extract path from req.file.path
- Upload file to clodinary by passing the path
- Delete old file in cloudinary by passing the image link
- Update avatar/cover link in DB and make sure new is set to true

</br>

# Get user channel

- Extract channel Name
- We use aggregation pipeline

  - STAGE 1: Match User with the Channel Name
  - STAGE 2: lookup

    From- subscriptions, localFields- \_id , foreignField- channel, as-subscribers

  - STAGE 3: lookup

    From- subscriptions, localFields- \_id , foreignField- subscriber, as-subscribedTo

  - STAGE 4: Addfields
    - $size of $subscribers
    - $size of $subscribedTo
    - $in:[req.user._id,"$subscribers.subscriber"]
  - STAGE 5: project

    Add 1 to the fields which u want

- Now this aggregate return array, send the first element in response

  </br>

# Get user History

- extract user id
- We use aggregation pipeline

  - STAGE 1: match with user id

    $match:{
    "\_id": new mongoose.Types.ObjectId(req.user?.\_id)
    }

  - STAGE 2: lookup with video

    from: "videos", localField:"watchHistory", foreignField:"\_id", as:"watchHistory"

    Now Subpipeline

    - STAGE 1:
      from:"users", localFields:"owner", foreignField:"\_id", as:"ownder"

      Sub pipeline

      - project the required thing about owner

    - STAGE 2: add field to remove the array and just the owner fields

- Return the first element of aggregate, the watchHistory of it.
