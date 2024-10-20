import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { PermisosService } from './permisos.service';

export const auntCanactGuard: CanActivateFn = (route, state) => {
 

  const permisosservice = inject(PermisosService);
    const router = inject(Router);
    if(permisosservice.isLogged()){
      return true;
    }
    else {
      const url = router.createUrlTree(['/login']);
      return url
    } 

};
