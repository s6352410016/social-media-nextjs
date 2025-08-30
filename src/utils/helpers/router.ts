import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

let router: AppRouterInstance | null = null;

export function setRouter(r: AppRouterInstance) {
  router = r;
}

export function navigate(path: string) {
  if (router) {
    router.push(path);
  } else {
    window.location.href = path;
  }
}