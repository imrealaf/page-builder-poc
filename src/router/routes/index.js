import publicRoutes from "./public.routes";
import protectedRoutes from "./protected.routes";

export default [...publicRoutes, ...protectedRoutes];
