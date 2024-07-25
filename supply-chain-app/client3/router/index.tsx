export class AppRoutes {
    public static Root = '/';
    public static Login = '/login';
    public static SearchForSupplier = '/searchforsupplier';

    public static Role?: string = undefined;
    public static UserPrivateRoutes: string[] = [];

    public static PublicRoutes = [this.Login];
    private static PrivateRoutes = [this.SearchForSupplier];

    public static setRole(value: string) {
        this.Role = value;
        this.UserPrivateRoutes = this.PrivateRoutes;
    }
}
