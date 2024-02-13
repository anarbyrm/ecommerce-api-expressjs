const UserSchema = {
    email: {
        exists: {
            errorMessage: "Email is required"
        },
        isEmail: {
            errorMessage: "Please provide a valid email address"
        }
    },
    password: {
        exists: {
            errorMessage: "Password is required"
        }
    }
}

module.exports = UserSchema;