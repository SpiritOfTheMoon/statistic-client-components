import React, { useState } from 'react';
import {
  DetailsList, CheckboxVisibility, mergeStyleSets, DefaultButton, DialogType,
} from '@fluentui/react';
import {
  SystemTargetsQueryTypes,
  useTargetsFragment,
  TargetsFragmentTypes,
} from '@umk-stat/statistic-client-relay';
import { CreateTargetDialog, DeleteTargetDialog } from '@umk-stat/statistic-client-modals';
import 'office-ui-fabric-react/dist/css/fabric.css';
import { Mutable } from '../dynamicLogs';

export type TableTargetProps = {
  system: NonNullable<SystemTargetsQueryTypes.SystemTargetsQueryResponse['system']>,
};

export function TargetTable({ system }: TableTargetProps): JSX.Element {
  const { targets } = useTargetsFragment(system);
  const classNames = mergeStyleSets({
    table: {
      margin: '20px',
    },
    button: {
      'margin-left': '100px',
    },
  });

  const [dialogHidden, setDialogHidden] = useState(true);
  const [modalHidden, setModalHidden] = useState(true);
  const [removableTarget, setRemovableTarget] = useState<{ id: string, name: string }>();
  const dialogContentProps = {
    type: DialogType.normal,
    title: 'Добавить цель',
  };

  const dialogModalProps = {
    type: DialogType.normal,
    title: 'Вы уверены, что хотите удалить цель',
  };

  return (
    <>
      <div data-is-scrollable={true}>
        <div className={`s-Grid-col ms-sm9 ms-xl9 ${classNames.table}`}>
          <DetailsList
            items={targets as Mutable<typeof targets>}
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
                onRender: (item) => (<span>{item.name}</span>),
              },
              {
                key: 'column2',
                name: 'Выполнено раз',
                className: 'CellId',
                fieldName: 'target_count',
                minWidth: 200,
                maxWidth: 300,
                data: 'string',
                onRender: (item: TargetsFragmentTypes.TargetsFragment['targets'][0]) => (
                  <div>
                    <span>{0}</span>
                    <DefaultButton
                      className={classNames.button}
                      text="Удалить цель"
                      onClick={() => {
                        setRemovableTarget({ id: item.id, name: item.name });
                        setModalHidden(false);
                      }}
                    />
                  </div>
                ),
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
          {removableTarget && (
            <DeleteTargetDialog
              dialogContentProps={dialogModalProps}
              hidden={modalHidden}
              onDismiss={() => {
                setModalHidden(true);
                setRemovableTarget(undefined);
              }}
              targetId={removableTarget.id}
              systemId={system.id}
              targetName={removableTarget.name}
            />
          )}
        </div>
      </div>
    </>
  );
}
