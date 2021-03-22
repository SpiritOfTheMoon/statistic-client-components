/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import {
  DetailsList, CheckboxVisibility, mergeStyleSets, DefaultButton, DialogType,
  CommandBar, ICommandBarItemProps,
} from '@fluentui/react';
import {
  SystemTargetsQueryTypes,
  useTargetsFragment,
  TargetsFragmentTypes,
} from '@umk-stat/statistic-client-relay';
import { CreateTargetDialog, DeleteTargetDialog, TargetEventsModal } from '@umk-stat/statistic-client-modals';
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
  const [openModal, setOpenModal] = useState(false);
  const [target, setTarget] = useState(targets[0]);
  const dialogContentProps = {
    type: DialogType.normal,
    title: 'Добавить цель',
  };

  const dialogModalProps = {
    type: DialogType.normal,
    title: 'Вы уверены, что хотите удалить цель',
  };

  const overflowItems: ICommandBarItemProps[] = [
    {
      key: 'rename', text: 'Добавить цель', onClick: () => setDialogHidden(false), iconProps: { iconName: 'Edit' },
    },
  ];

  return (
    <>
      <div data-is-scrollable={true}>
        <CommandBar
          items={[]}
          overflowItems={overflowItems}
        />
        <div className={`s-Grid-col ms-sm9 ms-xl9 ${classNames.table}`}>
          <TargetEventsModal
            target={target}
            onDismiss={() => { setOpenModal(false); }}
            isOpen={openModal}
            isBlocking={false}
          />
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
