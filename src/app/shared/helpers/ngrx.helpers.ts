import { RouterStateSnapshot } from '@angular/router';

const collectRouteData = (routerState: RouterStateSnapshot): {
  url: string;
  data: { [key: string]: any };
} => {
  let data = {};

  let route = routerState.root;
  while (route.firstChild) {
    if (route?.firstChild?.data && typeof route?.firstChild?.data === 'object') {
      data = { ...data, ...route?.firstChild?.data };
    }

    route = route.firstChild;
  }

  return {
    url: routerState?.url,
    data
  };
};

export const NgrxHelpers = { collectRouteData };
