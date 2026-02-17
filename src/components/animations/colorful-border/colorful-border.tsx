import { Box, type BoxProps, type MantineRadius } from '@mantine/core';
import { type PropsWithChildren } from 'react';

import classes from './colorful-border.module.css';

export type ColorfulAnimatedBorderProps = {
  radius?: MantineRadius;
  disabled?: boolean;
  withBoxShadow?: boolean;
  animated?: boolean;
  customColors?: string[];
} & PropsWithChildren &
  BoxProps;

export function ColorfulAnimatedBorder({
  radius = 'md',
  withBoxShadow = false,
  disabled = false,
  children,
  ...others
}: ColorfulAnimatedBorderProps) {
  // const colors = []

  const animation = {
    animationDuration: '3s',
    animationTimingFunction: 'linear',
  };

  return (
    <Box pos="relative" p={3} {...others}>
      <Box className={classes.children}>{children}</Box>
      {!disabled && (
        <Box
          className={classes.rainbowContainer}
          style={{
            borderRadius: `var(--mantine-radius-${radius})`,
            ...animation,
          }}
        ></Box>
      )}

      {withBoxShadow && !disabled && (
        <Box
          className={classes.rainbowContainerShadow}
          style={{
            borderRadius: `var(--mantine-radius-${radius})`,
            ...animation,
          }}
        ></Box>
      )}
    </Box>
  );
}
