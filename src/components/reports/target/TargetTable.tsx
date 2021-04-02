/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import {
  DetailsList, CheckboxVisibility, mergeStyleSets, DialogType,
  IconButton, DetailsListLayoutMode, ConstrainMode,
} from '@fluentui/react';
import {
  SystemTargetsQueryTypes,
  useTargetsFragment,
  TargetsFragmentTypes,
} from '@umk-stat/statistic-client-relay';
import { DeleteTargetDialog, TargetEventsModal } from '@umk-stat/statistic-client-modals';
import 'office-ui-fabric-react/dist/css/fabric.css';
import { Mutable } from '../dynamicLogs';

export type TableTargetProps = {
  system: NonNullable<SystemTargetsQueryTypes.SystemTargetsQueryResponse['system']>,
};

export function TargetTable({ system }: TableTargetProps): JSX.Element {
  const { targets } = useTargetsFragment(system);
  const classNames = mergeStyleSets({
    table: {
      margin: 'auto',
    },
    button: {
      // 'margin-left': '100px',
    },
    rowContent: {
      color: 'black',
      'font-size': '14px',
    },
  });

  const [modalHidden, setModalHidden] = useState(true);
  const [removableTarget, setRemovableTarget] = useState<{ id: string, name: string }>();
  const [openModal, setOpenModal] = useState(false);
  const [target, setTarget] = useState(targets[0]);

  const dialogModalProps = {
    type: DialogType.normal,
    title: 'Вы уверены, что хотите удалить цель',
  };

  return (
    <>
      <div data-is-scrollable={true}>
        <div className={`s-Grid-col ms-sm9 ms-xl9 ${classNames.table}`}>
          <TargetEventsModal
            target={target}
            targetId={target.id}
            targetName={target.name}
            onDismiss={() => { setOpenModal(false); }}
            isOpen={openModal}
            isBlocking={false}
          />
          <DetailsList
            items={targets as Mutable<typeof targets>}
            compact={false}
            checkboxVisibility={CheckboxVisibility.hidden}
            constrainMode={ConstrainMode.unconstrained}
            columns={[
              {
                key: 'column1',
                name: 'Название',
                className: 'CellId',
                fieldName: 'target_name',
                minWidth: 200,
                data: 'string',
                isPadded: true,
                onRender: (item) => {
                  const onClick = () => {
                    setTarget(item);
                    setOpenModal(true);
                  };
                  return (
                    <div
                      className={classNames.rowContent}
                      onClick={onClick}
                      onKeyDown={onClick}
                    >
                      {item.name}
                    </div>
                  );
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
                onRender: (item: TargetsFragmentTypes.TargetsFragment['targets'][0]) => (
                  <div className={classNames.rowContent}>{item.executionCount}</div>
                ),
              },
              {
                key: 'column3',
                name: 'Пользователей',
                className: 'CellId',
                fieldName: 'target_users',
                minWidth: 150,
                maxWidth: 200,
                data: 'string',
                onRender: (item: TargetsFragmentTypes.TargetsFragment['targets'][0]) => (
                  <div>{item.viewers.length}</div>
                ),
              },
              {
                key: 'column4',
                name: '',
                className: 'CellId',
                fieldName: 'target_delete',
                minWidth: 50,
                maxWidth: 100,
                data: 'string',
                onRender: (item: TargetsFragmentTypes.TargetsFragment['targets'][0]) => (
                  <div>
                    <IconButton
                      iconProps={
                        { iconName: 'Delete' }
                      }
                      className={classNames.button}
                      title="Удалить цель"
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
