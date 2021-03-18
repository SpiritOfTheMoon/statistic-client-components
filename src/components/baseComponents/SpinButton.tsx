/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import {
  Stack, Button, TextField, Callout, List,
} from '@fluentui/react';

const CallOutItemHeight = 20;
const CallOutItemWidth = 40;
const CallOutHeight = 100;

export type SpinButtonProps<T extends number | string> = React.HTMLAttributes<HTMLElement> & {
  items: T[];
  onSelectItem?: (item: T | undefined) => void;
};

export function SpinButton<T extends number | string>({
  items,
  onSelectItem,
  ...props
}: SpinButtonProps<T>): JSX.Element {
  const defaultIndex: number | undefined = items.length > 0 ? 0 : undefined;
  const [index, setIndex] = useState<number | undefined>(defaultIndex);
  const [isCallOutVisible, setCallOutVisible] = useState(false);

  useEffect(() => {
    const selectItem = typeof index !== 'undefined' ? items[index] : undefined;
    onSelectItem?.(selectItem);
  }, [index]);

  const onUpperButtonClick = () => {
    const newIndex = typeof index !== 'undefined' ? (index + 1) % items.length : index;
    setIndex(newIndex);
  };
  const onDownButtonClick = () => {
    const newIndex = typeof index !== 'undefined' ? (index - 1 + items.length) % items.length : index;
    setIndex(newIndex);
  };

  const onRenderCell = (item: T | undefined, ind: number | undefined) => {
    const onClick = () => {
      setIndex(ind);
      setCallOutVisible(false);
    };
    return (
      <div
        style={{
          cursor: 'pointer', width: CallOutItemWidth, height: CallOutItemHeight, textAlign: 'center',
        }}
        onMouseDown={onClick}
        onKeyDown={onClick}
      >
        {item?.toString() ?? ''}
      </div>
    );
  };
  const onFocus = () => {
    setCallOutVisible(true);
  };
  const onBlur = () => {
    // e.eventPhase;
    setCallOutVisible(false);
  };

  const textFieldId = `textField-${new Date().valueOf()}`;
  return (
    <Stack verticalAlign="center" {...props}>
      <Button onClick={onUpperButtonClick} iconProps={{ iconName: 'ChevronUp' }} styles={{ root: { border: 'none' } }} />
      <TextField
        id={textFieldId}
        value={typeof index !== 'undefined' ? items[index].toString() : ''}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {isCallOutVisible && (
        <Callout target={`#${textFieldId}`}>
          <List
            onRenderCell={onRenderCell}
            items={items}
            style={{ maxHeight: CallOutHeight, overflowY: 'scroll' }}
          />
        </Callout>
      )}
      <Button onClick={onDownButtonClick} iconProps={{ iconName: 'ChevronDown' }} styles={{ root: { border: 'none' } }} />
    </Stack>
  );
}
