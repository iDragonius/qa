import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "~/server/api/root";

export type RouteTypes = inferRouterOutputs<AppRouter>;
