import * as React from 'react';
import {
  instanceOfDefaultItemObject,
  DownshiftOption
} from '../DownshiftSelect';
import {
  useCombobox,
  useMultipleSelection,
  UseMultipleSelectionProps
} from 'downshift';
import { CrossIcon } from '../Icon/types/CrossIcon';
import { DownshiftSelectContainer } from '../DownshiftSelect/SelectContainer';
import { ItemsList } from '../DownshiftSelect/ItemsList';
import { ComboboxInput } from './ComboboxInput';
import { SelectedItemButton, IconWrapper } from '../DownshiftSelect/shared';
import { useComboboxItems } from './shared';

import { ThemeContext } from '../../theme/ThemeContext';
import { DownshiftMultiComboboxInterface } from '.';

export function MultiCombobox<T>(props: DownshiftMultiComboboxInterface<T>) {
  const [inputValue, setInputValue] = React.useState('');
  const {
    ariaDescribedBy,
    components: customComponents,
    defaultItems,
    disableCreateItem,
    hasError,
    inputStyle,
    isDisabled,
    isLabelVisuallyHidden,
    isLoading,
    isInverse,
    items,
    itemToString,
    labelStyle,
    labelText,
    newItemTransform,
    onInputBlur,
    onInputFocus,
    onInputKeyDown,
    onInputKeyPress,
    onInputKeyUp,
    onInputValueChange,
    onItemCreated,
    onRemoveSelectedItem,
    placeholder
  } = props;
  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    setActiveIndex,
    selectedItems
  } = useMultipleSelection(
    (props as unknown) as UseMultipleSelectionProps<DownshiftOption<T>>
  );

  function isCreatedItem(item) {
    return (
      !(typeof item === 'string') &&
      instanceOfDefaultItemObject(item) &&
      item.react_magma__created_item
    );
  }

  function getFilteredItems(unfilteredItems) {
    return unfilteredItems.filter(item => {
      const itemString =
        typeof item === 'object' && item.react_magma__created_item
          ? item.value
          : itemToString(item);
      return (
        (selectedItems.findIndex(
          selectedItem => itemToString(selectedItem) === itemToString(item)
        ) < 0 &&
          itemString.toLowerCase().startsWith(inputValue.toLowerCase())) ||
        isCreatedItem(item)
      );
    });
  }

  function defaultNewItemTransform(newItem) {
    return newItem.value;
  }

  function defaultOnSelectedItemChange(changes) {
    if (isCreatedItem(changes.selectedItem)) {
      const {
        react_magma__created_item,
        ...createdItem
      } = changes.selectedItem;

      const newItem =
        react_magma__created_item &&
        newItemTransform &&
        typeof newItemTransform === 'function'
          ? newItemTransform(createdItem)
          : defaultNewItemTransform(createdItem);

      items && onItemCreated && typeof onItemCreated === 'function'
        ? onItemCreated(newItem)
        : updateItemsRef(newItem);
      addSelectedItem(newItem);

      if (process.env.NODE_ENV === 'development') {
        if (!items && !disableCreateItem) {
          console.warn(
            'React Magma Warning: Switching from uncontrolled to controlled items. If allowing new items to be created you should handle the onItemCreated event and control the items list in your code.'
          );
        }
      }
    } else if (changes.selectedItem) {
      addSelectedItem(changes.selectedItem);
    }

    setInputValue('');
    selectItem(null);
  }

  const [
    displayItems,
    setDisplayItems,
    updateItemsRef,
    defaultOnInputValueChange
  ] = useComboboxItems(defaultItems, items, {
    itemToString,
    disableCreateItem,
    onInputChange: changes => {
      setInputValue(changes.inputValue);
    }
  });

  const {
    stateReducer: passedInStateReducer,
    onStateChange,
    ...comboboxProps
  } = props;

  function stateReducer(_, actionAndChanges) {
    const { type, changes } = actionAndChanges;
    switch (type) {
      case useCombobox.stateChangeTypes.InputBlur:
        return {
          ...changes,
          inputValue: ''
        };
      default:
        return changes;
    }
  }

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectItem
  } = useCombobox({
    ...comboboxProps,
    itemToString,
    items: getFilteredItems(displayItems),
    onInputValueChange:
      onInputValueChange && typeof onInputValueChange === 'function'
        ? changes => onInputValueChange(changes, setDisplayItems)
        : defaultOnInputValueChange,
    onSelectedItemChange: defaultOnSelectedItemChange,
    stateReducer
  });

  function handleRemoveSelectedItem(event: React.SyntheticEvent, selectedItem) {
    event.stopPropagation();

    onRemoveSelectedItem && typeof onRemoveSelectedItem === 'function'
      ? onRemoveSelectedItem(selectedItem)
      : removeSelectedItem(selectedItem);
  }

  function handleInputFocus(event: React.FocusEvent) {
    setActiveIndex(-1);

    onInputFocus && typeof onInputFocus === 'function' && onInputFocus(event);
  }

  const theme = React.useContext(ThemeContext);

  const selectedItemsContent =
    selectedItems && selectedItems.length > 0 ? (
      <>
        {selectedItems.map((multiSelectedItem, index) => (
          <SelectedItemButton
            aria-label={`reset item ${itemToString(multiSelectedItem)}`}
            key={`selected-item-${index}`}
            {...getSelectedItemProps({
              selectedItem: multiSelectedItem,
              index
            })}
            onClick={event =>
              handleRemoveSelectedItem(event, multiSelectedItem)
            }
            onFocus={() => setActiveIndex(index)}
            tabIndex={0}
            theme={theme}
          >
            {itemToString(multiSelectedItem)}
            <IconWrapper>
              <CrossIcon size={9} />
            </IconWrapper>
          </SelectedItemButton>
        ))}
      </>
    ) : null;

  return (
    <DownshiftSelectContainer
      getLabelProps={getLabelProps}
      isInverse={isInverse}
      isLabelVisuallyHidden={isLabelVisuallyHidden}
      labelStyle={labelStyle}
      labelText={labelText}
    >
      <ComboboxInput
        ariaDescribedBy={ariaDescribedBy}
        customComponents={customComponents}
        getComboboxProps={getComboboxProps}
        getInputProps={options => ({
          ...getInputProps({
            ...options,
            ...getDropdownProps({
              onKeyDown: onInputKeyDown,
              preventKeyAction: isOpen
            })
          })
        })}
        getToggleButtonProps={getToggleButtonProps}
        inputStyle={inputStyle}
        isDisabled={isDisabled}
        isInverse={isInverse}
        isLoading={isLoading}
        hasError={hasError}
        onInputBlur={onInputBlur}
        onInputFocus={handleInputFocus}
        onInputKeyDown={onInputKeyDown}
        onInputKeyPress={onInputKeyPress}
        onInputKeyUp={onInputKeyUp}
        placeholder={placeholder}
        selectedItems={selectedItemsContent}
      />
      <ItemsList
        getItemProps={getItemProps}
        getMenuProps={getMenuProps}
        highlightedIndex={highlightedIndex}
        isOpen={isOpen}
        items={getFilteredItems(displayItems)}
        itemToString={itemToString}
      />
    </DownshiftSelectContainer>
  );
}
