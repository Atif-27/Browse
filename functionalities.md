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

# Logout User

- Extract token from cookie or from header

  req.header("Authorization").split(" ")[0]

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
