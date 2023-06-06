import { Role, RoutePaths } from "./enum";

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
export default {
    hasAccess,
    localStorageKeys,
    NavigationItems,
};;