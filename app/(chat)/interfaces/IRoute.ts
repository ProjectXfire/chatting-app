import { type SvgIconTypeMap } from '@mui/material';
import { type OverridableComponent } from '@mui/material/OverridableComponent';

export interface IRoute {
  label: string;
  href: string;
  icon: OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>> & { muiName: string };
  active?: boolean;
  onClick?: () => void;
}
