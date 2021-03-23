/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import {
  DetailsList, CheckboxVisibility, mergeStyleSets, DefaultButton, DialogType,
  DetailsListLayoutMode, SelectionMode, IconButton,
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
      'padding-right': '30px',
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
        <div className={`ms-Grid-row ${classNames.table}`}>
          <TargetEventsModal
            target={target}
            onDismiss={() => { setOpenModal(false); }}
            isOpen={openModal}
            isBlocking={false}
          />
          <DetailsList
            items={targets as Mutable<typeof targets>}
            disableSelectionZone={true}
            compact={false}
            checkboxVisibility={CheckboxVisibility.hidden}
            selectionMode={0}
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
                onRender: (item) => (
                  <div className={classNames.rowContent}>{0}</div>
                ),
              },
              {
                key: 'column3',
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
