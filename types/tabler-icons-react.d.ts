import * as React from 'react';

interface IconProps extends React.SVGAttributes<SVGElement> {
  size?: string | number;
  stroke?: string | number;
  color?: string;
}

type Icon = React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;

declare module '@tabler/icons-react' {
  export const IconBrain: Icon;
  export const IconLock: Icon;
  export const IconMail: Icon;
  export const IconAlertCircle: Icon;
  export const IconUser: Icon;
  // Add any other icons you might use in the future
}