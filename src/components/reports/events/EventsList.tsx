import React from 'react';
import {
 Dropdown, IDropdownStyles, IComboBoxOption, PivotItem,
} from '@fluentui/react';
import {
  EventsQueryTypes,
} from '@umk-stat/statistic-client-relay';
import 'office-ui-fabric-react/dist/css/fabric.css';

export type EventsListProps = {
  events: NonNullable<EventsQueryTypes.EventsQueryResponse['events']>,
};

export function EventsList({ events }: EventsListProps): JSX.Element {
  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 300 },
  };

  return (
    <>
      <Dropdown
        label="Выберите событие"
        options={[...events].map((event) => ({
            key: event.id,
            text: event.name,
          }))}
        styles={dropdownStyles}
      />
    </>
  );
}
