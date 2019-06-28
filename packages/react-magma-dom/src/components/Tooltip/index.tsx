import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { ThemeContext } from '../../theme/themeContext';

export enum ToolTipPosition {
  bottom = 'bottom',
  left = 'left',
  right = 'right',
  top = 'top'
}

export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  position: ToolTipPosition;
}

const StyledTooltip = styled.span<TooltipProps>`
  background: ${props => props.theme.colors.neutral02};
  border-radius: 3px;
  color: ${props => props.theme.colors.neutral08};
  font-size: 12px;
  font-weight: 600;
  max-width: 200px;
  padding: 3px 5px;
  position: relative;
  text-align: center;

  &:before,
  &:after {
    border-left-color: ${props =>
      props.position === 'left' || props.position === 'right'
        ? props.theme.colors.neutral02
        : 'transparent'};
    border-right-color: ${props =>
      props.position === 'left' || props.position === 'right'
        ? props.theme.colors.neutral02
        : 'transparent'};
    border-top-color: ${props =>
      props.position === 'left' || props.position === 'right'
        ? 'transparent'
        : props.theme.colors.neutral02};
    border-bottom-color: ${props =>
      props.position === 'left' || props.position === 'right'
        ? 'transparent'
        : props.theme.colors.neutral02};
    border-style: solid;
    content: '';
    height: 0;
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
    width: 0;
  }

  ${props =>
    props.position === 'bottom' &&
    css`
      &:after {
        border-width: 0 5px 5px 5px;
        bottom: auto;
        top: -5px;
      }

      &:before {
        bottom: auto;
        border-width: 0 7px 7px 7px;
        top: -7px;
      }
    `}

  ${props =>
    props.position === 'left' &&
    css`
      &:before,
      &:after {
        left: auto;
        top: 50%;
        transform: translateY(-50%);
      }

      &:after {
        right: -5px;
        border-width: 5px 0 5px 5px;
      }

      &:before {
        right: -7px;
        border-width: 7px 0 7px 7px;
      }
    `}

  ${props =>
    props.position === 'right' &&
    css`
      &:before,
      &:after {
        right: auto;
        top: 50%;
        transform: translateY(-50%);
      }

      &:after {
        left: -5px;
        border-width: 5px 5px 5px 0;
      }

      &:before {
        left: -7px;
        border-width: 7px 7px 7px 0;
      }
    `}

  ${props =>
    props.position === 'top' &&
    css`
      &:after {
        bottom: -5px;
        top: auto;
        border-width: 5px 5px 0 5px;
      }

      &:before {
        bottom: -7px;
        top: auto;
        border-width: 7px 7px 0 7px;
      }
    `}
`;

export const Tooltip: React.FunctionComponent<TooltipProps> = ({
  children,
  position
}: TooltipProps) => {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <StyledTooltip position={position} theme={theme}>
          {children}
        </StyledTooltip>
      )}
    </ThemeContext.Consumer>
  );
};
