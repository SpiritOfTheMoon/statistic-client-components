import React, { PropsWithChildren } from 'react';
import { useEventsQuery } from '@umk-stat/statistic-client-relay';
import { EventsList } from './EventsList';

export type EventsProps = PropsWithChildren<unknown>;

export function Events(props: EventsProps): JSX.Element {
    const { events } = useEventsQuery({
        fetchPolicy: 'store-and-network',
    }, {
    });

    if (events === null) {
        throw new Error('Нет событий');
    }

    return (
        <React.Suspense fallback="события загружаются">
            <EventsList events={events} />
        </React.Suspense>
    );
}
