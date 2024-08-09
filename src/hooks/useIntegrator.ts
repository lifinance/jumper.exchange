import { useEffect, useState } from 'react';
import { useIsGasVariant } from './useIsGasVariant';

export const useIntegrator = (initialState?: string) => {
  const [integrator, setIntegrator] = useState<string>();
  const isGasVariant = useIsGasVariant();

  useEffect(() => {
    if (initialState) {
      setIntegrator(initialState);
      return;
    }
    // all the trafic from mobile (including "/gas")
    // if (!isDesktop) {
    //   return process.env.NEXT_PUBLIC_INTEGRATOR_MOBILE;
    // }
    // all the trafic from web on "/gas"
    if (isGasVariant) {
      setIntegrator(process.env.NEXT_PUBLIC_WIDGET_INTEGRATOR_REFUEL);
      return;
    }

    setIntegrator(process.env.NEXT_PUBLIC_WIDGET_INTEGRATOR);
  }, [initialState, isGasVariant]);

  return integrator;
};
