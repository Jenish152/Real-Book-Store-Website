import { Role, RoutePaths } from "./enum";
import cartService from "../sevices/cart.service";

const localStorageKeys = {
    USER: "user",
};

const NavigationItems = [
    {
        name: "Users",
        route: RoutePaths.user,
        access: [Role.Admin],
    },
    {
        name: "Categories",
        route: RoutePaths.category,
        access: [Role.Admin]
    },
    {
        name: "Books",
        route: RoutePaths.book,
        access: [Role.Admin, Role.Seller],
    },
    {
        name: "Update Profile",
        route: RoutePaths.updateprofile,
        access: [Role.Admin, Role.Seller, Role.Buyer],
    },
];

const hasAccess = ({ pathname, user }) => {
    const navItem = NavigationItems.find((navItem) =>
        pathname.includes(navItem.route)
    );
    if (navItem) {
        return (
            !navItem.access ||
            !!(navItem.access && navItem.access.includes(user.roleId))
        );
    }
    return true;
  };
  const addToCart = async (book, id) => {
    return cartService
      .add({
        userId: id,
        bookId: book.id,
        quantity: 1,
      })
      .then((res) => {
        return { error: false, message: "Item added in cart" };
      })
      .catch((e) => {
        if (e.status === 409)
          return { error: true, message: "Item already in the cart" };
        else return { error: true, message: "something went wrong" };
      });
  };
  
export default {
    hasAccess,
    localStorageKeys,
    NavigationItems,
    addToCart
};;