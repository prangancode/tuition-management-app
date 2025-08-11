import Cookies from "js-cookie";

// AuthUserHelper class to manage user authentication
class AuthUserHelper {
  // Saving user login data
  saveLoginData(authData) {
    // If no data, return
    if (!authData) return;

    // Getting token and user data
    const token = authData.token || "";
    const user = authData.user || null;

    // Setting token and user data in cookies and local storage
    Cookies.set("access_token", token, {
      expires: 5, // 5 days
      secure: true,
      sameSite: "Strict",
    });

    // for live settings
    // Cookies.set("access_token", token, {
    //   expires: 5, // 5 days
    //   secure: false,
    //   sameSite: "Lax",
    // });

    // Setting user data in local storage
    localStorage.setItem("auth_user", JSON.stringify(user));
  }

  // Getting user data
  getUser() {
    // Getting user data from local storage
    const user = localStorage.getItem("auth_user");
    // If user data is available, parsing it and returning
    return user ? JSON.parse(user) : null;
  }

  // Getting token
  getToken() {
    return Cookies.get("access_token") || null;
  }

  // Checking if user is authenticated
  isAuthenticated() {
    return !!this.getToken() && !!this.getUser();
  }

  getRole() {
    const user = this.getUser();
    return user?.role || null; //  admin or customer
  }

  // Logout function
  logout(callback) {
    Cookies.remove("access_token");
    localStorage.removeItem("auth_user");

    if (typeof callback === "function") {
      callback(); // custom behavior (e.g. redirect)
    }
  }
}

export const AuthUser = new AuthUserHelper();
