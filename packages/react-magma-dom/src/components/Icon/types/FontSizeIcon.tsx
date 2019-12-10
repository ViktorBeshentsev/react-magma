import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 40 40',
  paths: [
    {
      d:
        'M12.3275862,32.0448276 L10.6913793,27.4948276 L4.42672414,27.4948276 L2.82413793,32.0448276 L0,32.0448276 L6.13017241,15.5931034 L9.04396552,15.5931034 L15.1741379,32.0448276 L12.3275862,32.0448276 Z M9.98534483,25.1862069 L8.45,20.7258621 C8.33793047,20.42701 8.18290329,19.9563251 7.98491379,19.3137931 C7.7869243,18.6712612 7.65057509,18.2005762 7.57586207,17.9017241 C7.37413692,18.8206942 7.07902493,19.8255693 6.69051724,20.9163793 L5.2112069,25.1862069 L9.98534483,25.1862069 Z M35.8396552,32.0448276 L33.4482759,25.3948276 L24.2922414,25.3948276 L21.95,32.0448276 L17.8224138,32.0448276 L26.7818966,8 L31.0405172,8 L40,32.0448276 L35.8396552,32.0448276 Z M32.4163793,22.0206897 L30.1724138,15.5017241 C30.0086199,15.0649403 29.7820417,14.3770162 29.4926724,13.437931 C29.2033032,12.4988459 29.0040235,11.8109217 28.8948276,11.3741379 C28.5999985,12.7172481 28.168681,14.1859116 27.6008621,15.7801724 L25.4387931,22.0206897 L32.4163793,22.0206897 Z'
    }
  ]
};

export const FontSizeIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
