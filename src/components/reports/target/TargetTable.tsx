/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import {
  DetailsList, CheckboxVisibility, mergeStyleSets, DefaultButton, DialogType,
} from '@fluentui/react';
import {
  SystemTargetsQueryTypes,
  useTargetsFragment,
} from '@umk-stat/statistic-client-relay';
import { CreateTargetDialog, TargetEventsModal } from '@umk-stat/statistic-client-modals';
import 'office-ui-fabric-react/dist/css/fabric.css';

export type TableTargetProps = {
  system: NonNullable<SystemTargetsQueryTypes.SystemTargetsQueryResponse['system']>,
};

export function TargetTable({ system }: TableTargetProps): JSX.Element {
  const { targets } = useTargetsFragment(system);

  const classNames = mergeStyleSets({
    table: {
      margin: '20px',
    },
  });

  const [dialogHidden, setDialogHidden] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [target, setTarget] = useState(targets[0]);

  const dialogContentProps = {
    type: DialogType.normal,
    title: 'Добавить цель',
  };

  return (
    <>
      <div data-is-scrollable={true}>
        <div className={`s-Grid-col ms-sm9 ms-xl9 ${classNames.table}`}>
          <TargetEventsModal
            target={target}
            onDismiss={() => { setOpenModal(false); }}
            isOpen={openModal}
            isBlocking={false}
          />
          <DetailsList
            items={[...targets]}
            disableSelectionZone={true}
            compact={true}
            checkboxVisibility={CheckboxVisibility.hidden}

            columns={[
              {
                key: 'column1',
                name: 'Название цели',
                className: 'CellId',
                fieldName: 'target_name',
                minWidth: 200,
                maxWidth: 300,
                data: 'string',
                onRender: (item) => {
                  const onClick = () => {
                    setTarget(item);
                    setOpenModal(true);
                  };
                  return (<span onClick={onClick} onKeyDown={onClick}>{item.name}</span>);
                },
              },
              {
                key: 'column2',
                name: 'Выполнено раз',
                className: 'CellId',
                fieldName: 'target_count',
                minWidth: 200,
                maxWidth: 300,
                data: 'string',
                onRender: (item) => (<span>{0}</span>),
              },
            ]}
          />
          <DefaultButton secondaryText="Opens the Sample Dialog" onClick={() => setDialogHidden(false)} text="Добавить цель" />
          <CreateTargetDialog
            dialogContentProps={dialogContentProps}
            hidden={dialogHidden}
            onDismiss={() => setDialogHidden(true)}
            systemID={system.id}
          />
        </div>
      </div>
    </>
  );
}
