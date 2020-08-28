import React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import { StyledCard, StyledList, StyledItem } from './shared';
import {
  UseSelectGetMenuPropsOptions,
  UseSelectGetItemPropsOptions
} from 'downshift';
import { DownshiftOption, instanceOfToBeCreatedItemObject } from '.';
import styled from '../../theme/styled';

interface ItemsListProps<T> {
  getItemProps: (
    options?: UseSelectGetItemPropsOptions<DownshiftOption<T>>
  ) => any;
  getMenuProps: (options?: UseSelectGetMenuPropsOptions) => any;
  highlightedIndex?: number;
  isOpen?: boolean;
  items: DownshiftOption<T>[];
  itemToString: (item: DownshiftOption<T>) => string;
}

const NoItemsMessage = styled.span`
  color: ${props => props.theme.colors.neutral04};
  display: block;
  padding-top: 8px;
  text-align: center;
`;

export function ItemsList<T>(props: ItemsListProps<T>) {
  const {
    isOpen,
    getMenuProps,
    items,
    itemToString,
    highlightedIndex,
    getItemProps
  } = props;

  const theme = React.useContext(ThemeContext);

  const hasItems = items && items.length > 0;

  return (
    <StyledCard hasDropShadow isOpen={isOpen}>
      <StyledList isOpen={isOpen} {...getMenuProps()}>
        {isOpen && hasItems ? (
          items.map((item, index) => {
            const itemString = instanceOfToBeCreatedItemObject(item)
              ? item.label
              : itemToString(item);
            return (
              <StyledItem
                key={`${itemString}${index}`}
                isFocused={highlightedIndex === index}
                {...getItemProps({ item, index })}
                theme={theme}
              >
                {itemString}
              </StyledItem>
            );
          })
        ) : (
          <StyledItem tabIndex={-1}>
            <NoItemsMessage theme={theme}>No options</NoItemsMessage>
          </StyledItem>
        )}
      </StyledList>
    </StyledCard>
  );
}
