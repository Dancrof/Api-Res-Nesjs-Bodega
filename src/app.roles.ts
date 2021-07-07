import { RolesBuilder } from "nest-access-control";

export enum AppRoles {
    AUTHOR = 'AUTHOR',
    ADMIN = 'ADMIN'
}

export enum AppResources {
    USER = 'USER',
    PRODUCT = 'PRODUCT'
}

export const roles: RolesBuilder = new RolesBuilder();

roles
    //AUTHOR ROLES
    .grant(AppRoles.AUTHOR)
    .updateOwn([AppResources.USER])
    .deleteOwn([AppResources.USER])
    .createOwn([AppResources.PRODUCT])
    .updateOwn([AppResources.PRODUCT])
    .deleteOwn([AppResources.PRODUCT])

    //ADMIN ROLES
    .grant(AppRoles.ADMIN)
    .extend(AppRoles.AUTHOR)
    .readAny([AppResources.USER])
    .createAny([AppResources.USER])
    .updateAny([AppResources.USER, AppResources.PRODUCT])
    .deleteAny([AppResources.USER, AppResources.PRODUCT])