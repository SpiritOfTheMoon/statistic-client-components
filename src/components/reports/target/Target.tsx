import React from 'react';
import { useSystemTargetsQuery, useTargetExecutionCountSubscription } from '@umk-stat/statistic-client-relay';
import { TargetTable } from './TargetTable';

export type TargetProps = {
    systemId: string;
};

export function Target({ systemId } : TargetProps): JSX.Element {
    const { system } = useSystemTargetsQuery({
        fetchPolicy: 'store-and-network',
    }, {
        systemId,
    });
    useTargetExecutionCountSubscription({
        variables: {
            systemID: systemId,
        },
    });
    if (system === null) {
        throw new Error('Нет id системы для таблицы');
    }

    return (
        <React.Suspense fallback="цели загружаются">
            <TargetTable system={system} />
        </React.Suspense>
    );
}
