import { Card, Flex, Text } from '@mantine/core';
import { NavLink } from 'react-router-dom';

import classes from './card-link.module.css';

import type { ReactNode } from 'react';

type CardLinkProps = {
  title: string;
  description: string;
  icon: ReactNode;
  link: string;
};

export default function CardLink({
  title,
  description,
  icon,
  link,
}: CardLinkProps) {
  return (
    <Card className={classes.card} withBorder component={NavLink} to={link}>
      <Flex align="center" gap="md">
        <Flex direction="column">
          <Text fw={700} fz="sm">
            {title}
          </Text>
          <Text fz="sm">{description}</Text>
        </Flex>
        {icon}
      </Flex>
    </Card>
  );
}
